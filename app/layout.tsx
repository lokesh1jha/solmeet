import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Providers from "@/context/Provider";

export const metadata: Metadata = {
  title: "SolMeet - Connect with Solana Experts",
  description:
    "Book 1:1 sessions with top Solana experts and accelerate your Web3 journey with personalized guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster position="bottom-right" richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
