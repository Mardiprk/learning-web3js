import { Connection, clusterApiUrl } from "@solana/web3.js";

async function connectionDemonstration(){
    console.log('Starting Solana Connection Demo\n');

    const deventConnection = new Connection(clusterApiUrl("devnet"),"confirmed");
    console.log("Connected to devnet:", deventConnection.rpcEndpoint);

    const testnetConnection = new Connection(clusterApiUrl("testnet"),"confirmed");
    console.log("Connected to testnet:", testnetConnection.rpcEndpoint);

    const mainetConnection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    console.log('Connected to Mainnet-beta:', mainetConnection.rpcEndpoint);

    try{
        const slot = await deventConnection.getSlot();
        console.log('Current slot (like block number):', slot);
    }catch(error){
        console.error('❌ Error connecting to Solana:', error);
    }
    console.log('\n' + '='.repeat(50) + '\n');
}

connectionDemonstration();