import { View } from 'react-native'
import React, { useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginWithToken } from '../../store/accountSlice';

const Login = () => {
    const { access_token } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    console.log("access_token", access_token)
    useEffect(() => {
        if (access_token) {
        }
    }, [access_token])
    useEffect(() => {
        if (access_token) {

            LocalAuthentication.authenticateAsync({}).then((res) => {
                if (res.success) {
                    dispatch(loginWithToken(access_token))
                }
            })
        }
    }, [access_token])

    return (
        <View>
            <EmailVerify type={"LOGIN"} />
        </View>
    )
}

export default Login