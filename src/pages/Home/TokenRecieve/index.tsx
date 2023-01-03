import React from 'react'
import { View, Text } from 'react-native'
import * as Clipboard from 'expo-clipboard';

import QRCode from 'react-native-qrcode-svg'
import CButton from '../../../components/basics/Button'

import FullScreenContainer from '../../../components/Container'

function TokenRecieve() {

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('hello world');
    };
    return (
        <FullScreenContainer>
            <View>
                <View className='mt-5 mb-10'>
                    <Text className='text-white text-center text-2xl'>Receive ETH</Text></View>
                <View className=' items-center'>
                    <View className={"p-10 rounded-xl bg-white"}>
                        <QRCode
                            size={150}
                            value="http://awesome.link.qr"
                        />
                    </View>
                </View>
            </View>
            <View className='text-center items-center mt-5'>
                <Text className='text-white text-center text-xl mb-2'>Defi Wallet</Text>
                <Text className='text-white text-center w-48'>0x7f88C8E221bbDB5Ca91268ccAc567b0b0E5b9d4D</Text>
            </View>
            <View className='mt-32'>
                <Text className=' text-gray-400 text-center mb-10'>
                    Please only send ETH or Ethereum tokens to Ethereum wallets. Sending other crypto assets may result in the permanent loss of funds.
                </Text>
                <CButton title='Copy Address' passedClassName='w-full' onPress={() => { }} />
            </View>
        </FullScreenContainer>
    )
}

export default TokenRecieve