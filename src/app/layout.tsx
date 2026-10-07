import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { midtransConfig } from "@/lib/midtrans";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dadang Hamdani — Edukasi Web, Aplikasi, AI & Blockchain",
  description:
    "Edukasi seputar website, aplikasi, AI dan Blockchain. Temukan kursus, ebook, dan source code berkualitas untuk mempercepat perjalanan belajarmu.",
  keywords: [
    "Dadang Hamdani",
    "edukasi web",
    "aplikasi mobile",
    "AI",
    "Blockchain",
    "Web3",
    "source code",
    "kursus online",
  ],
  authors: [{ name: "Dadang Hamdani" }],
  alternates: {
    canonical: "https://dadanghamdani.my.id/",
  },
  openGraph: {
    title: "Dadang Hamdani — Edukasi Web, Aplikasi, AI & Blockchain",
    description:
      "Edukasi seputar website, aplikasi, AI dan Blockchain.",
    url: "https://dadanghamdani.my.id/",
    siteName: "Dadang Hamdani",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dadang Hamdani",
    description:
      "Edukasi seputar website, aplikasi, AI dan Blockchain.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Midtrans Snap.js — dipakai untuk membuka popup pembayaran */}
        {midtransConfig.isConfigured ? (
          <Script
            src={midtransConfig.snapJsUrl}
            data-client-key={midtransConfig.clientKey}
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
