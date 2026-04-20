"use client";

import { useRef, useEffect, useCallback } from "react";

interface Wave {
  x: number;
  y: number;
  time: number;
  intensity: number;
}

interface BendPoint {
  x: number;
  y: number;
  time: number;
  strength: number;
}

interface Charge {
  x: number;
  y: number;
  startTime: number;
}

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const RAINBOW_COLORS = ["#FF0000","#FF8800","#FFFF00","#00CC44","#0088FF","#8800FF","#FF00AA"];

interface InteractiveGridProps {
  className?: string;
  spacing?: number;
  influenceRadius?: number;
  maxDisplacement?: number;
}

export default function InteractiveGrid({
  className = "",
  spacing = 40,
  influenceRadius = 300,
  maxDisplacement = 24,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastDrawRef = useRef({ x: -9999, y: -9999 });
  const isActiveRef = useRef(false);
  const wavesRef = useRef<Wave[]>([]);
  const bendsRef = useRef<BendPoint[]>([]);
  const chargeRef = useRef<Charge | null>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const isVisibleRef = useRef(true);
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });
  const konamiRef = useRef<string[]>([]);
  const rainbowActiveRef = useRef(false);
  const shakeUntilRef = useRef(0);

  const getDisplaced = useCallback(
    (gx: number, gy: number, mx: number, my: number, now: number) => {
      let dx = 0;
      let dy = 0;
      let factor = 0;

      // Mouse displacement
      const ddx = gx - mx;
      const ddy = gy - my;
      const dist2 = ddx * ddx + ddy * ddy;
      const r2 = influenceRadius * influenceRadius;

      if (dist2 < r2 && dist2 > 0) {
        const dist = Math.sqrt(dist2);
        factor = 1 - dist / influenceRadius;
        const push = factor * factor * factor * maxDisplacement;
        dx += (ddx / dist) * push;
        dy += (ddy / dist) * push;
      }

      // Wave displacement
      for (const wave of wavesRef.current) {
        const wdx = gx - wave.x;
        const wdy = gy - wave.y;
        const wDist = Math.sqrt(wdx * wdx + wdy * wdy);
        const elapsed = (now - wave.time) / 1000;
        const waveSpeed = 400;
        const waveRadius = elapsed * waveSpeed;
        const waveWidth = 120;

        const distFromRing = Math.abs(wDist - waveRadius);
        if (distFromRing < waveWidth) {
          const ringFactor = 1 - distFromRing / waveWidth;
          const fadeRate = Math.max(0.3, 1.2 - wave.intensity * 0.04);
          const fade = Math.max(0, 1 - elapsed * fadeRate);
          const amplitude = ringFactor * fade * wave.intensity * 14;

          if (wDist > 0) {
            dx += (wdx / wDist) * amplitude;
            dy += (wdy / wDist) * amplitude;
          }
          factor = Math.max(factor, ringFactor * fade * wave.intensity * 0.5);
        }
      }

      // Bend point displacement (Schnell-Wisch-Trail)
      for (const bend of bendsRef.current) {
        const bdx = gx - bend.x;
        const bdy = gy - bend.y;
        const bDist2 = bdx * bdx + bdy * bdy;
        const bendRadius = 80;
        if (bDist2 < bendRadius * bendRadius && bDist2 > 0) {
          const bDist = Math.sqrt(bDist2);
          const elapsed = (now - bend.time) / 1000;
          // Elastic spring-back: starts strong, oscillates and fades
          const decay = Math.exp(-elapsed * 3);
          const spring = Math.cos(elapsed * 12) * decay;
          const bendFactor = (1 - bDist / bendRadius) * bend.strength * spring;
          dx += (bdx / bDist) * bendFactor * 15;
          dy += (bdy / bDist) * bendFactor * 15;
          factor = Math.max(factor, Math.abs(bendFactor) * 0.3);
        }
      }

      // Charge pull (right-click held — sucks grid inward)
      const charge = chargeRef.current;
      if (charge) {
        const cdx = gx - charge.x;
        const cdy = gy - charge.y;
        const cDist2 = cdx * cdx + cdy * cdy;
        const chargeElapsed = Math.min((now - charge.startTime) / 1000, 2.5);
        const chargeRadius = 120 + chargeElapsed * 80; // grows from 120 to 320
        if (cDist2 < chargeRadius * chargeRadius && cDist2 > 0) {
          const cDist = Math.sqrt(cDist2);
          const chargePower = chargeElapsed / 2.5; // 0→1 over 2.5s
          const pullStrength = (1 - cDist / chargeRadius) * chargePower * 40;
          dx -= (cdx / cDist) * pullStrength; // negative = toward center
          dy -= (cdy / cDist) * pullStrength;
          factor = Math.max(factor, pullStrength / 40 * 0.6);
        }
      }

      return { x: gx + dx, y: gy + dy, factor };
    },
    [influenceRadius, maxDisplacement]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const now = performance.now();

    // Prune expired effects — Wellen fliegen raus, sobald sie unsichtbar sind
    // (Fade-basiert statt fester 4s — verhindert blockierte Taps nach sichtbarem Ende)
    wavesRef.current = wavesRef.current.filter(w => {
      const elapsed = (now - w.time) / 1000;
      const fadeRate = Math.max(0.3, 1.2 - w.intensity * 0.04);
      return 1 - elapsed * fadeRate > 0.01;
    });
    bendsRef.current = bendsRef.current.filter(b => (now - b.time) < 1500);
    // Screen shake
    const isShaking = now < shakeUntilRef.current;
    if (isShaking) {
      const shakeDecay = (shakeUntilRef.current - now) / 1500;
      const shakeX = (Math.random() - 0.5) * 12 * shakeDecay;
      const shakeY = (Math.random() - 0.5) * 12 * shakeDecay;
      ctx.save();
      ctx.translate(shakeX, shakeY);
    }

    ctx.clearRect(-20, -20, w + 40, h + 40);

    const style = getComputedStyle(canvas);
    const isDark = document.documentElement.classList.contains("dark");
    const borderColor = style.getPropertyValue("--neo-border").trim() || (isDark ? "#FFF" : "#000");

    const isRainbow = rainbowActiveRef.current;

    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;

    // Build displaced grid
    const points: { x: number; y: number; factor: number }[][] = [];
    for (let col = 0; col < cols; col++) {
      points[col] = [];
      for (let row = 0; row < rows; row++) {
        points[col][row] = getDisplaced(col * spacing, row * spacing, mx, my, now);
      }
    }

    // Draw base grid lines
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.15;

    if (isRainbow) {
      const rainbowCycle = now / 400;
      for (let row = 0; row < rows; row++) {
        const colorIdx = (row + Math.floor(rainbowCycle)) % RAINBOW_COLORS.length;
        ctx.strokeStyle = RAINBOW_COLORS[colorIdx];
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[col][row];
          if (col === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let col = 0; col < cols; col++) {
        const colorIdx = (col + Math.floor(rainbowCycle)) % RAINBOW_COLORS.length;
        ctx.strokeStyle = RAINBOW_COLORS[colorIdx];
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[col][row];
          if (row === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    } else {
      ctx.strokeStyle = borderColor;
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const p = points[col][row];
          if (col === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = points[col][row];
          if (row === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    }

    // Glow segments near cursor and waves
    ctx.lineWidth = 1.5;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const p1 = points[col][row];
        const p2 = points[col + 1][row];
        const avgFactor = (p1.factor + p2.factor) / 2;
        if (avgFactor > 0.01) {
          ctx.globalAlpha = avgFactor * 0.35;
          if (isRainbow) {
            ctx.strokeStyle = RAINBOW_COLORS[(col + row) % RAINBOW_COLORS.length];
          } else {
            ctx.strokeStyle = borderColor;
          }
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        const p1 = points[col][row];
        const p2 = points[col][row + 1];
        const avgFactor = (p1.factor + p2.factor) / 2;
        if (avgFactor > 0.01) {
          ctx.globalAlpha = avgFactor * 0.35;
          if (isRainbow) {
            ctx.strokeStyle = RAINBOW_COLORS[(col + row) % RAINBOW_COLORS.length];
          } else {
            ctx.strokeStyle = borderColor;
          }
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Intersection dots
    ctx.fillStyle = borderColor;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const p = points[col][row];
        if (p.factor > 0.05) {
          ctx.globalAlpha = p.factor * 0.4;
          if (isRainbow) {
            ctx.fillStyle = RAINBOW_COLORS[(col + row) % RAINBOW_COLORS.length];
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2 + p.factor * 3, 0, Math.PI * 2);
          ctx.fill();
          if (isRainbow) ctx.fillStyle = borderColor;
        }
      }
    }

    ctx.globalAlpha = 1;

    if (isShaking) {
      ctx.restore();
    }
  }, [spacing, getDisplaced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isCoarsePointer = window.matchMedia("(hover: none)").matches;

    let running = true;

    function onMouseMove(e: MouseEvent) {
      if (!isVisibleRef.current) return;
      const rect = cachedRectRef.current;
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Track speed for bend trail
      const now = performance.now();
      const prev = lastMouseRef.current;
      const dt = now - prev.time;
      if (dt > 0) {
        const mdx = x - prev.x;
        const mdy = y - prev.y;
        const speed = Math.sqrt(mdx * mdx + mdy * mdy) / dt;
        // Fast movement → drop bend points
        if (speed > 0.8 && x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          bendsRef.current.push({ x, y, time: now, strength: Math.min(speed * 0.8, 3) });
        }
      }
      lastMouseRef.current = { x, y, time: now };

      if (x >= -influenceRadius && x <= rect.width + influenceRadius &&
          y >= -influenceRadius && y <= rect.height + influenceRadius) {
        mouseRef.current = { x, y };
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          loop();
        }
      } else if (isActiveRef.current && wavesRef.current.length === 0 && bendsRef.current.length === 0 && chargeRef.current === null) {
        mouseRef.current = { x: -1000, y: -1000 };
        lastDrawRef.current = { x: -9999, y: -9999 };
        draw();
        isActiveRef.current = false;
      }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
      lastDrawRef.current = { x: -9999, y: -9999 };
      draw();
      if (wavesRef.current.length === 0 && bendsRef.current.length === 0 && chargeRef.current === null) {
        isActiveRef.current = false;
      }
    }

    // Single click → wave
    function onClick(e: MouseEvent) {
      if (!isVisibleRef.current) return;
      const rect = cachedRectRef.current;
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      wavesRef.current.push({ x, y, time: performance.now(), intensity: 2.5 });
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    // Double click → shockwave (much stronger)
    function onDblClick(e: MouseEvent) {
      if (!isVisibleRef.current) return;
      const rect = cachedRectRef.current;
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      // Remove the single-click wave that just fired and replace with shockwave
      const now = performance.now();
      wavesRef.current = wavesRef.current.filter(w => (now - w.time) > 100);
      wavesRef.current.push({ x, y, time: now, intensity: 6 });
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    // Right-click hold-to-charge: press pulls grid inward, release fires shockwave
    function onMouseDown(e: MouseEvent) {
      if (e.button !== 2) return; // right button only
      if (!isVisibleRef.current) return;
      const rect = cachedRectRef.current;
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      chargeRef.current = { x, y, startTime: performance.now() };
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    function onMouseUp(e: MouseEvent) {
      if (e.button !== 2) return;
      const charge = chargeRef.current;
      if (!charge) return;
      const holdDuration = Math.min((performance.now() - charge.startTime) / 1000, 2.5);
      chargeRef.current = null;
      // Fire shockwave proportional to hold time (0.5→3 at min, up to 2→15 at max)
      const intensity = 2 + holdDuration * 5;
      wavesRef.current.push({ x: charge.x, y: charge.y, time: performance.now(), intensity });
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    function onContextMenu(e: MouseEvent) {
      const rect = cachedRectRef.current;
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        e.preventDefault();
      }
    }

    // Konami code listener
    function onKeyDown(e: KeyboardEvent) {
      if (!isVisibleRef.current) return;
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > KONAMI.length) {
        konamiRef.current = konamiRef.current.slice(-KONAMI.length);
      }
      if (konamiRef.current.length === KONAMI.length &&
          konamiRef.current.every((k, i) => k === KONAMI[i])) {
        konamiRef.current = [];
        const rect = cachedRectRef.current;
        if (!rect) return;
        const now = performance.now();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        // Mega explosion: massive shockwaves from center
        wavesRef.current.push({ x: cx, y: cy, time: now, intensity: 25 });
        wavesRef.current.push({ x: cx, y: cy, time: now + 200, intensity: 20 });
        wavesRef.current.push({ x: cx, y: cy, time: now + 400, intensity: 15 });
        // Corner explosions
        wavesRef.current.push({ x: 0, y: 0, time: now + 300, intensity: 12 });
        wavesRef.current.push({ x: rect.width, y: 0, time: now + 350, intensity: 12 });
        wavesRef.current.push({ x: 0, y: rect.height, time: now + 400, intensity: 12 });
        wavesRef.current.push({ x: rect.width, y: rect.height, time: now + 450, intensity: 12 });
        // Screen shake
        shakeUntilRef.current = now + 1500;
        // Permanent rainbow
        rainbowActiveRef.current = true;
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          loop();
        }
      }
    }

    // Touch tap → wave (mobile, non-blocking — passive listener, scroll bleibt frei)
    function onTouchStart(e: TouchEvent) {
      if (!isVisibleRef.current) return;
      const rect = cachedRectRef.current;
      if (!rect) return;
      const touch = e.touches[0];
      if (!touch) return;
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      // FIFO-Cap: älteste Welle kickt raus, neuer Tap kommt immer durch
      if (wavesRef.current.length >= 3) wavesRef.current.shift();
      wavesRef.current.push({ x, y, time: performance.now(), intensity: 2.5 });
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    // Listen for wave events from shapes
    function onWaveEvent(e: Event) {
      if (!isVisibleRef.current) return;
      const detail = (e as CustomEvent).detail;
      wavesRef.current.push({
        x: detail.x,
        y: detail.y,
        time: performance.now(),
        intensity: Math.min(detail.intensity, 3),
      });
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    function loop() {
      if (!running || !isActiveRef.current || !isVisibleRef.current) return;
      draw();

      const now = performance.now();
      // Keep running if any effects are active
      if (wavesRef.current.length > 0 || mouseRef.current.x > -500 ||
          bendsRef.current.length > 0 || chargeRef.current !== null ||
          now < shakeUntilRef.current || rainbowActiveRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        isActiveRef.current = false;
      }
    }

    cachedRectRef.current = canvas.getBoundingClientRect();
    draw();
    if (isCoarsePointer) {
      document.addEventListener("touchstart", onTouchStart, { passive: true });
    } else {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("click", onClick);
      document.addEventListener("dblclick", onDblClick);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("contextmenu", onContextMenu);
      document.addEventListener("keydown", onKeyDown);
    }
    document.addEventListener("grid-wave", onWaveEvent);

    function onScroll() {
      cachedRectRef.current = canvas!.getBoundingClientRect();
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      cachedRectRef.current = canvas.getBoundingClientRect();
      lastDrawRef.current = { x: -9999, y: -9999 };
      draw();
    });
    resizeObserver.observe(canvas);

    // Pause animation when canvas is off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          cancelAnimationFrame(rafRef.current);
          isActiveRef.current = false;
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    return () => {
      running = false;
      isActiveRef.current = false;
      cancelAnimationFrame(rafRef.current);
      if (isCoarsePointer) {
        document.removeEventListener("touchstart", onTouchStart);
      } else {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("click", onClick);
        document.removeEventListener("dblclick", onDblClick);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("contextmenu", onContextMenu);
        document.removeEventListener("keydown", onKeyDown);
      }
      document.removeEventListener("grid-wave", onWaveEvent);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [draw, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
