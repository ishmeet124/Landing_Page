"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, message: string) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-[100] flex flex-col gap-2 sm:max-w-sm w-auto pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />,
    error: <XCircle className="w-4.5 h-4.5 text-red-400" />,
    info: <Info className="w-4.5 h-4.5 text-indigo-400" />,
  };

  const borderAccents = {
    success: "border-l-2 border-l-emerald-500",
    error: "border-l-2 border-l-red-500",
    info: "border-l-2 border-l-indigo-500",
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 bg-[#151824] border border-[#232838] ${borderAccents[toast.type]} rounded-lg px-3.5 py-3 shadow-xl shadow-black/30 animate-fade-in`}
      role="alert"
    >
      <span className="flex-shrink-0 mt-0.5">{icons[toast.type]}</span>
      <p className="text-xs sm:text-sm text-slate-200 font-medium flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
