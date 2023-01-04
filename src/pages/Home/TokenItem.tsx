import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import CoinIcon from '../../components/CoinIcon';

type IToken = {
    token: string,
    balance: number,
    symbol: string,
    value: number
}
interface ITokenItem {
    tokenInfo: IToken,
    onPress: (tokenInfo: IToken) => void

}

const TokenItem: FC<ITokenItem> = ({ tokenInfo, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={() => onPress(tokenInfo)}>
            <View className='flex-row items-center justify-between py-4 border-b border-[#F6F7FB]'>
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
        </TouchableWithoutFeedback>
    )
}

export default TokenItem