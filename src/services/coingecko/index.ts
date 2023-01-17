import axios from "axios";
import { tokenMetas } from "../../utils/tokens/const";

const coingeckoClient = axios.create({
    baseURL: "https://api.coingecko.com/api/v3"
})

export const getTokenPrice = async () => {
    try {
        const res = await coingeckoClient.get('/simple/price', {
            params: {
                ids: "ethereum,weth",
                vs_currencies: "usd"
            }
        })
        const priceInfo: any = {}
        priceInfo.Ethereum = res.data.ethereum;
        priceInfo.WETH = res.data.weth;
        console.log(priceInfo)
        return priceInfo
    } catch (error) {

        console.log(error)
    }
}