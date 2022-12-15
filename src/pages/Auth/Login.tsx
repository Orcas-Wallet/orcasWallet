import {Text, View} from 'react-native'
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../../store";
import {updateName} from "../../appSlice";

const Login = () => {
    const name = useAppSelector((state) => state.app.name)
    const dispatch = useAppDispatch()

    console.log(`app name ${name}`)
    useEffect(() => {
        dispatch(updateName('newApp'))
    }, [])
    return (
        <View>
            <Text>Login</Text>
        </View>
    )
}

export default Login