import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import InterText from '../../components/basics/Button/InterText'
import CModal from '../../components/basics/CModal'
import TokenDetail from '../../components/Token/TokenDetail'
import { useAppSelector } from '../../store'
import { tokenMetas } from '../../utils/tokens/const'
import TokenItem from './TokenItem'

function TokenAssets({onRecieveBtnPress}) {
    const [showModal, setShowModal] = useState(false)
    const { tokenBalance } = useAppSelector((state) => state.address)
    const [showRecieve, setShowRecieve] = useState(false)
    const navigation = useNavigation()
    const onModalHide = () => {
        if (showRecieve) {
            onRecieveBtnPress()
        }
    }
    return (
        <View>
            <View>
                <InterText passedClassName='text-xl' weight='500'>Crypto</InterText>
            </View>
            <View>
                {
                    tokenMetas.map((tokenInfo) =>
                        <TokenItem key={tokenInfo.name} tokenInfo={tokenInfo} balance={tokenBalance[tokenInfo.name]} onPress={() => { setShowModal(true) }} />)
                }
            </View>
            {
                <CModal isVisible={showModal} onModalHide={onModalHide} onClose={() => { setShowModal(false) }}>
                    <TokenDetail
                        onSendBtnPress={() => { setShowModal(false) }}
                        onRecieveBtnPress={() => {
                            setShowModal(false);
                            setShowRecieve(true)
                        }} />
                </CModal>
            }
        </View >
    )
}

export default TokenAssets