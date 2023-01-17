import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import ListItem from './ListItem'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HISTORY_TYPE } from '../../types';
import InterText from '../basics/Button/InterText';

function HistoryItem({ item, onPress }) {
    return (
        <ListItem onPress={onPress} passedClassName={"h-[78]"}>
            <View className='flex-row items-center'>
                <View className='w-10'>
                    {
                        item.type === HISTORY_TYPE.SENT ? <MCIcons name={'arrow-top-right'} color={'#fc5d68'} size={24} />
                            : <MCIcons name={'arrow-bottom-right'} color={'#00cc96'} size={24} />
                    }
                </View>
                <View className=''>
                    <InterText weight='600'>{HISTORY_TYPE[item.type]}</InterText>
                    <InterText passedClassName='text-[#8F92A1]' weight='300'>July 26, 2019</InterText>
                </View>
            </View>
            <View className='flex-row items-baseline'>
                <View className='items-end'>
                    <InterText weight='500'>-$123,219.22</InterText>
                    <InterText weight='400' passedClassName='text-[#8F92A1]'>45.12 BTC</InterText>
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