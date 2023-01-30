import React from 'react'
import { View, Text } from 'react-native'
import CButton from '../../components/basics/Button'
import InterText from '../../components/basics/Button/InterText'
import FullScreenContainer from '../../components/FullScreenContainer'
import * as LocalAuthentication from 'expo-local-authentication';
import { useAppDispatch } from '../../store'
import { enableFaceId } from '../../store/accountSlice'
import { storeData } from '../../services/storage'

function EnablefaceId({ navigation }) {
    const dispatch = useAppDispatch()
    const onPress = async () => {
        const res = await LocalAuthentication.authenticateAsync({})
        if (res.success) {
            await storeData("isEnableFaceId", "true")
            dispatch(enableFaceId())
            navigation.navigate("Home")
        }
    }
    return (
        <FullScreenContainer passedClassName='flex-1  justify-between'>
            <View></View>
            <View className="h-3/5 px-2 justify-around">
                <View>
                    <InterText passedClassName="text-xl pb-4" weight='100'>Privacy</InterText>
                    <InterText passedClassName="text-2xl pb-8" weight='600'>Enable biometric ID to secure your account</InterText>
                </View>
                <CButton passedClassName='w-full' theme='dark' onPress={onPress} >
                    Enable biometric ID
                </CButton>
            </View>

        </FullScreenContainer >
    )
}

export default EnablefaceId