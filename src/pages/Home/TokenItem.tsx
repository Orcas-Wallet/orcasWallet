import React, { FC } from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IToken = {
    token: string,
    balance: number,
    symbol: string,
    value: number
}
interface ITokenItem {
    tokenInfo: IToken
}

const TokenItem: FC<ITokenItem> = ({ tokenInfo }) => {
    return (
        <View className='flex-row items-center justify-between mt-4'>
            <View className='flex-row items-center'>
                <View className='w-12 h-12 mr-4 bg-gray-500 rounded-full flex justify-center items-center'>
                    <MaterialCommunityIcons name="ethereum" color={'white'} size="38" />
                </View>
                <View>
                    <Text className='text-white'>{tokenInfo.token}</Text>
                    <Text className='text-white'>{tokenInfo.balance} {tokenInfo.symbol}</Text>
                </View>
            </View>
            <View>
                <Text className='text-white'>
                    ${tokenInfo.value}
                </Text>
            </View>
        </View>
    )
}

export default TokenItem