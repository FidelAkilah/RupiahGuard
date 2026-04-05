"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";

const pageNames: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/heatmap": "Heatmap Provinsi",
  "/dashboard/graph": "Transaction Graph",
  "/dashboard/alerts": "Anomaly Alerts",
  "/dashboard/analytics": "Analytics",
};

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const currentPage = pageNames[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur-sm">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="cursor-pointer rounded-md p-1.5 text-slate-400 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-sm">
          <span className="text-slate-500">Dashboard</span>
          {currentPage !== "Overview" && (
            <>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{currentPage}</span>
            </>
          )}
        </nav>
      </div>

      {/* Right: timestamp, bell, avatar */}
      <div className="flex items-center gap-5">
        <span className="hidden text-xs text-slate-500 sm:block">
          05 Apr 2026, 19:45:32 WIB
        </span>

        <button className="relative cursor-pointer text-slate-400 transition-colors hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            12
          </span>
        </button>

        <div className="h-8 w-8 rounded-full bg-slate-700" />
      </div>
    </header>
  );
}
