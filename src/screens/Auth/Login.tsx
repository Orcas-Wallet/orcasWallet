import { View } from 'react-native'
import React, { useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginWithEmail, loginWithEmailConfirm, loginWithToken } from '../../store/accountSlice';
import { api } from '../../services/api';

const Login = () => {
    const { access_token } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (access_token) {

            // LocalAuthentication.authenticateAsync({}).then((res) => {
            //     if (res.success) {
            //         dispatch(loginWithToken(access_token))
            //     }
            // })
        }
    }, [access_token])
    const onCodeConfirm = async (code) => {
        await dispatch(loginWithEmailConfirm(code)).unwrap()
    }
    const onRequestEmailCode = async (email) => {
        const res = await dispatch(loginWithEmail(email)).unwrap()
        await dispatch(loginWithToken(access_token))
    }

    return (
        <View>
            <EmailVerify type={"LOGIN"} onCodeConfirm={onCodeConfirm} onRequestEmailCode={onRequestEmailCode} />
        </View>
    )
}

export default Login