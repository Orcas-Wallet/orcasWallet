import React, { useState } from 'react'
import { View, TouchableHighlight, Text, TouchableOpacity } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoinIcon from '../../../components/CoinIcon';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateSelectedChain } from "../../../store/addressSlice";
import { CHAIN_TYPE } from '../../../types';


function ChainSelector({ chainList, onSelect, selectChain }) {

    return (
        <View className='w-full px-8 justify-center'>
            <View className='items-center my-5'>
                <Text className='text-2xl font-bold'>Chains</Text>
            </View>
            <View className=''>
                {
                    chainList.map((chain) =>
                        <TouchableOpacity key={chain.chain} className={"w-full"} onPress={() => onSelect(chain)}>
                            <View className={"mb-2 px-4 rounded-xl flex-row w-full bg-[#F9F9FA]  h-[72] justify-between items-center"}>
                                <View className='flex-row flex-grow items-center'>
                                    <CoinIcon name={chain.chain} />
                                    <View className='justify-items-start ml-4'>
                                        <Text>{chain.chain}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text>
                                        <MCIcons name={'chevron-right'} color={"#0F6EFF"} size={24} />
                                    </Text>
                                </View>


                            </View>

                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default ChainSelector