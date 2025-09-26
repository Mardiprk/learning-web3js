import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from "@solana/web3.js";

async function newWallet() {
  const keypair = Keypair.generate();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const airdropSignature = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSignature);

  const mint = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    6
  );

  console.log("Wallet:", keypair.publicKey);
  console.log("Mint:", mint.toBase58());
}

newWallet();