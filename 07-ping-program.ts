import * as fs from "fs";
import * as anchor from "@coral-xyz/anchor";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

async function main() {
  const secretKeyString = fs.readFileSync(
    "/home/prakash/.config/solana/id.json",
    "utf8"
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const wallet = Keypair.fromSecretKey(secretKey);

  console.log("Wallet:", wallet.publicKey.toBase58());

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const provider = new anchor.AnchorProvider(
    connection,
    new anchor.Wallet(wallet),
    { preflightCommitment: "confirmed" }
  );
  anchor.setProvider(provider);

  const PROGRAM_ID = new anchor.web3.PublicKey(
    "GMRszk2C7u7iMrnqHYv1nHFS4dSsQtwwpjW5wfXUzF7v"
  );

  const idl = JSON.parse(
    fs.readFileSync("target/idl/ping_program.json", "utf8")
  );

  const program = new anchor.Program(idl, PROGRAM_ID, provider);

  const tx = await program.methods.ping().rpc();
  console.log("✅ Ping sent! Transaction Signature:", tx);
  console.log(
    "Explorer link:",
    `https://explorer.solana.com/tx/${tx}?cluster=devnet`
  );
}

main().catch(console.error);
