import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import type { WalletContextState } from "@solana/wallet-adapter-react"
import axios from "axios"

const SOLMEET_FEE_PERCENTAGE = parseFloat(process.env.NEXT_PUBLIC_SOLMEET_FEE_PERCENTAGE || "0.1")
const SOLMEET_WALLET_ADDRESS = process.env.NEXT_PUBLIC_SOLMEET_WALLET_ADDRESS || ""

export async function processPayment(wallet: WalletContextState, expertWalletAddress: string, amountInSOL: number, platformFee: number) {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected")
  }

  const connection = new Connection("https://api.devnet.solana.com", "confirmed")
  const fromPubkey = wallet.publicKey
  const expertPubkey = new PublicKey(expertWalletAddress)
  const solmeetPubkey = new PublicKey(SOLMEET_WALLET_ADDRESS)

  const feeLamports = platformFee * LAMPORTS_PER_SOL
  const expertLamports = amountInSOL * LAMPORTS_PER_SOL

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: expertPubkey,
      lamports: expertLamports,
    }),
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: solmeetPubkey,
      lamports: feeLamports,
    }),
  )

  const { blockhash } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = fromPubkey

  const signedTransaction = await wallet.signTransaction(transaction)
  const signature = await connection.sendRawTransaction(signedTransaction.serialize())

  await connection.confirmTransaction(signature)

  return signature
}
