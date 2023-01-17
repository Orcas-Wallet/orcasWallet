import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import CModal from '../../components/basics/CModal'
import TokenDetail from '../../components/Token/TokenDetail'
import { useAppSelector } from '../../store'
import { tokenMetas } from '../../utils/tokens/const'
import TokenItem from './TokenItem'

function TokenAssets({ onRecieveBtnPress }) {
    const [showModal, setShowModal] = useState(false)
    const { tokenBalance } = useAppSelector((state) => state.address)
    return (
        <View>
            <View>
                <Text className=' text-xl'>Crypto</Text>
            </View>
            <View>
                {
                    tokenMetas.map((tokeninfo) =>
                        <TokenItem key={tokeninfo.name} tokenInfo={tokeninfo} balance={tokenBalance[tokeninfo.name]} onPress={() => { setShowModal(true) }} />)
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