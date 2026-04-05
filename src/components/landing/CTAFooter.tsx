"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeInUp from "./FadeInUp";

export default function CTAFooter() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Siap Melihat RupiahGuard Beraksi?
          </h2>
          <p className="mt-4 text-slate-400">
            Eksplorasi dashboard demo dengan data simulasi 38 provinsi,
            3 infrastruktur pembayaran, dan deteksi anomali real-time.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex h-14 cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-10 text-base font-semibold text-white transition-colors duration-200 hover:bg-blue-500"
            >
              Masuk ke Dashboard Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </FadeInUp>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  );
}
