import { Text, View } from 'react-native'
import React from 'react'
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch } from '../../store';
import { confirmRegister, registerAccount } from '../../store/accountSlice';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const getCode = async (email: string) => {
        try {
            await dispatch(registerAccount(email))
        } catch (e) {
            console.warn(`show warning`)
            console.error(`register failed reason ${e}`)
        }
    }
    const onCodeConfirm = async (code) => {
        try {
            console.warn(`send confirm register request ...`)
            await dispatch(confirmRegister(code))
            console.warn(`handle confirm registered`)
            // request email verify code
        } catch (e) {
            console.warn(`show warning`)
            console.error(`confirm register failed reason ${e}`)
        }
    }
    return (
        <View>
            <EmailVerify type='REGISTER' onRequestEmailCode={getCode} onCodeConfirm={onCodeConfirm} />
        </View>
    )
}

export default Register