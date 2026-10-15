import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://4sqblast.org",
  ),
  title: {
    default: "BLAST Church | A Place to Become",
    template: "%s | BLAST Church",
  },
  description:
    "Believers Living And Succeeding Together. Discover faith, authentic community, ministries, worship, and opportunities to grow with BLAST Church.",
  applicationName: "BLAST Church",
  openGraph: {
    type: "website",
    siteName: "BLAST Church",
    title: "BLAST Church | A Place to Become",
    description:
      "A vibrant community growing in faith, building real friendships, and making Jesus known.",
    images: [
      {
        url: "/blastlogo.png",
        alt: "BLAST Church",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "BLAST Church | A Place to Become",
    description:
      "Faith, friendship, purpose, and a community growing together.",
    images: ["/blastlogo.png"],
  },
  icons: {
    icon: "/blastlogo.png",
    apple: "/blastlogo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#30204F",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="flex min-h-screen flex-col bg-[#FBF8FF] font-sans text-[#30204F] antialiased selection:bg-[#D6B9F5] selection:text-[#30204F]">
        <Navbar />

        <main className="min-w-0 flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

