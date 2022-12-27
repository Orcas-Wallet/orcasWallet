import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"


// Import the ethers library
import { Wallet } from "ethers";
import { getMd5 } from "./crypto";
export const createGenericAccount = async () => {
    const walletInfo = Wallet.createRandom().mnemonic
    const digest = await getMd5(walletInfo.phrase);
    return {
        user_id: digest,
        mnemonic: walletInfo.phrase
    }
}