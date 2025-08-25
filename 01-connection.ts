import {createSolanaRpc,devnet} from "@solana/kit";

async function connectionDemonstration(){
    const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

    const slot = await rpc.getSlot().send();
    console.log("📍 Current Slot:", slot);

    const blockhash = await rpc.getLatestBlockhash().send();
    console.log("📍 Latest Blockhash:", blockhash);
}

connectionDemonstration();