"use client";

import { FileText, TrendingUp, ShieldCheck, Lock } from "lucide-react";
import FadeInUp from "./FadeInUp";

const alignments = [
  {
    icon: FileText,
    title: "Blueprint SP 2025",
    description: "Mendukung mandat SupTech dalam cetak biru sistem pembayaran Bank Indonesia.",
  },
  {
    icon: TrendingUp,
    title: "Velocity of Money",
    description: "Monitoring real-time perputaran uang di 38 provinsi untuk stabilitas makro.",
  },
  {
    icon: ShieldCheck,
    title: "Anti Shadow Banking",
    description: "Deteksi dini aliran dana ilegal sebelum contagion sistemik terjadi.",
  },
  {
    icon: Lock,
    title: "UU PDP Compliant",
    description: "Hanya memproses data agregat anonim, sepenuhnya patuh terhadap regulasi privasi.",
  },
];

export default function AlignmentSection() {
  return (
    <section className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Selaras dengan Prioritas Strategis{" "}
            <span className="text-cyan-400">Bank Indonesia</span>
          </h2>
        </FadeInUp>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {alignments.map((item, i) => (
            <FadeInUp key={item.title} delay={i * 0.08}>
              <div className="group flex gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-colors duration-200 hover:border-slate-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
