import MetricCard from "@/components/dashboard/MetricCard";
import TransactionChart from "@/components/dashboard/TransactionChart";
import RiskCorridorTable from "@/components/dashboard/RiskCorridorTable";
import DistributionChart from "@/components/dashboard/DistributionChart";
import RecentAlerts from "@/components/dashboard/RecentAlerts";

const metrics = [
  {
    label: "Total Transaksi (24h)",
    value: "4.2M",
    change: "+12.3%",
    trend: "up" as const,
    trendColor: "green" as const,
    accentColor: "#06b6d4",
  },
  {
    label: "Risk Score Nasional",
    value: "34/100",
    change: "-2.1",
    trend: "down" as const,
    trendColor: "green" as const,
    accentColor: "#10b981",
  },
  {
    label: "Anomali Aktif",
    value: "12",
    change: "+3",
    trend: "up" as const,
    trendColor: "red" as const,
    accentColor: "#ef4444",
  },
  {
    label: "Velocity of Money",
    value: "2.8x",
    change: "+0.3",
    trend: "up" as const,
    trendColor: "green" as const,
    accentColor: "#f59e0b",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left column - 2/3 */}
        <div className="space-y-6 xl:col-span-2">
          <TransactionChart />
          <RiskCorridorTable />
        </div>

        {/* Right column - 1/3 */}
        <div className="space-y-6">
          <DistributionChart />
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
}
