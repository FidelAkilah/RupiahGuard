"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Province } from "@/lib/types";
import clsx from "clsx";

interface IndonesiaHeatmapProps {
  provinces: Province[];
}

function getRiskColor(score: number): string {
  if (score <= 25) return "#10B981";
  if (score <= 50) return "#06B6D4";
  if (score <= 75) return "#F59E0B";
  return "#EF4444";
}

function getRadius(volume: number, maxVolume: number): number {
  const min = 8;
  const max = 25;
  const ratio = Math.sqrt(volume / maxVolume);
  return min + ratio * (max - min);
}

function getRiskLabel(score: number): string {
  if (score <= 25) return "Rendah";
  if (score <= 50) return "Sedang";
  if (score <= 75) return "Tinggi";
  return "Kritis";
}

export default function IndonesiaHeatmap({ provinces }: IndonesiaHeatmapProps) {
  const maxVolume = Math.max(...provinces.map((p) => p.transactionVolume));

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[-2.5, 118.0]}
        zoom={5}
        className="h-full w-full rounded-xl"
        zoomControl={false}
        attributionControl={false}
        style={{ background: "#0f172a" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {provinces.map((province) => {
          const color = getRiskColor(province.riskScore);
          const radius = getRadius(province.transactionVolume, maxVolume);
          const isCritical = province.riskScore > 75;

          return (
            <CircleMarker
              key={province.id}
              center={[province.lat, province.lng]}
              radius={radius}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.6,
                weight: isCritical ? 2 : 1,
                opacity: isCritical ? 0.9 : 0.7,
              }}
              className={clsx(isCritical && "heatmap-pulse")}
            >
              <Tooltip
                direction="top"
                offset={[0, -8]}
                className="heatmap-tooltip"
              >
                <div className="text-xs">
                  <span className="font-semibold">{province.name}</span>
                  <br />
                  Risk Score:{" "}
                  <span style={{ color }}>{province.riskScore}/100</span>
                </div>
              </Tooltip>

              <Popup className="heatmap-popup">
                <div className="min-w-[200px] space-y-2 text-sm">
                  <h4 className="text-base font-bold text-slate-900">
                    {province.name}
                  </h4>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Risk Score</span>
                      <span className="font-semibold" style={{ color }}>
                        {province.riskScore}/100 ({getRiskLabel(province.riskScore)})
                      </span>
                    </div>

                    {/* Risk bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${province.riskScore}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Volume Transaksi</span>
                      <span className="font-medium text-slate-700">
                        {province.transactionVolume.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Velocity of Money</span>
                      <span className="font-medium text-slate-700">
                        {province.velocityOfMoney.toFixed(1)}x
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Anomali Aktif</span>
                      <span
                        className={clsx(
                          "font-medium",
                          province.anomalyCount > 0
                            ? "text-red-600"
                            : "text-green-600"
                        )}
                      >
                        {province.anomalyCount}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] rounded-lg border border-slate-700 bg-slate-900/90 p-3 backdrop-blur-sm">
        <p className="mb-2 text-xs font-semibold text-slate-300">Risk Level</p>
        <div className="space-y-1">
          {[
            { color: "#10B981", label: "Rendah (0-25)" },
            { color: "#06B6D4", label: "Sedang (26-50)" },
            { color: "#F59E0B", label: "Tinggi (51-75)" },
            { color: "#EF4444", label: "Kritis (76-100)" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-slate-700 pt-2">
          <p className="mb-1.5 text-xs font-semibold text-slate-300">Volume</p>
          <div className="flex items-end gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
              Rendah
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block h-4 w-4 rounded-full bg-slate-500" />
              Tinggi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
