import {Connection, clusterApiUrl, PublicKey, Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

async function main(){
    const wallet = Keypair.generate();
    console.log("Public Key:", wallet.publicKey.toBase58());
    console.log("Connected to Solana")
}

main().catch((err) => console.error(err));