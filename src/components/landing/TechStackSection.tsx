"use client";

import FadeInUp from "./FadeInUp";

const techStack = [
  "Apache Kafka",
  "FastAPI",
  "PyTorch Geometric",
  "XGBoost",
  "React",
  "D3.js",
  "TimescaleDB",
  "Kubernetes",
];

export default function TechStackSection() {
  return (
    <section className="border-y border-slate-800/60 bg-slate-900/30 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Dibangun dengan Teknologi{" "}
            <span className="text-cyan-400">Production-Ready</span>
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:border-cyan-500/40 hover:text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
