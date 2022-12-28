export enum CHAIN_TYPE {
    ETHEREUM = 'Ethereum',
    BITCOIN = "Bitcoin"
}
export interface IAddressInfo {
    name: string,
    address: string,
    chain: CHAIN_TYPE
}