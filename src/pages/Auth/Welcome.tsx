import { View, ScrollView } from 'react-native'
import { Image } from "native-base"
import React, { useState } from 'react'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/FullScreenContainer'
import InterText from '../../components/basics/Button/InterText'
import { Box, Text } from "native-base";
import { getShares } from '../../utils/utils'
import { getICloudData, storeICloudData } from '../../services/storage'


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
    const handleLogin = async () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Aboard')

    }
    return (
        <FullScreenContainer passedClassName='flex-1  justify-between'>
            <ScrollView className="flex-auto">
                <View className='h-64 justify-center'>
                    <Image
                        width={50}
                        source={require('../../../assets/logo.png')}
                        alt="Alternate Text"
                        resizeMode='contain'
                    />
                </View>
                <Box >
                    <Text fontSize={'30'} lineHeight={'xs'} fontWeight={600}>
                        An anonymous wallet with institutional level security.
                    </Text>
                </Box>
            </ScrollView>

            <View className='items-center flex-1'>
                <CButton theme='dark' passedClassName='w-full' onPress={handleRegister}>Register</CButton>
                <CButton passedClassName='w-full mt-6' onPress={handleLogin}>Login</CButton>
            </View>
        </FullScreenContainer>
    )
}

export default Welcome