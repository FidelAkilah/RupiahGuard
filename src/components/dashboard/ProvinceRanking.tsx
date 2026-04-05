import type { Province } from "@/lib/types";
import clsx from "clsx";

interface ProvinceRankingProps {
  provinces: Province[];
}

function getRiskColor(score: number): string {
  if (score <= 25) return "bg-green-500";
  if (score <= 50) return "bg-cyan-500";
  if (score <= 75) return "bg-amber-500";
  return "bg-red-500";
}

function getRiskBarBg(score: number): string {
  if (score <= 25) return "bg-green-500/20";
  if (score <= 50) return "bg-cyan-500/20";
  if (score <= 75) return "bg-amber-500/20";
  return "bg-red-500/20";
}

function formatVolume(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return String(v);
}

export default function ProvinceRanking({ provinces }: ProvinceRankingProps) {
  const ranked = [...provinces]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 10);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Provinsi Risiko Tertinggi
      </h3>
      <div className="space-y-3">
        {ranked.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3">
            <span className="w-5 shrink-0 text-xs font-medium text-slate-500">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="truncate text-sm text-slate-300">
                  {p.name}
                </span>
                <span className="ml-2 shrink-0 text-xs text-slate-500">
                  {formatVolume(p.transactionVolume)}
                </span>
              </div>
              <div
                className={clsx(
                  "mt-1 h-1.5 w-full overflow-hidden rounded-full",
                  getRiskBarBg(p.riskScore)
                )}
              >
                <div
                  className={clsx(
                    "h-full rounded-full transition-all",
                    getRiskColor(p.riskScore)
                  )}
                  style={{ width: `${p.riskScore}%` }}
                />
              </div>
            </div>
            <span
              className={clsx(
                "shrink-0 text-xs font-semibold",
                p.riskScore > 75
                  ? "text-red-400"
                  : p.riskScore > 50
                    ? "text-amber-400"
                    : p.riskScore > 25
                      ? "text-cyan-400"
                      : "text-green-400"
              )}
            >
              {p.riskScore}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
