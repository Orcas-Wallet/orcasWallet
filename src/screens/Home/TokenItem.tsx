import React, { FC } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import InterText from '../../components/basics/Button/InterText';
import CoinIcon from '../../components/CoinIcon';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateSelectedToken } from '../../store/tokenSlice';
import { ITokenInfo } from '../../types';
import { shortNumber } from '../../utils/utils';

interface ITokenItem {
    tokenInfo: ITokenInfo,
    balance: string,
    onPress: (tokenInfo: ITokenInfo) => void

}

const TokenItem: FC<ITokenItem> = ({ tokenInfo, onPress, balance }) => {
    const { tokenPrice } = useAppSelector(((state) => state.token))
    const dispatch = useAppDispatch()
    const onItemPress = () => {
        onPress(tokenInfo)
        dispatch(updateSelectedToken(tokenInfo))
    }
    const price = tokenPrice[tokenInfo.name] ?
        tokenPrice[tokenInfo.name].usd : 0
    return (
        <TouchableWithoutFeedback onPress={onItemPress}>
            <View className='flex-row items-center justify-between py-4 border-b border-[#F6F7FB]'>
                <View className='flex-row  flex-1 items-center '>
                    <View className='mr-4'>
                        <CoinIcon name="ethereum" size={26} />

                    </View>
                    <View>
                        <InterText weight='500'>{tokenInfo.name}</InterText>
                        <InterText weight='400' passedClassName='text-[#8F92A1]'>{tokenInfo.symbol}</InterText>
                    </View>
                </View>
                <View className='flex-row flex-grow justify-between items-center'>
                    <View className='flex-row'>

                    </View>
                    <View>
                        <InterText weight='500' passedClassName='text-right' >
                            {balance} {tokenInfo.symbol}
                        </InterText>
                        <InterText weight='400' passedClassName='text-right'>
                           $ {shortNumber(price * Number(balance))}
                        </InterText>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TokenItem