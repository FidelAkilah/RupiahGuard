export interface GraphNode {
  id: string;
  label: string;
  abbr: string;
  x: number;
  y: number;
  radius: number;
  riskScore: number;
  volume: number;
  inflow: number;
  outflow: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  volume: number;
  thickness: number;
  status: "normal" | "suspicious" | "critical";
  label: string;
}

// Positions mapped to a ~1000x600 viewBox, roughly geographic
export const GRAPH_NODES: GraphNode[] = [
  { id: "JKT", label: "DKI Jakarta", abbr: "JKT", x: 340, y: 330, radius: 48, riskScore: 87, volume: 1250000, inflow: 680000, outflow: 570000 },
  { id: "JBR", label: "Jawa Barat", abbr: "JBR", x: 410, y: 370, radius: 40, riskScore: 78, volume: 890000, inflow: 420000, outflow: 470000 },
  { id: "JTG", label: "Jawa Tengah", abbr: "JTG", x: 480, y: 340, radius: 32, riskScore: 48, volume: 420000, inflow: 210000, outflow: 210000 },
  { id: "JTM", label: "Jawa Timur", abbr: "JTM", x: 550, y: 360, radius: 38, riskScore: 72, volume: 780000, inflow: 350000, outflow: 430000 },
  { id: "BTN", label: "Banten", abbr: "BTN", x: 290, y: 370, radius: 28, riskScore: 58, volume: 340000, inflow: 180000, outflow: 160000 },
  { id: "BLI", label: "Bali", abbr: "BLI", x: 620, y: 380, radius: 34, riskScore: 82, volume: 520000, inflow: 310000, outflow: 210000 },
  { id: "SMU", label: "Sumatera Utara", abbr: "SMU", x: 150, y: 180, radius: 26, riskScore: 45, volume: 185000, inflow: 95000, outflow: 90000 },
  { id: "RIA", label: "Riau", abbr: "RIA", x: 190, y: 250, radius: 22, riskScore: 38, volume: 112000, inflow: 58000, outflow: 54000 },
  { id: "SMS", label: "Sumatera Selatan", abbr: "SMS", x: 230, y: 320, radius: 22, riskScore: 42, volume: 97000, inflow: 48000, outflow: 49000 },
  { id: "KPR", label: "Kepulauan Riau", abbr: "KPR", x: 250, y: 160, radius: 20, riskScore: 52, volume: 89000, inflow: 52000, outflow: 37000 },
  { id: "KLT", label: "Kalimantan Timur", abbr: "KLT", x: 520, y: 180, radius: 24, riskScore: 55, volume: 145000, inflow: 72000, outflow: 73000 },
  { id: "SLS", label: "Sulawesi Selatan", abbr: "SLS", x: 620, y: 260, radius: 24, riskScore: 46, volume: 165000, inflow: 80000, outflow: 85000 },
  { id: "KLB", label: "Kalimantan Barat", abbr: "KLB", x: 420, y: 200, radius: 20, riskScore: 34, volume: 62000, inflow: 30000, outflow: 32000 },
  { id: "PPU", label: "Papua", abbr: "PPU", x: 880, y: 280, radius: 20, riskScore: 37, volume: 42000, inflow: 28000, outflow: 14000 },
  { id: "NTB", label: "Nusa Tenggara Barat", abbr: "NTB", x: 660, y: 420, radius: 18, riskScore: 25, volume: 45000, inflow: 22000, outflow: 23000 },
];

export const GRAPH_EDGES: GraphEdge[] = [
  // Jakarta hub — heavy connections
  { id: "e1", source: "JKT", target: "JBR", volume: 452000, thickness: 6, status: "critical", label: "Rp 452M" },
  { id: "e2", source: "JKT", target: "BTN", volume: 280000, thickness: 4.5, status: "normal", label: "Rp 280M" },
  { id: "e3", source: "JKT", target: "JTG", volume: 195000, thickness: 3.5, status: "normal", label: "Rp 195M" },
  { id: "e4", source: "JKT", target: "SMU", volume: 120000, thickness: 2.5, status: "suspicious", label: "Rp 120M" },
  { id: "e5", source: "JKT", target: "RIA", volume: 85000, thickness: 2, status: "normal", label: "Rp 85M" },
  { id: "e6", source: "JKT", target: "BLI", volume: 210000, thickness: 4, status: "suspicious", label: "Rp 210M" },
  { id: "e7", source: "JKT", target: "KPR", volume: 95000, thickness: 2, status: "suspicious", label: "Rp 95M" },
  { id: "e8", source: "JKT", target: "KLT", volume: 78000, thickness: 1.5, status: "normal", label: "Rp 78M" },

  // Circular flow: JKT → JBR → JTG → JKT (the JKT→JBR edge is e1, JTG→JKT is below)
  { id: "e9", source: "JBR", target: "JTG", volume: 165000, thickness: 3.5, status: "critical", label: "Rp 165M" },
  { id: "e10", source: "JTG", target: "JKT", volume: 148000, thickness: 3, status: "critical", label: "Rp 148M" },

  // Java corridor
  { id: "e11", source: "JTG", target: "JTM", volume: 175000, thickness: 3.5, status: "normal", label: "Rp 175M" },
  { id: "e12", source: "JTM", target: "BLI", volume: 230000, thickness: 4.5, status: "suspicious", label: "Rp 230M" },
  { id: "e13", source: "JBR", target: "JTM", volume: 92000, thickness: 2, status: "normal", label: "Rp 92M" },

  // Sumatera internal
  { id: "e14", source: "SMU", target: "RIA", volume: 65000, thickness: 1.5, status: "normal", label: "Rp 65M" },
  { id: "e15", source: "RIA", target: "SMS", volume: 48000, thickness: 1, status: "normal", label: "Rp 48M" },
  { id: "e16", source: "SMS", target: "BTN", volume: 55000, thickness: 1.5, status: "normal", label: "Rp 55M" },
  { id: "e17", source: "KPR", target: "SMU", volume: 42000, thickness: 1, status: "normal", label: "Rp 42M" },

  // East Indonesia
  { id: "e18", source: "KLT", target: "SLS", volume: 58000, thickness: 1.5, status: "normal", label: "Rp 58M" },
  { id: "e19", source: "SLS", target: "PPU", volume: 32000, thickness: 1, status: "normal", label: "Rp 32M" },
  { id: "e20", source: "KLB", target: "KLT", volume: 38000, thickness: 1, status: "normal", label: "Rp 38M" },
  { id: "e21", source: "BLI", target: "NTB", volume: 28000, thickness: 1, status: "normal", label: "Rp 28M" },
  { id: "e22", source: "JTM", target: "SLS", volume: 72000, thickness: 1.5, status: "normal", label: "Rp 72M" },

  // Suspicious cross-island
  { id: "e23", source: "BLI", target: "KPR", volume: 88000, thickness: 2, status: "suspicious", label: "Rp 88M" },
  { id: "e24", source: "KLT", target: "JKT", volume: 65000, thickness: 1.5, status: "normal", label: "Rp 65M" },
];

// Circular flow path IDs for visual highlight
export const CIRCULAR_FLOW_EDGES = ["e1", "e9", "e10"];
export const CIRCULAR_FLOW_NODES = ["JKT", "JBR", "JTG"];
