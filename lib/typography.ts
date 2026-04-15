/**
 * Shared Neo-Brutal typography classes.
 *
 * Structural only (font-family, weight, transform, spacing).
 * Size, color, and margin are set per component.
 */

/** Page/section headings — Space Grotesk, black weight, uppercase */
export const HEADING = "font-heading font-black uppercase tracking-tight";

/** Hero/display headings — tighter tracking for massive text */
export const HEADING_DISPLAY = "font-heading font-black tracking-tighter";

/** Small uppercase labels (e.g. "Themen", "Quelle", "Inhalt") */
export const LABEL = "font-black uppercase tracking-widest";

/** Button & navigation text */
export const BUTTON_TEXT = "font-heading font-bold uppercase tracking-wide";

/** Badge text */
export const BADGE_TEXT = "font-bold uppercase tracking-wide";

/** Body text — DM Sans, medium weight for shell pages */
export const BODY = "font-medium";

/** Bold inline text */
export const BOLD = "font-black";

/** Prose heading overrides for course markdown content */
export const PROSE_HEADINGS = "prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight";
