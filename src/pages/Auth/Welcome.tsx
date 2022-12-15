import { View, Text } from 'react-native'
import React from 'react'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/Container'
const Welcome = ({ navigation }) => {

    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Register')
    }
    return (
        <FullScreenContainer>
            <View>
                <View className='h-4/5 pt-80 pl-2'>
                    <Text className='text-white text-4xl '>The safest way</Text>
                    <Text className='text-white text-4xl '>to store your </Text>
                    <Text className='text-white text-4xl '>crypto</Text>
                </View>
                <View className='flex justify-between flex-row'>
                    <CButton theme='dark' title={"Sign In"} onPress={handleLogin} />
                    <CButton title={"Sign Up"} onPress={handleRegister} />
                </View>
            </View>
        </FullScreenContainer>
    )
}

export default Welcome