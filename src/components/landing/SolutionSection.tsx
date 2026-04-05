"use client";

import { Layers, BrainCircuit, Monitor } from "lucide-react";
import FadeInUp from "./FadeInUp";

const layers = [
  {
    num: "01",
    icon: Layers,
    title: "Stream Processing Layer",
    description:
      "Apache Kafka memproses jutaan transaksi per detik dari QRIS, BI-FAST, dan RTGS secara simultan dengan latensi sub-second.",
  },
  {
    num: "02",
    icon: BrainCircuit,
    title: "Graph Intelligence Layer",
    description:
      "Graph Neural Network mendeteksi pola sistemik, anomali velocity of money, dan jaringan shadow banking lintas-provinsi.",
  },
  {
    num: "03",
    icon: Monitor,
    title: "Visualization Layer",
    description:
      "Dashboard geospasial real-time menampilkan risk heatmap 38 provinsi, network graph, dan alert otomatis untuk pengawas.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <FadeInUp>
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Tiga Lapisan{" "}
            <span className="text-cyan-400">Intelijen AI</span>
          </h2>
        </FadeInUp>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent md:block" />

          <div className="space-y-10">
            {layers.map((layer, i) => (
              <FadeInUp key={layer.num} delay={i * 0.12}>
                <div className="relative flex gap-6">
                  {/* Number badge */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-slate-900 text-sm font-bold text-cyan-400">
                    {layer.num}
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-colors duration-200 hover:border-slate-700">
                    <div className="mb-2 flex items-center gap-2">
                      <layer.icon className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-semibold text-white">
                        {layer.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
