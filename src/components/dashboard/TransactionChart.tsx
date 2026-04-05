"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { time: "00:00", QRIS: 120000, "BI-FAST": 45000, RTGS: 8000 },
  { time: "02:00", QRIS: 80000, "BI-FAST": 32000, RTGS: 5000 },
  { time: "04:00", QRIS: 45000, "BI-FAST": 18000, RTGS: 3000 },
  { time: "06:00", QRIS: 95000, "BI-FAST": 38000, RTGS: 7000 },
  { time: "08:00", QRIS: 210000, "BI-FAST": 78000, RTGS: 15000 },
  { time: "10:00", QRIS: 310000, "BI-FAST": 120000, RTGS: 22000 },
  { time: "12:00", QRIS: 350000, "BI-FAST": 140000, RTGS: 28000 },
  { time: "14:00", QRIS: 290000, "BI-FAST": 110000, RTGS: 25000 },
  { time: "16:00", QRIS: 320000, "BI-FAST": 125000, RTGS: 20000 },
  { time: "18:00", QRIS: 280000, "BI-FAST": 95000, RTGS: 18000 },
  { time: "20:00", QRIS: 200000, "BI-FAST": 72000, RTGS: 12000 },
  { time: "22:00", QRIS: 150000, "BI-FAST": 55000, RTGS: 9000 },
];

export default function TransactionChart() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Volume Transaksi 24 Jam Terakhir
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillQRIS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillBIFAST" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillRTGS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#e2e8f0" }}
              formatter={(value) => Number(value).toLocaleString()}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
            />
            <Area
              type="monotone"
              dataKey="QRIS"
              stroke="#06b6d4"
              fill="url(#fillQRIS)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="BI-FAST"
              stroke="#3b82f6"
              fill="url(#fillBIFAST)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="RTGS"
              stroke="#8b5cf6"
              fill="url(#fillRTGS)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
