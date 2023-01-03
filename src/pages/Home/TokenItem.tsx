import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
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
        <View className='flex-row items-center justify-between py-6 border-b border-gray-200'>
            <View className='flex-row  flex-1 items-center '>
                <View className='w-12 h-12 mr-4 bg-main-100 rounded-xl flex justify-center items-center'>
                    <MCIcons name="ethereum" color={'#0F6EFF'} size="26" />
                </View>
                <View>
                    <Text className=''>{tokenInfo.token}</Text>
                    <Text className=''>{tokenInfo.balance} {tokenInfo.symbol}</Text>
                </View>
            </View>
            <View className='flex-row flex-grow justify-between items-center'>
                <View className='flex-row'>
                    <TouchableOpacity className='w-8 h-8 mr-4  rounded-full flex justify-center items-center' onPress={sendToken}>
                        <MCIcons name="arrow-up-thin" color={'white'} size="24" />
                    </TouchableOpacity>
                    <TouchableOpacity className='w-8 h-8 mr-4rounded-full flex justify-center items-center' onPress={recieveToken}>
                        <MCIcons name="arrow-down-thin" color={'white'} size="24" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className=''>
                        ${tokenInfo.value}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default TokenItem