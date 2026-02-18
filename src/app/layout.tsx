import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: {
    default: "LaabhMitra — Check Government Scheme Eligibility | Free Financial Calculators",
    template: "%s | LaabhMitra",
  },
  description:
    "Check your eligibility for 700+ Indian government schemes in 2 minutes. Free income tax, EMI, SIP, GST calculators. Find schemes worth lakhs — PM Kisan, Ayushman Bharat, PMAY & more.",
  keywords: [
    "government schemes",
    "sarkari yojana",
    "eligibility check",
    "income tax calculator",
    "EMI calculator",
    "SIP calculator",
    "PM Kisan",
    "Ayushman Bharat",
  ],
  openGraph: {
    title: "LaabhMitra — Your Guide to Government Schemes & Financial Tools",
    description: "Check eligibility for 700+ government schemes. Free financial calculators.",
    url: "https://laabhmitra.in",
    siteName: "LaabhMitra",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaabhMitra — Government Scheme Eligibility Checker",
    description: "Check eligibility for 700+ schemes. Free calculators.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://laabhmitra.in"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
