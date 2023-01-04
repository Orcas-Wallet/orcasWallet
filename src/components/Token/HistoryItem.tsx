import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import ListItem from './ListItem'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HISTORY_TYPE } from '../../types';

function HistoryItem({ item, onPress }) {
    return (
        <ListItem onPress={onPress} passedClassName={"h-[78]"}>
            <View className=''>
                {
                    item.type === HISTORY_TYPE.SENT ? <MCIcons name={'arrow-top-right'} color={'#fc5d68'} size={24} />
                        : <MCIcons name={'arrow-bottom-right'} color={'#00cc96'} size={24} />
                }
            </View>
            <View className=''>
                <Text className='font-bold'>{HISTORY_TYPE[item.type]}</Text>
                <Text className='text-[#8F92A1]'>July 26, 2019</Text>
            </View>
            <View className='flex-row items-baseline'>
                <View className='items-end'>
                    <Text>-$123,219.22</Text>
                    <Text>45.12 BTC</Text>
                </View>
                {
                    item.type === HISTORY_TYPE.SENT ? <MCIcons name={'menu-down'} color={'#fc5d68'} size={24} />
                        : <MCIcons name={'menu-up'} color={'#00cc96'} size={24} />
                }
            </View>
        </ListItem>
    )
}

export default HistoryItem