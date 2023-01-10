import { Text, View } from 'react-native'
import React from 'react'
import EmailVerify from '../../components/EmailVerify';

const Login = () => {

    return (
        <View>
            <EmailVerify type='REGISTER' />
        </View>
    )
}

export default Login