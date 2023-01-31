import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/FullScreenContainer'
import InterText from '../../components/basics/Button/InterText'
import { createEthWallets } from '../../services/walletAdapter/ethereum'
const stepText = [
    {
        title: "",
        subTitle: "Anonymous wallet with institutional-level security"
    },
    {
        subTitle: "Powered by MPC",
        title: "Institutional-level security made to scale"
    },
    {
        subTitle: "Privacy from day 1",
        title: "Protected by DAuth, to keep you anonymous"
    }
]
const Welcome = ({ navigation }) => {
    const [step, setStep] = useState(0)
    const handleLogin = () => {
        // navigation.navigate('Login')
        const start = performance.now()
        createEthWallets(2, "pear nurse danger height member demand seminar sphere square tragic decrease odor")
        const end = performance.now()
        console.log(`Creating a Wallet took ${end - start} ms.`)
    }
    const handleRegister = () => {
        // navigation.navigate('Aboard')
        const start = performance.now()
        createEthWallets(5, "pear nurse danger height member demand seminar sphere square tragic decrease odor")
        const end = performance.now()
        console.log(`Creating a Wallet took ${end - start} ms.`)
        // navigation.navigate('keyChain')
    }
    return (
        <FullScreenContainer passedClassName='flex-1  justify-between'>
            <ScrollView className="flex-auto">
                <View className='h-64 justify-center'>
                    <Image
                        className=' w-12 '
                        style={{resizeMode: "center"}}
                        source={require('../../../assets/logo.png')}
                    />
                </View>
                <View className=''>
                    <InterText passedClassName='text-4xl mt-6 font-semibold' weight='600'>
                        An anonymous wallet with institutional level security.
                    </InterText>
                </View>
            </ScrollView>

            <View className='items-center flex-1'>
                <CButton theme='dark' passedClassName='w-full' onPress={handleRegister}>Register</CButton>
                <CButton passedClassName='w-full mt-6' onPress={handleLogin}>Login</CButton>
            </View>
        </FullScreenContainer>
    )
}

export default Welcome