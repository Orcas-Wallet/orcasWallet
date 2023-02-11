import { View } from 'react-native'
import React, { useEffect } from 'react'
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch, useAppSelector } from '../../store';

const Login = () => {
    const { access_token } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()

    return (
        <View>
            <EmailVerify type={"RECOVER"} />
        </View>
    )
}

export default Login