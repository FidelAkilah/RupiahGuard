"use client";

import { Clock, Microscope, EyeOff } from "lucide-react";
import FadeInUp from "./FadeInUp";

const problems = [
  {
    icon: Clock,
    title: "Pengawasan Retrospektif",
    description:
      "Laporan datang T+1 hingga T+30, jauh dari real-time. Regulator selalu selangkah di belakang risiko yang sudah terjadi.",
  },
  {
    icon: Microscope,
    title: "FDS Beroperasi di Level Mikro",
    description:
      "Mendeteksi fraud per nasabah, bukan pola sistemik. Tidak mampu melihat korelasi antar-institusi dan antar-wilayah.",
  },
  {
    icon: EyeOff,
    title: "Shadow Banking Tak Terdeteksi",
    description:
      "Aliran dana ilegal lintas-platform baru diketahui setelah dampak meluas ke sistem keuangan formal.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Blind Spot dalam Pengawasan{" "}
            <span className="text-cyan-400">Sistem Pembayaran</span>
          </h2>
        </FadeInUp>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) => (
            <FadeInUp key={problem.title} delay={i * 0.1}>
              <div className="group h-full rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-colors duration-200 hover:border-slate-700">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border-l-2 border-cyan-500 bg-slate-800">
                  <problem.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {problem.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {problem.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
