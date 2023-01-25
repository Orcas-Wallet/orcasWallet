
export enum CHAIN_TYPE {
    ETHEREUM = 'Ethereum',
    BITCOIN = "Bitcoin"
}
export interface IAddressInfo {
    index: number,
    name: string,
    address: string,
    chain: CHAIN_TYPE
}
export enum HISTORY_TYPE {
    SENT,
    RECIEVED
}
export interface ITokenInfo {
    name: string,
    symbol: string,
    [k: string]: any
}
export type TEmailVerifyType = "REGISTER" | "LOGIN" | "RECOVER"