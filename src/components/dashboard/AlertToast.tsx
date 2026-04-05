"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertOctagon, Info, X } from "lucide-react";
import clsx from "clsx";

type Severity = "critical" | "high" | "medium" | "low";

interface Toast {
  id: number;
  severity: Severity;
  message: string;
}

const severityConfig: Record<
  Severity,
  { icon: typeof AlertTriangle; bg: string; border: string; text: string }
> = {
  critical: {
    icon: AlertOctagon,
    bg: "bg-red-500/10",
    border: "border-red-500/40",
    text: "text-red-400",
  },
  high: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    text: "text-amber-400",
  },
  medium: {
    icon: Info,
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
  },
  low: {
    icon: Info,
    bg: "bg-slate-500/10",
    border: "border-slate-600",
    text: "text-slate-400",
  },
};

const severities: Severity[] = ["critical", "high", "medium", "low"];

const messages = [
  "Alert baru terdeteksi",
  "Anomali transaksi terdeteksi",
  "Pola mencurigakan ditemukan",
  "Lonjakan volume terdeteksi",
  "Threshold risiko terlampaui",
];

export default function AlertToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    let nextId = 0;

    const interval = setInterval(() => {
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const id = nextId++;

      setToasts((prev) => [...prev.slice(-2), { id, severity, message }]);

      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 8000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-4 top-20 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = severityConfig[toast.severity];
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={clsx(
                "flex w-72 items-start gap-3 rounded-lg border p-3 shadow-lg backdrop-blur-sm",
                config.bg,
                config.border
              )}
            >
              <Icon className={clsx("mt-0.5 h-4 w-4 shrink-0", config.text)} />
              <div className="flex-1">
                <p className={clsx("text-xs font-semibold", config.text)}>
                  {toast.severity.charAt(0).toUpperCase() +
                    toast.severity.slice(1)}
                </p>
                <p className="text-xs text-slate-400">{toast.message}</p>
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="cursor-pointer rounded p-0.5 text-slate-500 transition-colors hover:text-white"
                aria-label="Tutup notifikasi"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
