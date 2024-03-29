import { ethers, Wallet, providers } from "ethers"
import { CHAIN_TYPE } from "../../types";
import { JSON_RPC_URL } from "../alchemy/const";
import * as Bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
const provider = new providers.JsonRpcProvider(JSON_RPC_URL)
const pathPreFix = `m/44'/60'/0'/0/`


export const generateEthWallets = async(amount: number, _MNEMONIC: string) => {
    let _wp = [...new Array(amount)].map((_, idx) =>
        createSingleWallet(_MNEMONIC, idx)
    );

    const wallets = await Promise.all(_wp)
    return wallets.map((_w, idx) => ({
        name: `EVM #${idx}`,
        address: _w.address,
        index: idx,
        chain: CHAIN_TYPE.ETHEREUM
    }))
}



/**
 * @dev Create Wallet from Mnemonic
 * @param mnemonic = Mnemonic phrase
 * @param index  = Account index
 * @returns wallet
 */
export const createSingleWallet = async (mnemonic: string, index = 0): Promise<Wallet> => {
    const seed = await Bip39.mnemonicToSeedSync(mnemonic);
    const hdNode = hdkey.fromMasterSeed(seed);
    const node = hdNode.derivePath(`m/44'/60'/0'`)
    // m/44'/60'/0'/0
    const change = node.deriveChild(0);
    // m/44'/60'/0'/0/{N}
    const childNode = change.deriveChild(index);
    const childWallet = childNode.getWallet();
    const wallet = new Wallet(childWallet.getPrivateKey().toString('hex'));
    return wallet
}