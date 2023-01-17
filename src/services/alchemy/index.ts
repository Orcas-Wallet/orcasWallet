import { Alchemy, Network } from 'alchemy-sdk'
import { decode, encode } from 'base-64'
import { ethers, utils } from 'ethers';
import { tokenMetas, TTokens } from '../../utils/tokens/const';
import { apiKey } from './const';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
const config = {
    apiKey,
    network: Network.ETH_MAINNET
};
const alchemy = new Alchemy(config);


export const getTokenListByAddress = async (address: string) => {
    const tokenContractList = tokenMetas.filter(meta => meta.name !== 'Ethereum').map((meta) => meta.contract)
    const coinBalances = await alchemy.core.getTokenBalances(address, tokenContractList);
    const balance = await alchemy.core.getBalance(address)
    const tokenBalance: Partial<Record<TTokens, string>> = {
        Ethereum: Number(ethers.utils.formatEther(balance)).toFixed(4)
    }
    for (const _token of coinBalances.tokenBalances) {
        const tokenMetaData = tokenMetas.find((token) => token.contract.toLocaleLowerCase() === _token.contractAddress.toLocaleLowerCase())
        let balance = Number(_token.tokenBalance)
        balance = balance / Math.pow(10, tokenMetaData.decimals);
        tokenBalance[tokenMetaData.name] = balance.toFixed(4)
    }
    return tokenBalance;
}
export const getTokenMeta = async (addresses: string) => {
    return alchemy.core.getTokenMetadata(addresses)
}