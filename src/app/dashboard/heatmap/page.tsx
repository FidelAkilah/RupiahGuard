"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { MOCK_PROVINCES } from "@/lib/mock-provinces";
import ProvinceRanking from "@/components/dashboard/ProvinceRanking";

const IndonesiaHeatmap = dynamic(
  () => import("@/components/dashboard/IndonesiaHeatmap"),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-800/50">
      <p className="text-sm text-slate-500">Memuat peta...</p>
    </div>
  );
}

const riskLevels = [
  { value: "all", label: "Semua" },
  { value: "low", label: "Rendah (0-25)" },
  { value: "medium", label: "Sedang (26-50)" },
  { value: "high", label: "Tinggi (51-75)" },
  { value: "critical", label: "Kritis (76-100)" },
];

const paymentTypes = [
  { value: "all", label: "Semua" },
  { value: "QRIS", label: "QRIS" },
  { value: "BI-FAST", label: "BI-FAST" },
  { value: "RTGS", label: "RTGS" },
];

export default function HeatmapPage() {
  const [riskFilter, setRiskFilter] = useState("all");
  const [_paymentFilter, setPaymentFilter] = useState("all");

  const filteredProvinces = useMemo(() => {
    if (riskFilter === "all") return MOCK_PROVINCES;

    return MOCK_PROVINCES.filter((p) => {
      switch (riskFilter) {
        case "low":
          return p.riskScore <= 25;
        case "medium":
          return p.riskScore > 25 && p.riskScore <= 50;
        case "high":
          return p.riskScore > 50 && p.riskScore <= 75;
        case "critical":
          return p.riskScore > 75;
        default:
          return true;
      }
    });
  }, [riskFilter]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Heatmap Risiko Provinsi
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Visualisasi real-time distribusi risiko makro-prudensial di 38 provinsi
          Indonesia
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          aria-label="Filter berdasarkan tingkat risiko"
          className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 outline-none transition-colors duration-200 focus:border-cyan-500"
        >
          {riskLevels.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        <select
          value={_paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          aria-label="Filter berdasarkan jenis pembayaran"
          className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 outline-none transition-colors duration-200 focus:border-cyan-500"
        >
          {paymentTypes.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <span className="rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400">
          {filteredProvinces.length} provinsi termonitor
        </span>
      </div>

      {/* Map + Sidebar */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="xl:col-span-3">
          <div className="h-[70vh] overflow-hidden rounded-xl border border-slate-700">
            <IndonesiaHeatmap provinces={filteredProvinces} />
          </div>
        </div>

        <div className="xl:col-span-1">
          <ProvinceRanking provinces={MOCK_PROVINCES} />
        </div>
      </div>
    </div>
  );
}
