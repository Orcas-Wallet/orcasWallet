import { Alchemy, Network } from 'alchemy-sdk'
import { decode, encode } from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
const config = {
    apiKey: "_m_uB6XHwO6CyOxIyPQeZrervAHjSJBQ",
    network: Network.ETH_MAINNET
};
const alchemy = new Alchemy(config);


export const getTokenListByAddress = async (address: string) => {
    const balances = await alchemy.core.getTokenBalances(address);

    console.log(balances);
} 