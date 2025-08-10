import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "MonsterCat",
  description: "A music player for your favorite tracks",
};
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-black `}>
        <Header />
        {children}
      </body>
    </html>
  );
}
