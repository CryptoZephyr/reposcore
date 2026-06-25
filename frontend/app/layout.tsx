import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reposcore.genlayer.com"),
  title: "RepoScore | GenLayer GitHub Audits",
  description: "AI-powered developer trust scores on GenLayer. Evaluate contribution quality, consistency, and technical impact on-chain.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "RepoScore | GenLayer GitHub Audits",
    description: "AI-powered developer trust scores on GenLayer.",
    url: "https://reposcore.genlayer.com",
    siteName: "RepoScore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RepoScore - Developer reputation, verified.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#11b8a5", // Electric Teal
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}