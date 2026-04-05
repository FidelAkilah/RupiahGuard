import { TrendingUp, TrendingDown } from "lucide-react";
import clsx from "clsx";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  trendColor: "green" | "red";
  accentColor: string;
}

export default function MetricCard({
  label,
  value,
  change,
  trend,
  trendColor,
  accentColor,
}: MetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <div
        className="mb-4 h-1 w-12 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        <TrendIcon
          className={clsx(
            "h-3.5 w-3.5",
            trendColor === "green" ? "text-green-400" : "text-red-400"
          )}
        />
        <span
          className={clsx(
            "text-xs font-medium",
            trendColor === "green" ? "text-green-400" : "text-red-400"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
