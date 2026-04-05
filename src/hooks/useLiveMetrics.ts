"use client";

import { useState, useEffect, useRef } from "react";

interface LiveMetrics {
  totalTransaksi: number;
  totalTransaksiFormatted: string;
  totalChange: string;
  anomaliAktif: number;
  anomaliChange: string;
  anomaliTrend: "up" | "down";
  anomaliTrendColor: "red" | "green";
}

export function useLiveMetrics(): LiveMetrics {
  const [totalTransaksi, setTotalTransaksi] = useState(4_200_000);
  const [anomaliAktif, setAnomaliAktif] = useState(12);
  const baseTotal = useRef(4_200_000);
  const baseAnomali = useRef(12);

  useEffect(() => {
    // Increment total transactions every 3 seconds
    const txInterval = setInterval(() => {
      setTotalTransaksi((prev) => {
        const increment = Math.floor(Math.random() * 800) + 200;
        return prev + increment;
      });
    }, 3000);

    // Add anomaly every ~30 seconds
    const addAnomalyInterval = setInterval(() => {
      setAnomaliAktif((prev) => Math.min(prev + 1, 20));
    }, 30000);

    // Resolve anomaly every ~45 seconds
    const resolveAnomalyInterval = setInterval(() => {
      setAnomaliAktif((prev) => Math.max(prev - 1, 8));
    }, 45000);

    return () => {
      clearInterval(txInterval);
      clearInterval(addAnomalyInterval);
      clearInterval(resolveAnomalyInterval);
    };
  }, []);

  const txDiff = totalTransaksi - baseTotal.current;
  const txChangePercent = ((txDiff / baseTotal.current) * 100).toFixed(1);

  const anomaliDiff = anomaliAktif - baseAnomali.current;

  return {
    totalTransaksi,
    totalTransaksiFormatted: `${(totalTransaksi / 1_000_000).toFixed(1)}M`,
    totalChange: `+${txChangePercent}%`,
    anomaliAktif,
    anomaliChange: `${anomaliDiff >= 0 ? "+" : ""}${anomaliDiff}`,
    anomaliTrend: anomaliDiff >= 0 ? "up" : "down",
    anomaliTrendColor: anomaliDiff >= 0 ? "red" : "green",
  };
}
