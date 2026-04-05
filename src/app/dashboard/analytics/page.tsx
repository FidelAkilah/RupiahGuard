"use client";

import { useState } from "react";
import clsx from "clsx";
import VelocityChart from "@/components/dashboard/analytics/VelocityChart";
import RiskDistributionChart from "@/components/dashboard/analytics/RiskDistributionChart";
import VolumeStackChart from "@/components/dashboard/analytics/VolumeStackChart";
import AnomalyBarChart from "@/components/dashboard/analytics/AnomalyBarChart";
import RegionalRadar from "@/components/dashboard/analytics/RegionalRadar";
import ProvinceSummaryTable from "@/components/dashboard/analytics/ProvinceSummaryTable";

const timeRanges = ["24 Jam", "7 Hari", "30 Hari", "3 Bulan"];

export default function AnalyticsPage() {
  const [activeRange, setActiveRange] = useState("24 Jam");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Analytics &amp; Velocity of Money
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Analisis mendalam terhadap kesehatan sistem pembayaran nasional
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex gap-1.5">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={clsx(
                "cursor-pointer rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-150",
                activeRange === range
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "bg-slate-800 text-slate-400 hover:text-slate-300"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1 — Two large charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <VelocityChart />
        </div>
        <div className="xl:col-span-2">
          <RiskDistributionChart />
        </div>
      </div>

      {/* Row 2 — Three medium charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <VolumeStackChart />
        <AnomalyBarChart />
        <RegionalRadar />
      </div>

      {/* Row 3 — Summary table */}
      <ProvinceSummaryTable />
    </div>
  );
}
