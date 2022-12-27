import React from 'react'
import { View, Text } from 'react-native'
import TokenItem from './TokenItem'

const tokenListMock = [{
    token: 'Ethereum',
    balance: 45.12,
    symbol: 'ETH',
    value: 123219.22
}, {
    token: 'Ethereum',
    balance: 45.12,
    symbol: 'WETH',
    value: 123219.22
}, {
    token: 'Tether',
    balance: 10000,
    symbol: 'USDT',
    value: 10000
}, {
    token: 'USDC',
    balance: 45.12,
    symbol: 'USDC',
    value: 123219.22
}]
function TokenAssets() {

    return (
        <View>
            <View>
                <Text className='text-white text-xl'>Crypto</Text>
            </View>
            <View>
                {
                    tokenListMock.map((tokeninfo) => <TokenItem key={tokeninfo.token} tokenInfo={tokeninfo} />)
                }
            </View>
        </View>
    )
}

export default TokenAssets