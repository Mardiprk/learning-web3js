import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";

(async() => {
  const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
  const payer = Keypair.generate();

  const airdropSig = await connection.requestAirdrop(
    payer.publicKey,
    2 * LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSig);

  console.log("Payer:", payer.publicKey.toBase58());

  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6,
  );

  console.log("Mint Address:", mint.toBase58());

  const payerAta = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey,
  );

  console.log("Payer ATA:", payerAta.address.toBase58());


  await mintTo(
    connection,
    payer,
    mint,
    payerAta.address,
    payer.publicKey,
    1_000_000_000 // 1000 tokens (with 6 decimals = 1000.000000)
  );
  console.log("Minted 1000 tokens to payer ATA!");
})();