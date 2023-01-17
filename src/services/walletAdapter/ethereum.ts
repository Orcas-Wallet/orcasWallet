import { ethers, Wallet, providers } from "ethers"
import { JSON_RPC_URL } from "../alchemy/const";

const MNEMONIC = `wasp witness stove skate slide festival alcohol girl add brown lemon bamboo`
const provider = new providers.JsonRpcProvider(JSON_RPC_URL)
const pathPreFix = `m/44'/60'/0'/0/`
export const createEthWallets = (amount: number) => {
    let wallets = [...new Array(amount)].map((_, idx) =>
        Wallet.fromMnemonic(MNEMONIC, `${pathPreFix}${idx}`).connect(provider)
    );
    return wallets
}
export const createSingleEthWallet = (idx: number) => {
    return Wallet.fromMnemonic(MNEMONIC, `${pathPreFix}${idx}`).connect(provider)
}