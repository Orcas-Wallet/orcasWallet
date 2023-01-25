import { createEthWallets } from "../services/walletAdapter/ethereum"
import { CHAIN_TYPE, HISTORY_TYPE } from "../types"

export const historyList = [{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    name: "BTC1",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.RECIEVED,
    amount: 45.12,
    name: "BTC2",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.RECIEVED,
    amount: 45.12,
    name: "BTC3",
    value: "123,219.22"
}, {
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    name: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    name: "BTC4",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    name: "BTC5",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    name: "BTC6",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    name: "BTC7",
    value: "123,219.22"
}]

export const ethAddressList = (() => {
    const wallets = createEthWallets(5).map((_w, idx) => ({
        name: `EVM #${idx}`,
        address: _w.address,
        index: idx,
        chain: CHAIN_TYPE.ETHEREUM
    }))
    return wallets
})()