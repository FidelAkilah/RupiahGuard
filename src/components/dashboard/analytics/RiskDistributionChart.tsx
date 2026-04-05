"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "DKI Jakarta", score: 87 },
  { name: "Bali", score: 82 },
  { name: "Jawa Barat", score: 78 },
  { name: "Jawa Timur", score: 72 },
  { name: "Banten", score: 58 },
  { name: "Kalimantan Timur", score: 55 },
  { name: "Kepulauan Riau", score: 52 },
  { name: "Jawa Tengah", score: 48 },
  { name: "Sulawesi Selatan", score: 46 },
  { name: "Sumatera Utara", score: 45 },
];

function getColor(score: number): string {
  if (score > 75) return "#EF4444";
  if (score > 50) return "#F59E0B";
  if (score > 25) return "#06B6D4";
  return "#10B981";
}

export default function RiskDistributionChart() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Distribusi Risk Score per Provinsi
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value}/100`, "Risk Score"]}
              cursor={{ fill: "rgba(148,163,184,0.05)" }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={18}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={getColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
