import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair} from "@solana/web3.js";

async function newWallet(){
    const keypair = Keypair.generate();
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const mint = await createMint(
        connection,
        keypair,
        keypair.publicKey,
        null,
        6
    );

    console.log("Mint", mint.toBase58());
}

newWallet();