"use client";

import { useState } from "react";
import TransactionGraph from "@/components/dashboard/TransactionGraph";
import { GitBranch, AlertTriangle, RefreshCw } from "lucide-react";

const filters = [
  { value: "all" as const, label: "Semua Aliran" },
  { value: "suspicious" as const, label: "Hanya Mencurigakan" },
  { value: "critical" as const, label: "Hanya Kritis" },
];

const stats = [
  { icon: GitBranch, label: "Total Koridor", value: "47" },
  { icon: AlertTriangle, label: "Koridor Mencurigakan", value: "8", color: "text-amber-400" },
  { icon: RefreshCw, label: "Circular Flow Terdeteksi", value: "2", color: "text-red-400" },
];

export default function GraphPage() {
  const [filter, setFilter] = useState<"all" | "suspicious" | "critical">(
    "all"
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Graph Jaringan Transaksi
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Visualisasi aliran dana antar-wilayah untuk deteksi pola sistemik
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              filter === f.value
                ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div className="h-[75vh] overflow-hidden rounded-xl border border-slate-700 bg-slate-800/30">
        <TransactionGraph filter={filter} />
      </div>

      {/* Bottom stats strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-4"
          >
            <stat.icon
              className={`h-5 w-5 ${stat.color ?? "text-slate-400"}`}
            />
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p
                className={`text-lg font-bold ${stat.color ?? "text-white"}`}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
