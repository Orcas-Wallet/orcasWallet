import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

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

export class AccountFactory {
    async createRandom() {
        const wallet = Wallet.createRandom()
        return this.wallet2account(wallet)
    }

    private async wallet2account(wallet: Wallet) {
        const { publicKey } = wallet
        return {
            mnemonic: wallet.mnemonic.phrase,
            privateKey: wallet.privateKey,
            publicKey,
        }
    }
}

export const accountFactory = new AccountFactory()
