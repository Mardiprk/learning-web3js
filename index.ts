import {
  createMint,
  getAccount,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
  transfer,
} from "@solana/spl-token";

import {
  clusterApiUrl,
  Connection,
  Keypair,
} from "@solana/web3.js";

import fs from "fs";

// Load your existing wallet
const secretKeyString = fs.readFileSync("/home/prakash/.config/solana/id.json", "utf-8");
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const payer = Keypair.fromSecretKey(secretKey);

async function index() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  console.log("wallet:", payer.publicKey.toBase58());

  // 1️⃣ Create Token-2022 Mint
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6,
    undefined,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );
  console.log("✅ Created Token-2022 mint:", mint.toBase58());

  // 2️⃣ Create ATA for yourself
  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey,
    false,
    "confirmed",
    undefined,
    TOKEN_2022_PROGRAM_ID,    
  );
  console.log("✅ Your ATA:", ata.address.toBase58());

  // 3️⃣ Mint tokens to your ATA
  await mintTo(
    connection,
    payer,
    mint,
    ata.address,
    payer,            // authority
    100_000_000,      // 100 tokens (since decimals = 6)
    [],
    undefined,
    TOKEN_2022_PROGRAM_ID
  );
  console.log("✅ Minted 100 tokens to your ATA");

  const ataInfo = await getAccount(connection, ata.address, "confirmed", TOKEN_2022_PROGRAM_ID);
  console.log("💰 Your Balance:", ataInfo.amount.toString());

  const recipient = Keypair.generate();
  const recipientAta = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipient.publicKey,
    false,
    "confirmed",
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );

  await transfer(
    connection,
    payer,
    ata.address,
    recipientAta.address,
    payer,
    25_000_000, 
    [],
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );
  console.log("✅ Transferred 25 tokens to:", recipient.publicKey.toBase58());

  const recipientInfo = await getAccount(connection, recipientAta.address, "confirmed", TOKEN_2022_PROGRAM_ID);
  console.log("🎉 Recipient Balance:", recipientInfo.amount.toString());
}

index();
