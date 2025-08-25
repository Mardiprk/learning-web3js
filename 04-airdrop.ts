import {LAMPORTS_PER_SOL, Connection, clusterApiUrl, Keypair} from "@solana/web3.js";

async function airdropSOL(){
    const secret = Uint8Array.from([
        101, 175, 189, 242, 134, 171, 204, 246, 205, 129,  43,
   90, 134, 155,  21,  15, 146, 169, 220, 178, 234, 184,
   42, 186, 167, 108, 218, 138, 149, 181, 249,   2,  82,
  235, 223,  83,  12,  59, 250, 177, 220, 146, 141,  74,
    7, 141,  13, 246, 113,  47, 252,   7, 194, 193,  25,
   84, 200, 248,   9, 193,  64,  73, 109,   6
    ]);

    const wallet = Keypair.fromSecretKey(secret);

    console.log("WAllet address: ", wallet.publicKey.toBase58());

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const balBefore = await connection.getBalance(wallet.publicKey);
    console.log("Balance before {SOL}", balBefore / LAMPORTS_PER_SOL);
    
    //airdrop 1 SOL
    console.log("⏳ Requestion Airdrop 1 SOL");
    const sig = await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);

    await connection.confirmTransaction(sig, "confirmed");
    console.log("🍀 Airdrop Confirmed:", sig);

    const balAfter = await connection.getBalance(wallet.publicKey);
    console.log("Balance {SOL}", balAfter / LAMPORTS_PER_SOL);
}

airdropSOL();