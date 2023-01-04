import React from 'react'
import { View, Text } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoinIcon from '../../../components/CoinIcon';
import ListItem from '../../../components/Token/ListItem';
function ChainSelector({ chainList, onSelect }) {

    return (
        <View className='w-full px-8 justify-center'>
            <View className='items-center my-5'>
                <Text className='text-2xl font-bold'>Chains</Text>
            </View>
            <View className=''>
                {
                    chainList.map((chain) =>
                        <ListItem onPress={() => { onSelect(chain) }} passedClassName={"w-full"}>
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
                        </ListItem>
                    )
                }
            </View>
        </View>
    )
}

export default ChainSelector