import React from 'react'
import { View, Text } from 'react-native'
import * as Clipboard from 'expo-clipboard';

import QRCode from 'react-native-qrcode-svg'
import CButton from '../../../components/basics/Button'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function TokenRecieve() {

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('hello world');
    };
    return (
        <View className=''>
            <View>
                <View className='mt-5 mb-10'>
                    <Text className=' text-center text-2xl'>Receive ETH</Text></View>
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
                <Text className=' text-center text-xl mb-2'>Defi Wallet</Text>
                <Text className=' text-center w-48'>0x7f88C8E221bbDB5Ca91268ccAc567b0b0E5b9d4D</Text>
            </View>
            <View className='items-center mt-10'>
                <CButton passedClassName='h-8 border border-gray-200  mb-10' onPress={() => { }} >
                    <Text className='text-black '>
                        <MCIcons name={"content-copy"} color={'black'} size="14" />
                        <Text> &nbsp;Copy Address</Text></Text>
                </CButton>
                <Text className=' text-gray-400 text-center'>
                    Please only send ETH or Ethereum tokens to Ethereum wallets. Sending other crypto assets may result in the permanent loss of funds.
                </Text>
            </View>
        </View>
    )
}

export default TokenRecieve