"use client";

import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Info,
  MapPin,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";
import type { AlertDetail } from "@/lib/mock-alerts";

interface AlertCardProps {
  alert: AlertDetail;
  onViewDetail: (alert: AlertDetail) => void;
}

const severityConfig = {
  critical: {
    icon: AlertOctagon,
    bar: "bg-red-500",
    iconColor: "text-red-400",
    bg: "bg-red-500/5",
    border: "border-red-500/20",
    badge: "bg-red-500/15 text-red-400",
  },
  high: {
    icon: AlertTriangle,
    bar: "bg-orange-500",
    iconColor: "text-orange-400",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    badge: "bg-orange-500/15 text-orange-400",
  },
  medium: {
    icon: AlertCircle,
    bar: "bg-amber-500",
    iconColor: "text-amber-400",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    badge: "bg-amber-500/15 text-amber-400",
  },
  low: {
    icon: Info,
    bar: "bg-blue-500",
    iconColor: "text-blue-400",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    badge: "bg-blue-500/15 text-blue-400",
  },
};

const statusConfig = {
  active: { label: "Aktif", class: "bg-red-500/15 text-red-400" },
  investigating: {
    label: "Investigasi",
    class: "bg-amber-500/15 text-amber-400",
  },
  resolved: { label: "Resolved", class: "bg-green-500/15 text-green-400" },
};

function getRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
}

export default function AlertCard({ alert, onViewDetail }: AlertCardProps) {
  const severity = severityConfig[alert.severity];
  const status = statusConfig[alert.status];
  const SeverityIcon = severity.icon;

  return (
    <div
      className={clsx(
        "group flex overflow-hidden rounded-xl border transition-colors duration-150",
        severity.border,
        severity.bg,
        "hover:border-slate-600"
      )}
    >
      {/* Severity bar */}
      <div className={clsx("w-1 shrink-0", severity.bar)} />

      <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-start">
        {/* Icon */}
        <div className="shrink-0 pt-0.5">
          <SeverityIcon className={clsx("h-5 w-5", severity.iconColor)} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-white">{alert.type}</h3>
            <span className="text-xs text-slate-500">|</span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3" />
              {alert.region}
            </span>
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {alert.description}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span>{getRelativeTime(alert.timestamp)}</span>
            <span className="text-slate-700">|</span>
            <span>{formatTime(alert.timestamp)}</span>
          </div>
        </div>

        {/* Right: badges + actions */}
        <div className="flex shrink-0 flex-wrap items-start gap-2 sm:flex-col sm:items-end">
          <div className="flex gap-2">
            <span
              className={clsx(
                "rounded-md px-2 py-1 text-xs font-semibold",
                severity.badge
              )}
            >
              {alert.riskScore}
            </span>
            <span
              className={clsx(
                "rounded-md px-2 py-1 text-xs font-medium",
                status.class
              )}
            >
              {status.label}
            </span>
          </div>

          <button
            onClick={() => onViewDetail(alert)}
            className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors duration-150 hover:border-cyan-500/50 hover:text-cyan-400"
          >
            Detail
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
