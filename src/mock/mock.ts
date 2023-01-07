import { HISTORY_TYPE } from "../types"

export const tokenListMock = [{
    token: 'Ethereum',
    balance: 45.12,
    symbol: 'ETH',
    value: 123219.22,
    netowrk: "Ethereum"
}, {
    token: 'WEthereum',
    balance: 45.12,
    symbol: 'WETH',
    value: 123219.22,
    netowrk: "Ethereum"
}, {
    token: 'Tether',
    balance: 10000,
    symbol: 'USDT',
    value: 10000,
    netowrk: "Ethereum"
}, {
    token: 'USDC',
    balance: 45.12,
    symbol: 'USDC',
    value: 123219.22,
    netowrk: "Ethereum"
}]
export const historyList = [{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.RECIEVED,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.RECIEVED,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
}, {
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
},
{
    type: HISTORY_TYPE.SENT,
    amount: 45.12,
    token: "BTC",
    value: "123,219.22"
}]