import { Text, View } from 'react-native'
import React from 'react'
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch } from '../../store';
import { registerAccount } from '../../store/accountSlice';

const Register = () => {
    const dispatch = useAppDispatch()
    const getCode = async (email: string) => {
        try {
            await dispatch(registerAccount(email))
        } catch (e) {
            console.warn(`show warning`)
            console.error(`register failed reason ${e}`)
        }
    }
    const onCodeConfirm = () => {
        
    }
    return (
        <View>
            <EmailVerify type='REGISTER' onRequestEmailCode={getCode} onCodeConfirm={onCodeConfirm} />
        </View>
    )
}

export default Register