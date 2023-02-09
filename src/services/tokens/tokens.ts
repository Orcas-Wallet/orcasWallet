import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'


import { Contract, utils } from "ethers"
import { ITokenInfo } from "../../types"
import { getAlchemyProvider, getGasData } from "../alchemy"
import { createSingleWallet } from "../walletAdapter/ethereum"
import { getData } from '../storage'
const erc20Abi = require("./erc20.abi.json")
export const sendETH = async (walletIdx: number, target: string, balance: string) => {
    const mnemonic = await getData('mnemonic')
    const provider = await getAlchemyProvider()
    let wallet = (await createSingleWallet(mnemonic!, walletIdx)).connect(provider)
    const gasData = await getGasData()
    const tx = await wallet.sendTransaction({
        value: utils.parseEther(balance),
        to: target,
        gasLimit: 21000,
        maxFeePerGas: gasData.maxFeePerGas!,
        maxPriorityFeePerGas: gasData.maxPriorityFeePerGas!
    })
    await tx.wait()
    return tx.hash
}
export const sendERC20Token = async (walletIdx: number, tokenMeta: ITokenInfo, target: string, amount: string) => {
    const mnemonic = await getData('mnemonic')
    const provider = await getAlchemyProvider()
    let wallet = (await createSingleWallet(mnemonic!, walletIdx)).connect(provider)
    const gasData = await getGasData()
    const value = utils.parseUnits(amount, tokenMeta.decimals)

    const contract = new Contract(tokenMeta.contractAddress, erc20Abi).connect(wallet)
    const estimateGas = await contract.estimateGas.transfer(target, value, {
        ...gasData
    })
    const tx = await contract.transfer(target, value, {
        gasLimit: estimateGas,
        ...gasData
    })
    await tx.wait()
    return tx.hash
}