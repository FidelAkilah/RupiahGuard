"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { region: "Jawa", volume: 92, risk: 78 },
  { region: "Sumatera", volume: 45, risk: 38 },
  { region: "Kalimantan", volume: 32, risk: 42 },
  { region: "Sulawesi", volume: 28, risk: 30 },
  { region: "Bali-Nusra", volume: 55, risk: 68 },
  { region: "Papua-Maluku", volume: 12, risk: 22 },
];

export default function RegionalRadar() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Konsentrasi Regional
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis
              dataKey="region"
              tick={{ fill: "#94a3b8", fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#475569", fontSize: 9 }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Radar
              name="Volume"
              dataKey="volume"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="Risk"
              dataKey="risk"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
