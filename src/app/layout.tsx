import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/components/providers";
import { Navigation } from "@/components/navigation/Navigation";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { Footer } from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dennisopoku.com"),
  title: {
    default: "Dennis Opoku Asiedu — Builder",
    template: "%s | Dennis Opoku Asiedu",
  },
  description:
    "Dennis Opoku Asiedu is a multidisciplinary builder — software engineer, AI architect, creative director, and entrepreneur building products, brands, and experiences at the frontier of technology.",
  keywords: [
    "Dennis Opoku Asiedu",
    "Software Engineer",
    "AI Engineer",
    "Creative Director",
    "Entrepreneur",
    "Ghana",
    "Africa",
    "Full Stack Developer",
    "Product Designer",
  ],
  authors: [{ name: "Dennis Opoku Asiedu" }],
  creator: "Dennis Opoku Asiedu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dennisopoku.com",
    siteName: "Dennis Opoku Asiedu",
    title: "Dennis Opoku Asiedu — Builder",
    description: "I build products, brands and experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dennis Opoku Asiedu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dennis Opoku Asiedu — Builder",
    description: "I build products, brands and experiences.",
    creator: "@dennisopoku",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <RootProviders>
          <Navigation />
          <CommandPalette />
          <main>{children}</main>
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
