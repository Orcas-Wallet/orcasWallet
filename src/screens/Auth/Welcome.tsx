import { View, ScrollView } from 'react-native'
import { Image } from "native-base"
import React, { useState } from 'react'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/FullScreenContainer'
import InterText from '../../components/basics/Button/InterText'
import { Box, Text } from "native-base";
import { getShares, localAuth } from '../../utils/utils'
import { getData, getICloudData, storeICloudData } from '../../services/storage'
import { api } from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../store'
import { loginWighSig, loginWithEmail, loginWithToken } from '../../store/accountSlice'
import { STORAGEKEYS } from '../../services/storage/storeKeyMap'


const stepText = [
    {
        title: "",
        subTitle: "Anonymous wallet with institutional-level security"
    },
    {
        subTitle: "Powered by MPC",
        title: "Institutional-level security made to scale"
    },
    {
        subTitle: "Privacy from day 1",
        title: "Protected by DAuth, to keep you anonymous"
    }
]
const Welcome = ({ navigation }) => {
    const { access_token } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    const handleLogin = async () => {
        // access_token existed
        if (access_token) {
            await dispatch(loginWithToken(access_token)).unwrap()
        } else {
            const s1 = await getData(STORAGEKEYS.SHARE1)
            const s2 = await getICloudData(STORAGEKEYS.SHARE2)
            if (s1 && s2) {
                await localAuth()
                await dispatch(loginWighSig())
            } else if (!s1 && s2) {
                // use email to get s3
                navigation.navigate('Login')
            }
        }

    }
    const handleRegister = () => {
        navigation.navigate('Aboard')

    }
    return (
        <FullScreenContainer passedClassName='flex-1  justify-between'>
            <ScrollView className="flex-auto">
                <View className='h-64 justify-center'>
                    <Image
                        width={50}
                        source={require('../../../assets/logo.png')}
                        alt="Alternate Text"
                        resizeMode='contain'
                    />
                </View>
                <Box >
                    <Text fontSize={'30'} lineHeight={'xs'} fontWeight={600}>
                        An anonymous wallet with institutional level security.
                    </Text>
                </Box>
            </ScrollView>

            <View className='items-center flex-1'>
                <CButton theme='dark' passedClassName='w-full' onPress={handleRegister}>Register</CButton>
                <CButton passedClassName='w-full mt-6' onPress={handleLogin}>Login</CButton>
            </View>
        </FullScreenContainer>
    )
}

export default Welcome