import { View } from 'react-native'
import React, { useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginWithToken } from '../../store/accountSlice';

const Login = () => {
    const { access_token } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (access_token) {

            LocalAuthentication.authenticateAsync({}).then((res) => {
                if (res.success) {
                    dispatch(loginWithToken(access_token))
                }
            })
        }
    }, [access_token])
    const onCodeConfirm = () => { }
    const onRequestEmailCode = () => { }

    return (
        <View>
            <EmailVerify type={"LOGIN"} onCodeConfirm={onCodeConfirm} onRequestEmailCode={onRequestEmailCode} />
        </View>
    )
}

export default Login