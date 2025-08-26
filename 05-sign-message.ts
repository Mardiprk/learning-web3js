import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { encodeUTF8, decodeUTF8} from "tweetnacl-util";

async function main(){
    const secret = Uint8Array.from([
        101, 175, 189, 242, 134, 171, 204, 246, 205, 129,  43,
         90, 134, 155,  21,  15, 146, 169, 220, 178, 234, 184,
         42, 186, 167, 108, 218, 138, 149, 181, 249,   2,  82,
        235, 223,  83,  12,  59, 250, 177, 220, 146, 141,  74,
          7, 141,  13, 246, 113,  47, 252,   7, 194, 193,  25,
         84, 200, 248,   9, 193,  64,  73, 109,   6
    ]);
    const wallet = Keypair.fromSecretKey(secret);

    const message = "Hello from solana community";
    const messageBytes = decodeUTF8(message);

    const signature = nacl.sign.detached(messageBytes, wallet.secretKey);

    console.log("Message:", message);
    console.log("Signature (base64):", Buffer.from(signature).toString("base64"));

    const isValid = nacl.sign.detached.verify(
        messageBytes,
        signature,
        wallet.publicKey.toBytes()
    );

    console.log("Signature Valid?", isValid);

}

main().catch(console.error);