import {Connection, clusterApiUrl, PublicKey, Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

async function main(){
    const wallet = Keypair.generate();
    const myWallet = new PublicKey("5NpeRLioZMTEZ6pcAtCvH3LQ9RaYmBBSu48Y4EXmkuXg");
    
    console.log("Generated Wallet Public Key:", wallet.publicKey.toBase58());
    console.log("My Wallet Public Key:", myWallet.toBase58());
    console.log("Connected to Solana");
    
    const accountInfo = await connection.getAccountInfo(wallet.publicKey);
    const balance = await connection.getBalance(wallet.publicKey);
    
    const myWalletAccountInfo = await connection.getAccountInfo(myWallet);
    const myWalletBalance = await connection.getBalance(myWallet);

    console.log("Generated Wallet Account Info:", accountInfo);
    console.log("Generated Wallet Balance:", balance / LAMPORTS_PER_SOL, "SOL");
    
    console.log("My Wallet Account Info:", myWalletAccountInfo);
    console.log("My Wallet Balance:", myWalletBalance / LAMPORTS_PER_SOL, "SOL");
    
    console.log(`✅ Finished!`);
}

main().catch((err) => console.error(err));