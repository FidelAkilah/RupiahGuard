"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Globe, Zap, ShieldAlert } from "lucide-react";

const stats = [
  { icon: Globe, label: "38 Provinsi Termonitor" },
  { icon: Activity, label: "3 Infrastruktur (QRIS, BI-FAST, RTGS)" },
  { icon: Zap, label: "Sub-second Latency" },
  { icon: ShieldAlert, label: "Real-time Alerts" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-6">
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle radial glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400">
            AI-Powered Supervisory Technology
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Setiap Transaksi QRIS Adalah{" "}
            <span className="text-cyan-400">Sensor Makro-Prudensial</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          RupiahGuard memberikan Bank Indonesia kemampuan pengawasan real-time
          terhadap risiko sistemik di seluruh infrastruktur pembayaran nasional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex h-12 cursor-pointer items-center rounded-lg bg-blue-600 px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500"
          >
            Lihat Dashboard Demo
          </Link>
          <a
            href="#solution"
            className="inline-flex h-12 cursor-pointer items-center rounded-lg border border-slate-700 px-8 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:border-slate-500 hover:text-white"
          >
            Baca Proposal
          </a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 py-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 text-sm text-slate-400"
            >
              <stat.icon className="h-4 w-4 shrink-0 text-cyan-500" aria-hidden="true" />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
