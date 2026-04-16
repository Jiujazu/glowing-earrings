"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextValue {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const typeStyles = {
    success: { bg: "#16a34a", icon: "✓" },
    error: { bg: "#dc2626", icon: "✗" },
    info: { bg: "var(--course-primary)", icon: "ℹ" },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="fixed bottom-20 left-6 z-[90] flex flex-col gap-2">
          {toasts.map((toast) => {
            const style = typeStyles[toast.type];
            return (
              <div
                key={toast.id}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white shadow-xl animate-slide-up"
                style={{ backgroundColor: style.bg }}
              >
                <span className="font-bold">{style.icon}</span>
                {toast.message}
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
}
