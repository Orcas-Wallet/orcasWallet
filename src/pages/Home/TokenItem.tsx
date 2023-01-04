import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoinIcon from '../../components/CoinIcon';

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
                <View className='mr-4'>
                    <CoinIcon name="ethereum" size={26} />

                </View>
                <View>
                    <Text className=''>{tokenInfo.token}</Text>
                    <Text className=''>{tokenInfo.balance} {tokenInfo.symbol}</Text>
                </View>
            </View>
            <View className='flex-row flex-grow justify-between items-center'>
                <View className='flex-row'>

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