import React, { useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import ListItem from './ListItem'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HISTORY_TYPE } from '../../types';
import InterText from '../basics/Button/InterText';
import { useNavigation } from '@react-navigation/native';
import { shortNumber } from '../../utils/utils';
import dayjs from 'dayjs';

function HistoryItem({ item, price, onPress }) {
    const navigation = useNavigation()
    const handlePress = () => {
        onPress()
        navigation.navigate("TxDetail", {
            hash: item.hash,
            amount: item.value,
            value: item.value * price
        })
    }
    return (
        <ListItem onPress={handlePress} passedClassName={"h-[78]"}>
            <View className='flex-row items-center'>
                <View className='w-10'>
                    {
                        item.type === HISTORY_TYPE.SENT ? <MCIcons name={'arrow-top-right'} color={'#fc5d68'} size={24} />
                            : <MCIcons name={'arrow-bottom-right'} color={'#00cc96'} size={24} />
                    }
                </View>
                <View className=''>
                    <InterText weight='600'>{HISTORY_TYPE[item.type]}</InterText>
                    <InterText passedClassName='text-[#8F92A1]' weight='300'>{dayjs(item.metadata.blockTimestamp).format('MMM DD, YYYY')}</InterText>
                </View>
            </View>
            <View className='flex-row items-baseline'>
                <View className='items-end'>
                    <InterText weight='500'>{item.value}</InterText>
                    <InterText weight='400' passedClassName='text-[#8F92A1]'>${shortNumber(item.value * price)}</InterText>
                </View>
                {/* {
                    item.type === HISTORY_TYPE.SENT ? <MCIcons name={'menu-down'} color={'#fc5d68'} size={24} />
                        : <MCIcons name={'menu-up'} color={'#00cc96'} size={24} />
                } */}
            </View>
        </ListItem>
    )
}

export default HistoryItem