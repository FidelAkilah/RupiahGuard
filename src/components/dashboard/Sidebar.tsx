"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Map,
  Network,
  AlertTriangle,
  BarChart3,
  X,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/heatmap", label: "Heatmap Provinsi", icon: Map },
  { href: "/dashboard/graph", label: "Transaction Graph", icon: Network },
  { href: "/dashboard/alerts", label: "Anomaly Alerts", icon: AlertTriangle },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <ShieldCheck className="h-6 w-6 text-cyan-400" />
            <span className="text-lg font-bold text-white">RupiahGuard</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="cursor-pointer rounded-md p-1 text-slate-400 transition-colors duration-200 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "border-l-2 border-cyan-400 bg-cyan-500/10 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            System Online
          </div>
          <p className="mt-2 text-[11px] text-slate-600">
            PIDI Digdaya x Hackathon 2026
          </p>
        </div>
      </aside>
    </>
  );
}
