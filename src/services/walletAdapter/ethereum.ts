import { ethers, Wallet, providers } from "ethers"
import { CHAIN_TYPE } from "../../types";
import { JSON_RPC_URL } from "../alchemy/const";

const provider = new providers.JsonRpcProvider(JSON_RPC_URL)
const pathPreFix = `m/44'/60'/0'/0/`
export const createEthWallets = (MNEMONIC: string, amount: number) => {
    let _wallets = [...new Array(amount)].map((_, idx) =>
        Wallet.fromMnemonic(MNEMONIC, `${pathPreFix}${idx}`).connect(provider)
    );
    return _wallets.map((_w, idx) => ({
        name: `EVM #${idx}`,
        address: _w.address,
        index: idx,
        chain: CHAIN_TYPE.ETHEREUM
    }))
}
export const createSingleEthWallet = (MNEMONIC: string, idx: number) => {
    return Wallet.fromMnemonic(MNEMONIC, `${pathPreFix}${idx}`).connect(provider)
}