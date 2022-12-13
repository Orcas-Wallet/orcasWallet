import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import CButton from '../../components/basics/Button'

const Welcome = ({ navigation }) => {

    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Register')
    }
    return (
        <View>
            <Text className='h-2/3'>Welcome</Text>
            <View className='flex justify-center flex-row'>
                <CButton passedClassName='mr-5' title={"Sign In"} onPress={handleLogin} />
                <CButton theme='dark' title={"Sign Up"} onPress={handleRegister} />
            </View>
        </View>
    )
}

export default Welcome