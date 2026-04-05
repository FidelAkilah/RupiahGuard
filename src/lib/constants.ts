import { Province } from "./types";

// Color Palette
export const COLORS = {
  primary: "#1B3A5C",
  accent: "#0EA5E9",
  danger: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  darkBg: "#0F172A",
  cardBg: "#1E293B",
} as const;

// Indonesia map center
export const INDONESIA_CENTER = { lat: -2.5, lng: 118.0 } as const;

// All 38 provinces of Indonesia with approximate coordinates
export const PROVINCES: Province[] = [
  { id: "11", name: "Aceh", lat: 4.695, lng: 96.749, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "12", name: "Sumatera Utara", lat: 2.115, lng: 99.545, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "13", name: "Sumatera Barat", lat: -0.739, lng: 100.800, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "14", name: "Riau", lat: 1.609, lng: 101.382, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "15", name: "Jambi", lat: -1.610, lng: 103.613, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "16", name: "Sumatera Selatan", lat: -3.319, lng: 103.914, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "17", name: "Bengkulu", lat: -3.800, lng: 102.260, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "18", name: "Lampung", lat: -4.559, lng: 105.406, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "19", name: "Kepulauan Bangka Belitung", lat: -2.741, lng: 106.440, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "21", name: "Kepulauan Riau", lat: 3.945, lng: 108.142, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "31", name: "DKI Jakarta", lat: -6.208, lng: 106.846, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "32", name: "Jawa Barat", lat: -6.903, lng: 107.618, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "33", name: "Jawa Tengah", lat: -7.150, lng: 110.140, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "34", name: "DI Yogyakarta", lat: -7.797, lng: 110.370, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "35", name: "Jawa Timur", lat: -7.536, lng: 112.238, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "36", name: "Banten", lat: -6.405, lng: 106.064, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "51", name: "Bali", lat: -8.350, lng: 115.092, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "52", name: "Nusa Tenggara Barat", lat: -8.653, lng: 117.361, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "53", name: "Nusa Tenggara Timur", lat: -8.657, lng: 121.079, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "61", name: "Kalimantan Barat", lat: -0.279, lng: 111.475, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "62", name: "Kalimantan Tengah", lat: -1.682, lng: 113.382, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "63", name: "Kalimantan Selatan", lat: -3.092, lng: 115.283, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "64", name: "Kalimantan Timur", lat: 1.693, lng: 116.419, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "65", name: "Kalimantan Utara", lat: 3.073, lng: 116.041, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "71", name: "Sulawesi Utara", lat: 0.624, lng: 123.972, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "72", name: "Sulawesi Tengah", lat: -1.430, lng: 121.446, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "73", name: "Sulawesi Selatan", lat: -3.669, lng: 119.974, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "74", name: "Sulawesi Tenggara", lat: -4.145, lng: 122.175, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "75", name: "Gorontalo", lat: 0.696, lng: 122.446, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "76", name: "Sulawesi Barat", lat: -2.844, lng: 119.232, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "81", name: "Maluku", lat: -3.239, lng: 130.145, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "82", name: "Maluku Utara", lat: 1.571, lng: 127.809, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "91", name: "Papua", lat: -4.269, lng: 138.080, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "92", name: "Papua Barat", lat: -1.337, lng: 133.174, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "93", name: "Papua Selatan", lat: -6.500, lng: 139.500, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "94", name: "Papua Tengah", lat: -3.700, lng: 136.200, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "95", name: "Papua Pegunungan", lat: -4.100, lng: 138.900, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
  { id: "96", name: "Papua Barat Daya", lat: -1.800, lng: 132.200, riskScore: 0, transactionVolume: 0, velocityOfMoney: 0, anomalyCount: 0 },
];
