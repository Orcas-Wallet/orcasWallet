import React, { useState } from 'react'
import { View, Text } from 'react-native'
import CModal from '../../components/basics/CModal'
import TokenDetail from '../../components/Token/TokenDetail'
import TokenTransfer from '../TokenTransfer'
import TokenItem from './TokenItem'

const tokenListMock = [{
    token: 'Ethereum',
    balance: 45.12,
    symbol: 'ETH',
    value: 123219.22
}, {
    token: 'WEthereum',
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
    const [showModal, setShowModal] = useState(false)
    return (
        <View>
            <View>
                <Text className=' text-xl'>Crypto</Text>
            </View>
            <View>
                {
                    tokenListMock.map((tokeninfo) => <TokenItem key={tokeninfo.token} tokenInfo={tokeninfo} onPress={() => { setShowModal(true) }} />)
                }
            </View>
            <CModal isVisible={showModal} onClose={() => { setShowModal(false) }}>
                <TokenDetail />
            </CModal>
        </View >
    )
}

export default TokenAssets