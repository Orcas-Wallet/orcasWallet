import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import CModal from '../../components/basics/CModal'
import TokenDetail from '../../components/Token/TokenDetail'
import { tokenListMock } from '../../mock/mock'
import TokenItem from './TokenItem'

function TokenAssets({ onRecieveBtnPress }) {
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
            {
                <CModal isVisible={showModal} onClose={() => { setShowModal(false) }}>
                    <TokenDetail onSendBtnPress={() => { setShowModal(false) }} onRecieveBtnPress={() => {
                        setShowModal(false);
                        onRecieveBtnPress()
                    }} />
                </CModal>
            }
        </View >
    )
}

export default TokenAssets