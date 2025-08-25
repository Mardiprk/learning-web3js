import {Connection, clusterApiUrl} from "@solana/web3.js";

async function exploreCLuster(){
    
    const devnetConnection = new Connection(clusterApiUrl("devnet"),"confirmed");

    try{
        const genesisHash = await devnetConnection.getGenesisHash();
        console.log('Genesis Hash:', genesisHash);

        const firstBlock = await devnetConnection.getFirstAvailableBlock();
        console.log("First available block:", firstBlock);

        const supply = await devnetConnection.getSupply();
        console.log("💰 SOL Supply Information:");

        console.log("Total Supply: ", supply.value.total / 1e9, 'SOL');
        console.log("Circulating Supply: ", supply.value.circulating / 1e9, 'SOL');
        console.log("Non-circulating:", supply.value.nonCirculating / 1e9, 'SOL' );
    }catch(err){
        console.error("Error", err);
    }
}

exploreCLuster();