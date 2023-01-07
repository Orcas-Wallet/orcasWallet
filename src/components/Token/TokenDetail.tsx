import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import CButton from '../basics/Button'
import CoinIcon from '../CoinIcon'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryItem from './HistoryItem';
import { HISTORY_TYPE } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../store';
import { historyList } from '../../mock/mock';


function TokenDetail({ onButtonPress }) {
    const navigation = useNavigation()
    const { selectedToken } = useAppSelector(((state) => state.token))

    const handleSend = () => {
        onButtonPress()
        navigation.navigate("tokenTransfer", {
            token: selectedToken
        })
    }
    return (
        <View className='h-3/4'>
            <View className='mt-5 mb-10 w-full'>
                <View className=' items-center'>
                    <CoinIcon name={"ethereum"} passedClassName={"w-12 h-12"} size={32} />
                </View>
                <View>
                    <Text className='text-center font-bold text-2xl pt-6 pb-2'>$3,488.12</Text>
                    <Text className='text-center'>{selectedToken.balance} {selectedToken.symbol}</Text>
                </View>
                <View className='flex-row w-full mt-10'>
                    <CButton theme='dark' passedClassName='item-center w-5/12 mr-4' onPress={handleSend}>
                        <MCIcons name={'arrow-top-right'} size={18} />
                        <Text className=' text-base font-semibold'>&nbsp;Send</Text>
                    </CButton>
                    <CButton onPress={() => { }} passedClassName={"item-center w-5/12"}>
                        <MCIcons name={'arrow-bottom-right'} size={18} />
                        <Text className=' text-base font-semibold'>&nbsp;Recieve</Text>
                    </CButton>
                </View>
                <View className='mt-12'>
                    <Text className='text-left font-bold text-xl mb-6'>Transaction History</Text>
                    <ScrollView className='h-1/4' showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                        {
                            historyList.map((_h, idx) => (
                                <HistoryItem item={_h} onPress={() => { }} key={`h${idx}`} />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default TokenDetail