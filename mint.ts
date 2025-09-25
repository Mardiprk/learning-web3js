import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  clusterApiUrl
} from "@solana/web3.js";

import {
  createInitializeMint2Instruction,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const feePayer = Keypair.generate();

  // Airdrop SOL to fee payer
  const airdropSig = await connection.requestAirdrop(feePayer.publicKey, 2e9); // 2 SOL
  await connection.confirmTransaction(airdropSig);

  // Mint account
  const mint = Keypair.generate();

  // Rent exemption cost
  const mintRent = await getMinimumBalanceForRentExemptMint(connection);

  // Instruction: Create account
  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MINT_SIZE,
    lamports: mintRent,
    programId: TOKEN_PROGRAM_ID,
  });

  // Instruction: Initialize Mint
  const initializeMintInstruction = createInitializeMint2Instruction(
    mint.publicKey,    // mint pubkey
    6,                 // decimals
    feePayer.publicKey,// mint authority
    null,              // freeze authority
    TOKEN_PROGRAM_ID
  );

  // Transaction
  const transaction = new Transaction().add(
    createAccountInstruction,
    initializeMintInstruction
  );

  // Signers = feePayer (payer) + mint (new account)
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [feePayer, mint]
  );

  console.log(
    `Mint created! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
})();
