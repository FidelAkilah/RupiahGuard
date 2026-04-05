"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "00", critical: 0, high: 1, medium: 2, low: 1 },
  { hour: "02", critical: 0, high: 0, medium: 1, low: 2 },
  { hour: "04", critical: 0, high: 0, medium: 0, low: 1 },
  { hour: "06", critical: 0, high: 1, medium: 1, low: 0 },
  { hour: "08", critical: 1, high: 2, medium: 3, low: 2 },
  { hour: "10", critical: 0, high: 2, medium: 4, low: 3 },
  { hour: "12", critical: 1, high: 3, medium: 2, low: 1 },
  { hour: "14", critical: 2, high: 4, medium: 5, low: 2 },
  { hour: "16", critical: 1, high: 2, medium: 3, low: 2 },
  { hour: "18", critical: 0, high: 1, medium: 2, low: 3 },
  { hour: "20", critical: 1, high: 1, medium: 1, low: 1 },
  { hour: "22", critical: 0, high: 0, medium: 2, low: 1 },
];

export default function AnomalyBarChart() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Anomali per Jam
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="hour"
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
              tickFormatter={(v: string) => `${v}:00`}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelFormatter={(v) => `${v}:00`}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Bar
              dataKey="critical"
              stackId="a"
              fill="#ef4444"
              name="Critical"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="high"
              stackId="a"
              fill="#f97316"
              name="High"
            />
            <Bar
              dataKey="medium"
              stackId="a"
              fill="#f59e0b"
              name="Medium"
            />
            <Bar
              dataKey="low"
              stackId="a"
              fill="#3b82f6"
              name="Low"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
