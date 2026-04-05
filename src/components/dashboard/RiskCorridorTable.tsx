import clsx from "clsx";

const corridors = [
  { rank: 1, route: "Jakarta \u2192 Jawa Barat", volume: "1.2M", risk: 78, level: "critical" as const },
  { rank: 2, route: "Jawa Timur \u2192 Bali", volume: "845K", risk: 65, level: "high" as const },
  { rank: 3, route: "Sumatera Utara \u2192 Riau", volume: "623K", risk: 54, level: "medium" as const },
  { rank: 4, route: "Jakarta \u2192 Banten", volume: "1.8M", risk: 47, level: "medium" as const },
  { rank: 5, route: "Sulawesi Selatan \u2192 Kalimantan Timur", volume: "312K", risk: 42, level: "medium" as const },
];

const badgeStyles = {
  critical: "bg-red-500/15 text-red-400",
  high: "bg-amber-500/15 text-amber-400",
  medium: "bg-yellow-500/15 text-yellow-400",
};

export default function RiskCorridorTable() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Top 5 Koridor Risiko Tertinggi
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left text-xs text-slate-500">
              <th className="pb-3 pr-4">#</th>
              <th className="pb-3 pr-4">Koridor</th>
              <th className="pb-3 pr-4">Volume</th>
              <th className="pb-3">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {corridors.map((c) => (
              <tr
                key={c.rank}
                className="border-b border-slate-800 last:border-0"
              >
                <td className="py-3 pr-4 text-slate-500">{c.rank}</td>
                <td className="py-3 pr-4 text-slate-300">{c.route}</td>
                <td className="py-3 pr-4 text-slate-400">{c.volume}</td>
                <td className="py-3">
                  <span
                    className={clsx(
                      "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                      badgeStyles[c.level]
                    )}
                  >
                    {c.risk}
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
