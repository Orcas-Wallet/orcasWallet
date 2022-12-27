import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../store";
import { updateName } from "../../store/appSlice";
import EmailVerify from '../../components/EmailVerify';

const Login = () => {
    const name = useAppSelector((state) => state.app.name)
    const dispatch = useAppDispatch()

    console.log(`app name ${name}`)
    useEffect(() => {
        dispatch(updateName('newApp'))
    }, [])
    return (
        <View>
            <EmailVerify />
        </View>
    )
}

export default Login