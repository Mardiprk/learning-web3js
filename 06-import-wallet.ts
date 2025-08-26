import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from "fs";

async function main() {
  const secretKeyString = fs.readFileSync("/home/prakash/.config/solana/id.json", "utf8"); 
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

  const wallet = Keypair.fromSecretKey(secretKey);
  console.log("Imported wallet address:", wallet.publicKey.toBase58());

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const balance = await connection.getBalance(wallet.publicKey);
  console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");
}

main().catch(console.error);