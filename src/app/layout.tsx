import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RupiahGuard -- AI SupTech Dashboard",
    template: "%s | RupiahGuard",
  },
  description:
    "Real-time macro-prudential surveillance for Indonesia's payment systems",
  openGraph: {
    title: "RupiahGuard -- AI SupTech Dashboard",
    description:
      "Real-time macro-prudential surveillance for Indonesia's payment systems",
    type: "website",
    locale: "id_ID",
    siteName: "RupiahGuard",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark-bg text-white">
        {children}
      </body>
    </html>
  );
}
