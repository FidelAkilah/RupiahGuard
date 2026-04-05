import clsx from "clsx";

interface ProvinceRow {
  name: string;
  riskScore: number;
  volume: string;
  velocity: string;
  anomalies: number;
  status: "Aman" | "Waspada" | "Siaga" | "Kritis";
}

const rows: ProvinceRow[] = [
  { name: "DKI Jakarta", riskScore: 87, volume: "1.25M", velocity: "3.8x", anomalies: 8, status: "Kritis" },
  { name: "Bali", riskScore: 82, volume: "520K", velocity: "3.5x", anomalies: 7, status: "Kritis" },
  { name: "Jawa Barat", riskScore: 78, volume: "890K", velocity: "3.2x", anomalies: 6, status: "Siaga" },
  { name: "Jawa Timur", riskScore: 72, volume: "780K", velocity: "3.0x", anomalies: 5, status: "Siaga" },
  { name: "Banten", riskScore: 58, volume: "340K", velocity: "2.7x", anomalies: 4, status: "Waspada" },
  { name: "Kalimantan Timur", riskScore: 55, volume: "145K", velocity: "2.6x", anomalies: 3, status: "Waspada" },
  { name: "Kepulauan Riau", riskScore: 52, volume: "89K", velocity: "2.5x", anomalies: 3, status: "Waspada" },
  { name: "Jawa Tengah", riskScore: 48, volume: "420K", velocity: "2.4x", anomalies: 3, status: "Aman" },
  { name: "Sulawesi Selatan", riskScore: 46, volume: "165K", velocity: "2.3x", anomalies: 2, status: "Aman" },
  { name: "Sumatera Utara", riskScore: 45, volume: "185K", velocity: "2.3x", anomalies: 3, status: "Aman" },
];

const statusStyles = {
  Aman: "bg-green-500/15 text-green-400",
  Waspada: "bg-amber-500/15 text-amber-400",
  Siaga: "bg-orange-500/15 text-orange-400",
  Kritis: "bg-red-500/15 text-red-400",
};

function getRiskColor(score: number): string {
  if (score > 75) return "text-red-400";
  if (score > 50) return "text-amber-400";
  if (score > 25) return "text-cyan-400";
  return "text-green-400";
}

export default function ProvinceSummaryTable() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Ringkasan Provinsi
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              <th className="pb-3 pr-6">Provinsi</th>
              <th className="pb-3 pr-6">Risk Score</th>
              <th className="pb-3 pr-6">Volume 24h</th>
              <th className="pb-3 pr-6">Velocity</th>
              <th className="pb-3 pr-6">Anomali Aktif</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-b border-slate-800 transition-colors last:border-0 hover:bg-slate-800/50"
              >
                <td className="py-3.5 pr-6 font-medium text-slate-300">
                  {row.name}
                </td>
                <td
                  className={clsx(
                    "py-3.5 pr-6 font-semibold",
                    getRiskColor(row.riskScore)
                  )}
                >
                  {row.riskScore}/100
                </td>
                <td className="py-3.5 pr-6 text-slate-400">{row.volume}</td>
                <td className="py-3.5 pr-6 text-slate-400">{row.velocity}</td>
                <td className="py-3.5 pr-6">
                  <span
                    className={clsx(
                      "font-medium",
                      row.anomalies > 5
                        ? "text-red-400"
                        : row.anomalies > 0
                          ? "text-amber-400"
                          : "text-slate-500"
                    )}
                  >
                    {row.anomalies}
                  </span>
                </td>
                <td className="py-3.5">
                  <span
                    className={clsx(
                      "inline-flex rounded-md px-2.5 py-1 text-xs font-medium",
                      statusStyles[row.status]
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
