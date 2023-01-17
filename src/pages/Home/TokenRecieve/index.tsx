import React from 'react'
import { View, Text } from 'react-native'
import * as Clipboard from 'expo-clipboard';

import QRCode from 'react-native-qrcode-svg'
import CButton from '../../../components/basics/Button'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoinIcon from '../../../components/CoinIcon';
import { useAppSelector } from '../../../store';
import InterText from '../../../components/basics/Button/InterText';


function TokenRecieve() {
    const selectedAddress = useAppSelector((state) => state.address.selectedAddress)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(selectedAddress.address);
    };
    return (
        <View className='h-5/6'>
            <View className=''>
                <View className='mt-5 mb-10'>
                    <InterText passedClassName=' text-center text-2xl font-bold'>Receive</InterText>
                    <View className='flex-row items-center justify-center mt-3'>
                        <CoinIcon name={"ethereum"} passedClassName={"w-8 h-8"} size={24} />
                        <InterText weight='300'>&nbsp;&nbsp;{selectedAddress.chain}</InterText>
                    </View>
                </View>
                <View className=' items-center'>
                    <View className={"p-10 rounded-3xl bg-white border-4 border-gray-200"}>
                        <QRCode
                            size={150}
                            value="http://awesome.link.qr"
                        />
                    </View>
                </View>
            </View>
            <View className='text-center items-center mt-5'>
                <InterText weight='500' passedClassName=' text-center text-xl mb-2'>Defi Wallet</InterText>
                <InterText weight='500' passedClassName=' text-center w-64'>{selectedAddress.address}</InterText>
            </View>
            <View className='items-center mt-10'>
                <CButton passedClassName='h-8 border border-gray-200  mb-10 w-3/6 bg-[#f5f5f5]' onPress={copyToClipboard} >
                    <Text className='text-black '>
                        <MCIcons name={"content-copy"} color={'black'} size="14" />
                        <InterText weight='400' passedClassName='font-sm'> &nbsp;Copy Address</InterText>
                    </Text>
                </CButton>
                <Text className=' text-gray-400 text-center'>
                    Please only send ETH or Ethereum tokens to Ethereum wallets. Sending other crypto assets may result in the permanent loss of funds.
                </Text>
            </View>
        </View>
    )
}

export default TokenRecieve