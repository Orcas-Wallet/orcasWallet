import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/FullScreenContainer'
import InterText from '../../components/basics/Button/InterText'
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
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Aboard')
    }
    return (
        <FullScreenContainer passedClassName='flex-auto'>
            <ScrollView className="flex-auto">
                <View className='h-32'>
                    <Text>
                        adsa
                    </Text>
                    <Text>
                        adsa
                    </Text>
                    <Text>
                        adsa
                    </Text>
                    <Text>
                        adsa
                    </Text>
                </View>
                <View>
                    <InterText passedClassName='text-4xl mt-6 font-semibold'>
                        An anonymous wallet with institutional level security.
                    </InterText>
                </View>
            </ScrollView>

            <View className='items-center flex-auto'>
                <CButton theme='dark' passedClassName='w-full' onPress={handleRegister}>Register</CButton>
                <CButton passedClassName='w-full mt-6' onPress={handleLogin}>Login</CButton>
            </View>
        </FullScreenContainer>
    )
}

export default Welcome