import type { AnomalyAlert } from "./types";

export interface AlertDetail extends AnomalyAlert {
  relatedProvinces: string[];
  suggestedActions: string[];
  explainability: { feature: string; contribution: number }[];
}

export const MOCK_ALERTS: AlertDetail[] = [
  {
    id: "ALT-001",
    timestamp: "2026-04-05T19:42:00+07:00",
    severity: "critical",
    type: "Circular Flow Terdeteksi",
    region: "DKI Jakarta",
    description:
      "Pola round-tripping teridentifikasi pada koridor DKI Jakarta \u2192 Jawa Barat \u2192 Jawa Tengah \u2192 DKI Jakarta dengan volume kumulatif Rp 847M dalam 6 jam terakhir. Indikasi layering.",
    riskScore: 94,
    status: "active",
    relatedProvinces: ["DKI Jakarta", "Jawa Barat", "Jawa Tengah"],
    suggestedActions: [
      "Eskalasi ke tim AML untuk analisis mendalam",
      "Freeze sementara koridor JKT-JBR-JTG untuk transaksi > Rp 500M",
      "Cross-check dengan data PPATK untuk identifikasi beneficial owner",
      "Aktifkan enhanced monitoring pada 3 provinsi terkait",
    ],
    explainability: [
      { feature: "Circular Pattern", contribution: 40 },
      { feature: "Volume Deviation", contribution: 30 },
      { feature: "Velocity Spike", contribution: 20 },
      { feature: "Time Anomaly", contribution: 10 },
    ],
  },
  {
    id: "ALT-002",
    timestamp: "2026-04-05T19:38:00+07:00",
    severity: "critical",
    type: "Volume Anomali Ekstrem",
    region: "Bali",
    description:
      "Lonjakan volume transaksi QRIS di Bali sebesar 340% dari baseline dalam 2 jam terakhir. Tidak berkorelasi dengan event seasonal.",
    riskScore: 91,
    status: "investigating",
    relatedProvinces: ["Bali", "DKI Jakarta", "Jawa Timur"],
    suggestedActions: [
      "Verifikasi apakah ada event besar di Bali (konferensi, festival)",
      "Analisis distribusi merchant yang menerima lonjakan",
      "Cek apakah lonjakan terkonsentrasi pada satu acquirer",
      "Bandingkan dengan pola tourist spending seasonal",
    ],
    explainability: [
      { feature: "Volume Deviation", contribution: 55 },
      { feature: "Baseline Comparison", contribution: 25 },
      { feature: "Seasonal Mismatch", contribution: 15 },
      { feature: "Merchant Concentration", contribution: 5 },
    ],
  },
  {
    id: "ALT-003",
    timestamp: "2026-04-05T19:25:00+07:00",
    severity: "critical",
    type: "Shadow Banking Indicator",
    region: "Kepulauan Riau",
    description:
      "Terdeteksi 47 akun QRIS merchant di Batam dengan pola transaksi identik (amount, timing, counterparty). Indikasi structuring atau smurfing.",
    riskScore: 89,
    status: "active",
    relatedProvinces: ["Kepulauan Riau", "DKI Jakarta", "Sumatera Utara"],
    suggestedActions: [
      "Identifikasi 47 merchant dan pemilik beneficial",
      "Analisis graph connection antar merchant",
      "Laporkan ke PPATK jika confirmed structuring",
      "Blokir sementara akun yang terindikasi",
    ],
    explainability: [
      { feature: "Pattern Similarity", contribution: 45 },
      { feature: "Structuring Indicator", contribution: 30 },
      { feature: "Account Clustering", contribution: 15 },
      { feature: "Cross-border Proximity", contribution: 10 },
    ],
  },
  {
    id: "ALT-004",
    timestamp: "2026-04-05T19:10:00+07:00",
    severity: "high",
    type: "Konsentrasi Hub Abnormal",
    region: "Sumatera Utara",
    description:
      "85% aliran dana BI-FAST dari Sumatera Utara terkonsentrasi ke satu koridor (Medan \u2192 Jakarta). Rasio normal: 45%.",
    riskScore: 76,
    status: "active",
    relatedProvinces: ["Sumatera Utara", "DKI Jakarta"],
    suggestedActions: [
      "Analisis top 10 pengirim di koridor Medan-Jakarta",
      "Bandingkan dengan historical corridor distribution",
      "Cek apakah ada relokasi bisnis besar dari Medan",
    ],
    explainability: [
      { feature: "Hub Concentration", contribution: 50 },
      { feature: "Corridor Deviation", contribution: 30 },
      { feature: "Volume Anomaly", contribution: 20 },
    ],
  },
  {
    id: "ALT-005",
    timestamp: "2026-04-05T18:55:00+07:00",
    severity: "high",
    type: "Velocity Spike Regional",
    region: "DKI Jakarta",
    description:
      "Velocity of money di DKI Jakarta meningkat 2.1x dari baseline 24 jam. Potensi indikasi hot money flow.",
    riskScore: 72,
    status: "investigating",
    relatedProvinces: ["DKI Jakarta", "Banten", "Jawa Barat"],
    suggestedActions: [
      "Monitor velocity trend dalam 6 jam ke depan",
      "Cross-reference dengan data pasar modal (IHSG)",
      "Identifikasi sektor yang mendorong velocity spike",
    ],
    explainability: [
      { feature: "Velocity Deviation", contribution: 45 },
      { feature: "Turnover Rate", contribution: 30 },
      { feature: "Inflow-Outflow Ratio", contribution: 25 },
    ],
  },
  {
    id: "ALT-006",
    timestamp: "2026-04-05T18:40:00+07:00",
    severity: "high",
    type: "Cross-Platform Anomali",
    region: "Jawa Barat",
    description:
      "Pola split-transaction terdeteksi: dana masuk via RTGS (Rp 2.1B) lalu keluar dalam 30 menit via 420 transaksi QRIS kecil. Indikasi layering via payment platform switching.",
    riskScore: 78,
    status: "active",
    relatedProvinces: ["Jawa Barat", "DKI Jakarta"],
    suggestedActions: [
      "Trace seluruh 420 transaksi QRIS outbound",
      "Identifikasi beneficiary dari setiap transaksi",
      "Freeze akun pengirim RTGS sementara",
    ],
    explainability: [
      { feature: "Platform Switching", contribution: 40 },
      { feature: "Split Pattern", contribution: 35 },
      { feature: "Time Compression", contribution: 25 },
    ],
  },
  {
    id: "ALT-007",
    timestamp: "2026-04-05T18:20:00+07:00",
    severity: "medium",
    type: "Pola Transaksi Malam Hari",
    region: "Kalimantan Timur",
    description:
      "Peningkatan 180% volume QRIS di Kalimantan Timur antara 00:00-04:00 WIB. Deviasi signifikan dari pola normal.",
    riskScore: 56,
    status: "investigating",
    relatedProvinces: ["Kalimantan Timur"],
    suggestedActions: [
      "Analisis jenis merchant yang aktif pada jam tersebut",
      "Bandingkan dengan kota lain di Kalimantan",
    ],
    explainability: [
      { feature: "Time Anomaly", contribution: 55 },
      { feature: "Volume Deviation", contribution: 30 },
      { feature: "Merchant Category", contribution: 15 },
    ],
  },
  {
    id: "ALT-008",
    timestamp: "2026-04-05T17:55:00+07:00",
    severity: "medium",
    type: "Rasio Inflow-Outflow Abnormal",
    region: "Sulawesi Selatan",
    description:
      "Rasio inflow:outflow di Sulawesi Selatan berubah dari 1.1:1 menjadi 3.2:1 dalam 12 jam terakhir. Dana masuk tidak diikuti outflow proporsional.",
    riskScore: 51,
    status: "active",
    relatedProvinces: ["Sulawesi Selatan", "Kalimantan Timur"],
    suggestedActions: [
      "Monitor apakah outflow menyusul dalam 24 jam",
      "Cek apakah ada pembayaran besar yang pending",
    ],
    explainability: [
      { feature: "Ratio Deviation", contribution: 50 },
      { feature: "Historical Comparison", contribution: 35 },
      { feature: "Volume Scale", contribution: 15 },
    ],
  },
  {
    id: "ALT-009",
    timestamp: "2026-04-05T17:30:00+07:00",
    severity: "medium",
    type: "Dormant Account Reactivation",
    region: "Jawa Timur",
    description:
      "12 akun merchant QRIS yang dormant >6 bulan di Surabaya tiba-tiba aktif dengan total volume Rp 890M dalam 4 jam.",
    riskScore: 58,
    status: "active",
    relatedProvinces: ["Jawa Timur", "DKI Jakarta"],
    suggestedActions: [
      "Verifikasi status aktif merchant dengan acquirer",
      "Review KYC ulang untuk 12 akun terkait",
    ],
    explainability: [
      { feature: "Dormancy Break", contribution: 45 },
      { feature: "Volume Spike", contribution: 35 },
      { feature: "Account Clustering", contribution: 20 },
    ],
  },
  {
    id: "ALT-010",
    timestamp: "2026-04-05T16:45:00+07:00",
    severity: "low",
    type: "Deviasi Pola Mingguan",
    region: "DI Yogyakarta",
    description:
      "Volume transaksi QRIS di Yogyakarta 25% di bawah rata-rata untuk hari Sabtu. Kemungkinan terkait cuaca atau event lokal.",
    riskScore: 18,
    status: "resolved",
    relatedProvinces: ["DI Yogyakarta"],
    suggestedActions: ["Tidak perlu aksi. Monitoring standar."],
    explainability: [
      { feature: "Weekly Pattern", contribution: 60 },
      { feature: "Volume Deviation", contribution: 40 },
    ],
  },
  {
    id: "ALT-011",
    timestamp: "2026-04-05T15:20:00+07:00",
    severity: "low",
    type: "Minor Latency Spike",
    region: "Papua",
    description:
      "Latency pemrosesan BI-FAST di Papua meningkat dari 120ms ke 380ms selama 15 menit. Sudah kembali normal. Kemungkinan network congestion.",
    riskScore: 12,
    status: "resolved",
    relatedProvinces: ["Papua"],
    suggestedActions: ["Log untuk infrastructure review bulanan."],
    explainability: [
      { feature: "Latency Spike", contribution: 70 },
      { feature: "Duration", contribution: 30 },
    ],
  },
  {
    id: "ALT-012",
    timestamp: "2026-04-05T14:00:00+07:00",
    severity: "low",
    type: "Threshold Mendekati Batas",
    region: "Lampung",
    description:
      "Velocity of money di Lampung mendekati threshold peringatan (1.9x dari baseline). Belum melewati batas kritis.",
    riskScore: 22,
    status: "resolved",
    relatedProvinces: ["Lampung"],
    suggestedActions: ["Pantau jika velocity naik di atas 2.0x."],
    explainability: [
      { feature: "Velocity Proximity", contribution: 55 },
      { feature: "Trend Direction", contribution: 45 },
    ],
  },
];
