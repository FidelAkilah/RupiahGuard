"use client";

import {
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const data = [
  { time: "00:00", aktual: 2.4, baseline: 2.3 },
  { time: "01:00", aktual: 2.3, baseline: 2.3 },
  { time: "02:00", aktual: 2.2, baseline: 2.2 },
  { time: "03:00", aktual: 2.1, baseline: 2.2 },
  { time: "04:00", aktual: 2.0, baseline: 2.1 },
  { time: "05:00", aktual: 2.1, baseline: 2.1 },
  { time: "06:00", aktual: 2.3, baseline: 2.2 },
  { time: "07:00", aktual: 2.5, baseline: 2.3 },
  { time: "08:00", aktual: 2.7, baseline: 2.4 },
  { time: "09:00", aktual: 2.9, baseline: 2.5 },
  { time: "10:00", aktual: 3.1, baseline: 2.6 },
  { time: "11:00", aktual: 3.3, baseline: 2.7 },
  { time: "12:00", aktual: 3.4, baseline: 2.8 },
  { time: "13:00", aktual: 3.5, baseline: 2.8 },
  { time: "14:00", aktual: 3.8, baseline: 2.8 },
  { time: "15:00", aktual: 3.6, baseline: 2.7 },
  { time: "16:00", aktual: 3.4, baseline: 2.7 },
  { time: "17:00", aktual: 3.2, baseline: 2.6 },
  { time: "18:00", aktual: 3.0, baseline: 2.5 },
  { time: "19:00", aktual: 2.8, baseline: 2.5 },
  { time: "20:00", aktual: 2.7, baseline: 2.4 },
  { time: "21:00", aktual: 2.6, baseline: 2.4 },
  { time: "22:00", aktual: 2.5, baseline: 2.3 },
  { time: "23:00", aktual: 2.4, baseline: 2.3 },
];

// Range area: [baseline, aktual] when aktual > baseline, otherwise null
const chartData = data.map((d) => ({
  ...d,
  deviationRange:
    d.aktual > d.baseline
      ? [d.baseline, d.aktual]
      : [d.baseline, d.baseline],
}));

export default function VelocityChart() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Velocity of Money -- Tren Nasional
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="deviationFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
              interval={2}
            />
            <YAxis
              domain={[1.5, 4.0]}
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v.toFixed(1)}x`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#94a3b8" }}
              formatter={(value, name) => [
                `${Number(value).toFixed(1)}x`,
                name === "aktual" ? "Aktual" : name === "baseline" ? "Baseline" : String(name),
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value: string) =>
                value === "aktual" ? "Aktual" : value === "baseline" ? "Baseline" : value
              }
            />
            <ReferenceLine
              y={3.5}
              stroke="#ef4444"
              strokeDasharray="6 3"
              strokeOpacity={0.6}
              label={{
                value: "Threshold Peringatan",
                fill: "#ef4444",
                fontSize: 10,
                position: "insideTopRight",
              }}
            />
            {/* Deviation fill between lines when aktual > baseline */}
            <Area
              type="monotone"
              dataKey="deviationRange"
              fill="url(#deviationFill)"
              stroke="none"
              legendType="none"
              tooltipType="none"
            />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#475569"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="aktual"
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "#06b6d4" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
