import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SociallyIn — AI Outbound Intelligence System",
  description:
    "8-agent AI pipeline: ICP scoring, account mapping, cross-platform intel, hyper-personalized sequences, and HubSpot Enterprise sync.",
  openGraph: {
    title: "SociallyIn — AI Outbound Intelligence System",
    description: "Enterprise-grade AI outbound built on top of SociallyIn's HubSpot infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0F1624] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
