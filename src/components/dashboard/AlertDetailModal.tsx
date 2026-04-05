"use client";

import {
  X,
  MapPin,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";
import clsx from "clsx";
import type { AlertDetail } from "@/lib/mock-alerts";

interface AlertDetailModalProps {
  alert: AlertDetail;
  onClose: () => void;
}

const severityIcon = {
  critical: AlertOctagon,
  high: AlertTriangle,
  medium: AlertCircle,
  low: Info,
};

const severityColor = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-amber-400",
  low: "text-blue-400",
};

const severityBadge = {
  critical: "bg-red-500/15 text-red-400",
  high: "bg-orange-500/15 text-orange-400",
  medium: "bg-amber-500/15 text-amber-400",
  low: "bg-blue-500/15 text-blue-400",
};

const statusConfig = {
  active: { label: "Aktif", class: "bg-red-500/15 text-red-400" },
  investigating: {
    label: "Investigasi",
    class: "bg-amber-500/15 text-amber-400",
  },
  resolved: { label: "Resolved", class: "bg-green-500/15 text-green-400" },
};

const barColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-blue-500",
];

export default function AlertDetailModal({
  alert,
  onClose,
}: AlertDetailModalProps) {
  const Icon = severityIcon[alert.severity];
  const status = statusConfig[alert.status];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-slate-800 bg-slate-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 p-6">
          <div className="flex items-start gap-3">
            <Icon
              className={clsx(
                "mt-0.5 h-5 w-5 shrink-0",
                severityColor[alert.severity]
              )}
            />
            <div>
              <h2 className="text-lg font-bold text-white">{alert.type}</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {alert.region}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-slate-500 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Badges */}
          <div className="flex gap-2">
            <span
              className={clsx(
                "rounded-md px-2.5 py-1 text-xs font-semibold",
                severityBadge[alert.severity]
              )}
            >
              Risk Score: {alert.riskScore}
            </span>
            <span
              className={clsx(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                status.class
              )}
            >
              {status.label}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Deskripsi
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {alert.description}
            </p>
          </div>

          {/* Related provinces */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Provinsi Terkait
            </h3>
            <div className="flex flex-wrap gap-2">
              {alert.relatedProvinces.map((prov) => (
                <span
                  key={prov}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300"
                >
                  <MapPin className="h-3 w-3 text-cyan-400" />
                  {prov}
                </span>
              ))}
            </div>
          </div>

          {/* Explainability (SHAP-style) */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              AI Explainability -- Kontribusi Fitur
            </h3>
            <div className="space-y-2.5">
              {alert.explainability.map((item, i) => (
                <div key={item.feature}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{item.feature}</span>
                    <span className="font-medium text-slate-300">
                      {item.contribution}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={clsx(
                        "h-full rounded-full transition-all",
                        barColors[i % barColors.length]
                      )}
                      style={{ width: `${item.contribution}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested actions */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rekomendasi Aksi
            </h3>
            <ul className="space-y-2">
              {alert.suggestedActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                  <span className="text-slate-300">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 border-t border-slate-800 p-6">
          <button className="flex-1 cursor-pointer rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500">
            Mulai Investigasi
          </button>
          <button className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-white">
            Tandai Resolved
          </button>
        </div>
      </div>
    </>
  );
}
