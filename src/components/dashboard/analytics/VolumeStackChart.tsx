"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", QRIS: 120, BIFAST: 45, RTGS: 8 },
  { time: "02:00", QRIS: 80, BIFAST: 32, RTGS: 5 },
  { time: "04:00", QRIS: 45, BIFAST: 18, RTGS: 3 },
  { time: "06:00", QRIS: 95, BIFAST: 38, RTGS: 7 },
  { time: "08:00", QRIS: 210, BIFAST: 78, RTGS: 15 },
  { time: "10:00", QRIS: 310, BIFAST: 120, RTGS: 22 },
  { time: "12:00", QRIS: 350, BIFAST: 140, RTGS: 28 },
  { time: "14:00", QRIS: 380, BIFAST: 155, RTGS: 32 },
  { time: "16:00", QRIS: 320, BIFAST: 125, RTGS: 20 },
  { time: "18:00", QRIS: 280, BIFAST: 95, RTGS: 18 },
  { time: "20:00", QRIS: 200, BIFAST: 72, RTGS: 12 },
  { time: "22:00", QRIS: 150, BIFAST: 55, RTGS: 9 },
];

export default function VolumeStackChart() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Volume per Infrastruktur
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="stackQRIS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="stackBIFAST" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="stackRTGS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value, name) => [
                `${value}K`,
                name === "BIFAST" ? "BI-FAST" : String(name),
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px" }}
              formatter={(value: string) =>
                value === "BIFAST" ? "BI-FAST" : value
              }
            />
            <Area
              type="monotone"
              dataKey="RTGS"
              stackId="1"
              stroke="#8b5cf6"
              fill="url(#stackRTGS)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="BIFAST"
              stackId="1"
              stroke="#3b82f6"
              fill="url(#stackBIFAST)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="QRIS"
              stackId="1"
              stroke="#06b6d4"
              fill="url(#stackQRIS)"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
