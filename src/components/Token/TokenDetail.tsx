import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import CButton from '../basics/Button'
import CoinIcon from '../CoinIcon'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryItem from './HistoryItem';
import { HISTORY_TYPE } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../store';
import { useMemo } from 'react';
import InterText from '../basics/Button/InterText';
import { getETHTransferTx, getTokenReceiveTx, getTokenTransferTx } from '../../services/alchemy';


function TokenDetail({ onSendBtnPress, onRecieveBtnPress }) {
    const navigation = useNavigation()
    const { selectedToken, tokenPrice } = useAppSelector(((state) => state.token))
    const { tokenBalance, selectedAddress } = useAppSelector(((state) => state.address))
    const [hisTxs, setHisTxs] = useState([])

    const balance = useMemo(() => tokenBalance[selectedToken.name], [tokenBalance, selectedToken])
    const price = useMemo(() => tokenPrice[selectedToken.name].usd, [tokenPrice, selectedToken])
    const totalValue = useMemo(() => price * balance, [balance, price])
    const handleSend = () => {
        onSendBtnPress()
        navigation.navigate("tokenTransfer", {
            token: selectedToken
        })
    }
    const handleRecieve = () => {
        onRecieveBtnPress()
    }

    useEffect(() => {
        if (selectedToken.symbol === 'ETH') {
            getETHTransferTx(selectedAddress.address).then(res => {
                console.log(res)
                setHisTxs(res)
            })
        } else {
            getTokenTransferTx(selectedAddress.address, selectedToken.contract).then(res => {
                setHisTxs(res)
            })
        }
    }, [selectedAddress.address, selectedToken])

    return (
        <View className='h-3/4'>
            <View className='mt-5 mb-10 w-full'>
                <View className=' items-center'>
                    <CoinIcon name={"ethereum"} passedClassName={"w-12 h-12"} size={32} />
                </View>
                <View>
                    <InterText passedClassName='text-center font-bold text-2xl pt-6 pb-2'>$ {totalValue | 0}</InterText>
                    <InterText passedClassName='text-center'>{balance} {selectedToken.symbol}</InterText>
                </View>
                <View className='flex-row w-full mt-10'>
                    <CButton theme='dark' passedClassName='item-center w-5/12 mr-4' onPress={handleSend}>
                        <MCIcons name={'arrow-top-right'} size={18} />
                        <InterText passedClassName=' text-base' >&nbsp;Send</InterText>
                    </CButton>
                    <CButton onPress={handleRecieve} passedClassName={"item-center w-5/12"}>
                        <MCIcons name={'arrow-bottom-right'} size={18} />
                        <InterText passedClassName=' text-base' >&nbsp;Receive</InterText>
                    </CButton>
                </View>
                <View className='mt-12'>
                    <InterText passedClassName='text-left text-xl mb-6' weight='700'>Transaction History</InterText>
                    <ScrollView className='h-1/4' showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                        {
                            hisTxs.map((_h, idx) => (
                                <HistoryItem onPress={onSendBtnPress} price={price} key={_h.hash} item={_h} />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default TokenDetail