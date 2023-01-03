import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    const navigation = useNavigation()
    const sendToken = () => {
        navigation.navigate('tokenTransfer')
    }
    const recieveToken = () => {
        navigation.navigate('tokenRecieve')

    }
    return (
        <View className='flex-row items-center justify-between mt-4'>
            <View className='flex-row  w-52 items-center '>
                <View className='w-12 h-12 mr-4 bg-gray-500 rounded-full flex justify-center items-center'>
                    <MCIcons name="ethereum" color={'white'} size="38" />
                </View>
                <View>
                    <Text className='text-white'>{tokenInfo.token}</Text>
                    <Text className='text-white'>{tokenInfo.balance} {tokenInfo.symbol}</Text>
                </View>
            </View>
            <View className='flex-row flex-grow justify-between items-center'>
                <View className='flex-row'>
                    <TouchableHighlight className='w-8 h-8 mr-4 bg-gray-500 rounded-full flex justify-center items-center' onPress={sendToken}>
                        <MCIcons name="arrow-up-thin" color={'white'} size="24" />
                    </TouchableHighlight>
                    <TouchableHighlight className='w-8 h-8 mr-4 bg-gray-500 rounded-full flex justify-center items-center' onPress={recieveToken}>
                        <MCIcons name="arrow-down-thin" color={'white'} size="24" />
                    </TouchableHighlight>
                </View>
                <View>
                    <Text className='text-white'>
                        ${tokenInfo.value}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default TokenItem