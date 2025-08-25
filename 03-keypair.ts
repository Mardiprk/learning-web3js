import { Keypair} from "@solana/web3.js";

async function newWallet(){
    const keypair = Keypair.generate();

    console.log("Public key:", keypair.publicKey.toBase58());
    console.log("Secret Key:", keypair.secretKey);
}

newWallet();