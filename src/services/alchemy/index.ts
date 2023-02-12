import { Alchemy, AssetTransfersCategory, Network, SortingOrder } from 'alchemy-sdk'
import { decode, encode } from 'base-64'
import { ethers, utils } from 'ethers';
import { HISTORY_TYPE } from '../../types';
import { tokenMetas, TTokens } from '../../utils/tokens/const';
import { shortNumber } from '../../utils/utils';
import { apiKey } from './const';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
const config = {
    apiKey,
    network: Network.ETH_GOERLI
};
const alchemy = new Alchemy(config);
export const getAlchemyProvider = async () => {
    return alchemy.config.getProvider()

}
export const getGasData = async () => {
    const feeData = await alchemy.core.getFeeData()
    return {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    }

}
export const getTokenListByAddress = async (address: string) => {
    const tokenContractList = tokenMetas.filter(meta => meta.name !== 'Ethereum').map((meta) => meta.contract)
    const coinBalances = await alchemy.core.getTokenBalances(address, tokenContractList);
    const balance = await alchemy.core.getBalance(address)
    const tokenBalance: Partial<Record<TTokens, string>> = {
        Ethereum: Number(ethers.utils.formatEther(balance)).toFixed(4)
    }
    console.log(coinBalances, 'coinBalances')
    for (const _token of coinBalances.tokenBalances) {
        const tokenMetaData = tokenMetas.find((token) => token.contract.toLocaleLowerCase() === _token.contractAddress.toLocaleLowerCase())
        let balance = Number(_token.tokenBalance === '0x' ? '0' : _token.tokenBalance)
        balance = balance / Math.pow(10, tokenMetaData.decimals);
        tokenBalance[tokenMetaData.name] = shortNumber(balance)
    }
    return tokenBalance;
}
export const getTokenMeta = async (addresses: string) => {
    return alchemy.core.getTokenMetadata(addresses)
}
export const getTokenSentTx = (account: string, tokenContract: string) => {
    return alchemy.core.getAssetTransfers({
        fromAddress: account,
        category: [AssetTransfersCategory.ERC20],
        contractAddresses: [tokenContract],
        order: SortingOrder.DESCENDING
    })
}
export const getTokenReceiveTx = (account: string, tokenContract: string) => {
    return alchemy.core.getAssetTransfers({
        toAddress: account,
        category: [AssetTransfersCategory.ERC20],
        contractAddresses: [tokenContract],
        order: SortingOrder.DESCENDING
    })
}

export const getETHReceiveTx = (account: string) => {
    return alchemy.core.getAssetTransfers({
        toAddress: account,
        category: [AssetTransfersCategory.EXTERNAL],
        order: SortingOrder.DESCENDING,
        withMetadata: true
    })
}
export const getETHSentTx = async (account: string) => {
    return alchemy.core.getAssetTransfers({
        fromAddress: account,
        category: [AssetTransfersCategory.EXTERNAL],
        order: SortingOrder.DESCENDING, 
        withMetadata: true
    })

}
export const getETHTransferTx = async (account: string) => {
    const [receiveHis, sentHis] = await Promise.all([
        getETHReceiveTx(account),
        getETHSentTx(account)
    ])
    const txs = [...receiveHis.transfers, ...sentHis.transfers].sort((a, b) => Number(a.blockNum) - Number(b.blockNum))
    txs.forEach(tx => {
        tx["type"] = account.toLowerCase() === tx.from.toLowerCase() ? HISTORY_TYPE.SENT : HISTORY_TYPE.RECIEVED
    });
    return txs
}
export const getTokenTransferTx = async (account: string, tokenContract: string) => {
    const [receiveHis, sentHis] = await Promise.all([
        getTokenReceiveTx(account, tokenContract),
        getTokenSentTx(account, tokenContract)
    ])
    const txs = [...receiveHis.transfers, ...sentHis.transfers].sort((a, b) => Number(a.blockNum) - Number(b.blockNum))
    console.log(account)
    txs.forEach(tx => {
        tx["type"] = account.toLowerCase() === tx.from.toLowerCase()
            ? HISTORY_TYPE.SENT : HISTORY_TYPE.RECIEVED
    });
    return txs
}
export const getTxDetails = async (hash: string) => {
    return alchemy.core.getTransactionReceipt(hash)
}