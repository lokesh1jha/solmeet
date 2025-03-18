"use client";

import { SessionProvider } from "next-auth/react";
import { AppProvider } from "./AppContext";
import { SolanaWalletProvider } from "@/components/solana-wallet-provider";
import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </AppProvider>
    </SessionProvider>
  );
}
