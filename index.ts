import { address, createSolanaRpc, generateKeyPair } from "@solana/kit";

async function main() {
  const rpc = createSolanaRpc("https://api.devnet.solana.com");

  const keypair = await generateKeyPair();
  const newWallet = keypair.publicKey;

  const wallet = address("5NpeRLioZMTEZ6pcAtCvH3LQ9RaYmBBSu48Y4EXmkuXg");
  
  // Fetch balances
  const { value: balance1 } = await rpc.getBalance(wallet).send();
  const { value: balance2 } = await rpc.getBalance(newWallet).send();

  console.log(`Random Wallet Address: ${newWallet.toString()}`);
  console.log(`Random Wallet Balance: ${balance2} lamports`);
  console.log(`Existing Wallet Balance: ${balance1} lamports`);
}

main().catch(console.error);
