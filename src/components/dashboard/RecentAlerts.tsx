import clsx from "clsx";

const alerts = [
  {
    id: "1",
    severity: "critical" as const,
    description: "Lonjakan volume QRIS abnormal di Jakarta Selatan",
    time: "2 menit lalu",
  },
  {
    id: "2",
    severity: "high" as const,
    description: "Velocity of money anomali di Kalimantan Timur",
    time: "8 menit lalu",
  },
  {
    id: "3",
    severity: "medium" as const,
    description: "Pola transaksi circular terdeteksi via BI-FAST",
    time: "15 menit lalu",
  },
  {
    id: "4",
    severity: "high" as const,
    description: "Risk score meningkat tajam di koridor Jawa Timur-Bali",
    time: "23 menit lalu",
  },
  {
    id: "5",
    severity: "medium" as const,
    description: "Konsentrasi RTGS tidak wajar dari 3 bank di Sumatera",
    time: "41 menit lalu",
  },
];

const dotColors = {
  critical: "bg-red-500",
  high: "bg-amber-500",
  medium: "bg-yellow-500",
};

export default function RecentAlerts() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">Alert Terbaru</h3>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex gap-3">
            <span
              className={clsx(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                dotColors[alert.severity]
              )}
            />
            <div className="min-w-0">
              <p className="text-sm leading-snug text-slate-300">
                {alert.description}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{alert.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
