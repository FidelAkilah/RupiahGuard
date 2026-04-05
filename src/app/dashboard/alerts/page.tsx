"use client";

import { useState, useMemo } from "react";
import {
  ShieldAlert,
  AlertOctagon,
  Search as SearchIcon,
  Clock,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";
import { MOCK_ALERTS, type AlertDetail } from "@/lib/mock-alerts";
import AlertCard from "@/components/dashboard/AlertCard";
import AlertDetailModal from "@/components/dashboard/AlertDetailModal";

type Severity = "all" | "critical" | "high" | "medium" | "low";
type Status = "all" | "active" | "investigating" | "resolved";
type SortBy = "newest" | "risk" | "region";

const severityFilters: { value: Severity; label: string }[] = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusFilters: { value: Status; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "investigating", label: "Investigating" },
  { value: "resolved", label: "Resolved" },
];

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "risk", label: "Risk Score Tertinggi" },
  { value: "region", label: "Region" },
];

const statCards = [
  {
    icon: ShieldAlert,
    label: "Total Alerts",
    value: "47",
    color: "text-slate-300",
    accent: "border-slate-600",
  },
  {
    icon: AlertOctagon,
    label: "Critical",
    value: "3",
    color: "text-red-400",
    accent: "border-red-500/40",
  },
  {
    icon: Clock,
    label: "Dalam Investigasi",
    value: "8",
    color: "text-amber-400",
    accent: "border-amber-500/40",
  },
  {
    icon: CheckCircle2,
    label: "Resolved Hari Ini",
    value: "12",
    color: "text-green-400",
    accent: "border-green-500/40",
  },
];

export default function AlertsPage() {
  const [severity, setSeverity] = useState<Severity>("all");
  const [status, setStatus] = useState<Status>("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [selectedAlert, setSelectedAlert] = useState<AlertDetail | null>(null);

  const filteredAlerts = useMemo(() => {
    let result = [...MOCK_ALERTS];

    if (severity !== "all") {
      result = result.filter((a) => a.severity === severity);
    }
    if (status !== "all") {
      result = result.filter((a) => a.status === status);
    }

    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        break;
      case "risk":
        result.sort((a, b) => b.riskScore - a.riskScore);
        break;
      case "region":
        result.sort((a, b) => a.region.localeCompare(b.region));
        break;
    }

    return result;
  }, [severity, status, sortBy]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Anomaly Alerts</h1>
        <p className="mt-1 text-sm text-slate-400">
          Pusat pemantauan anomali makro-prudensial real-time
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={clsx(
              "flex items-center gap-3 rounded-xl border bg-slate-800/50 px-4 py-3",
              stat.accent
            )}
          >
            <stat.icon className={clsx("h-5 w-5 shrink-0", stat.color)} />
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className={clsx("text-lg font-bold", stat.color)}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Severity pills */}
        <div className="flex flex-wrap gap-1.5">
          {severityFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSeverity(f.value)}
              className={clsx(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                severity === f.value
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "bg-slate-800 text-slate-400 hover:text-slate-300"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-slate-700" />

        {/* Status pills */}
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={clsx(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                status === f.value
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "bg-slate-800 text-slate-400 hover:text-slate-300"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-slate-700" />

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 outline-none transition-colors focus:border-cyan-500"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Count */}
        <span className="ml-auto text-xs text-slate-500">
          {filteredAlerts.length} alert
          {filteredAlerts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onViewDetail={setSelectedAlert}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-800/30 py-16">
            <SearchIcon className="mb-3 h-8 w-8 text-slate-600" />
            <p className="text-sm text-slate-500">
              Tidak ada alert yang sesuai filter
            </p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
}
