import { Connection, clusterApiUrl } from "@solana/web3.js";

async function connectionDemonstration(){
    console.log("Starting SOL connection");

    const devnetConnection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connected to Devnet: ", devnetConnection.rpcEndpoint);

    try{
        const slot = await devnetConnection.getSlot();
        console.log("Current Slot:", slot);

    }catch(error){
        console.error("❌ Error connecting to Solana:', error");
    }
}

connectionDemonstration();