import { createMint, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from "@solana/web3.js";
import fs from "fs";

async function index() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const secretKeyString = fs.readFileSync("/home/prakash/.config/solana/id.json", "utf-8");
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const payer = Keypair.fromSecretKey(secretKey);

  console.log("wallet:", payer.publicKey.toBase58());
}

index();