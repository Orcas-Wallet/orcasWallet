// Import the ethers library
import { Wallet } from 'ethers'
import { getMd5, myCrypto } from './crypto'

export const createGenericAccount = async () => {
    const walletInfo = Wallet.createRandom().mnemonic
    const digest = await getMd5(walletInfo.phrase)
    return {
        user_id: digest,
        mnemonic: walletInfo.phrase,
    }
}

export const createRandom = () => {
    const wallet = Wallet.createRandom()
    return wallet2account(wallet)
}
const wallet2account = (wallet: Wallet) => {
    const { publicKey } = wallet
    return {
        mnemonic: wallet.mnemonic.phrase,
        privateKey: wallet.privateKey,
        publicKey,
    }
}
