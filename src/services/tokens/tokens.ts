import 'react-native-get-random-values'

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'


import { AlchemyProvider } from "alchemy-sdk"
import ethers, { Contract, utils, Wallet } from "ethers"
import { ITokenInfo } from "../../types"
import { getAlchemyProvider, getGasData } from "../alchemy"
import { createSingleEthWallet } from "../walletAdapter/ethereum"
const erc20Abi = require("./erc20.abi.json")
export const sendETH = async (walletIdx: number, target: string, balance: string) => {
    console.log(walletIdx)
    const wallet = createSingleEthWallet(walletIdx)
    console.log(wallet)
    const provider = await getAlchemyProvider()
    wallet.connect(provider)
    const gasData = await getGasData()
    const res = await wallet.sendTransaction({
        value: utils.parseEther(balance),
        to: target,
        gasLimit: 21000,
        ...gasData
    })
    return res.hash
}
export const sendERC20Token = async (walletIdx: number, tokenMeta: ITokenInfo, target: string, amount: string) => {
    const wallet = createSingleEthWallet(walletIdx)
    const provider = await getAlchemyProvider()
    wallet.connect(provider)
    const gasData = await getGasData()
    const value = utils.parseUnits(amount, tokenMeta.decimals)

    const contract = new Contract(tokenMeta.contractAddress, erc20Abi).connect(wallet)
    const estimateGas = await contract.estimateGas.transfer(target, value, {
        ...gasData
    })
    const res = await contract.transfer(target, value, {
        gasLimit: estimateGas,
        ...gasData
    })
    return res.hash
}