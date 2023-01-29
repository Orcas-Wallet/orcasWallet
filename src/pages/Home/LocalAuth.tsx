import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../store'
import { useNavigation } from '@react-navigation/native'
import * as LocalAuthentication from 'expo-local-authentication';

const LocalAuth = ({ children }) => {
    const { isEnableFaceId } = useAppSelector((state) => state.account)
    const navigation = useNavigation()
    useEffect(() => {
        if (!isEnableFaceId) {
            navigation.navigate("EnableFaceId")
        } else {
            LocalAuthentication.authenticateAsync().then(res => {
                if (res.success) {
                    // local auth success
                    navigation.navigate("Login")
                }
            })
        }
        
    }, [isEnableFaceId])
    

    return (
        <>
            children
        </>
    )
}

export default LocalAuth