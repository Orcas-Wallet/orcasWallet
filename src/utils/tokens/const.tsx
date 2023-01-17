export const tokenContractList = [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC
]
export type TTokens = 'Ethereum' | 'Tether' | 'WETH' | 'USD Coin'

export const tokenMetas = [
    {
        "decimals": 18,
        "logo": "https://static.alchemyapi.io/images/assets/825.png",
        "name": "Ethereum",
        "symbol": "ETH",
        "contract": ""
    },
    {
        "decimals": 6,
        "logo": "https://static.alchemyapi.io/images/assets/825.png",
        "name": "Tether",
        "symbol": "USDT",
        "contract": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    },
    {
        "decimals": 18,
        "logo": "https://static.alchemyapi.io/images/assets/2396.png",
        "name": "WETH",
        "symbol": "WETH",
        "contract": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
    {
        "decimals": 6,
        "logo": "https://static.alchemyapi.io/images/assets/3408.png",
        "name": "USD Coin",
        "symbol": "USDC",
        "contract": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    }
]