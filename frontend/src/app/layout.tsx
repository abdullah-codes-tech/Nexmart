import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexMart",
  description: "Your premium shopping destination",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}