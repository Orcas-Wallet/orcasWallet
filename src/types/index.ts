
export enum CHAIN_TYPE {
    ETHEREUM = 'Ethereum',
    BITCOIN = "Bitcoin"
}
export interface IAddressInfo {
    name: string,
    address: string,
    chain: CHAIN_TYPE
}
export enum HISTORY_TYPE {
    SENT,
    RECIEVED
}
export interface ITokenInfo {
    token: string,
    balance: number,
    symbol: string,
    value: number,
    network: string
}
export type TEmailVerifyType = "REGISTER" | "LOGIN" | "RECOVER"