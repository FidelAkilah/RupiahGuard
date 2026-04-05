export interface Province {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskScore: number;
  transactionVolume: number;
  velocityOfMoney: number;
  anomalyCount: number;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  type: "QRIS" | "BI-FAST" | "RTGS";
  riskFlag: "normal" | "suspicious" | "critical";
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  type: string;
  region: string;
  description: string;
  riskScore: number;
  status: "active" | "investigating" | "resolved";
}

export interface RiskMetric {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
}
