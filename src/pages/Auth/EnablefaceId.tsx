import React from 'react'
import { View, Text } from 'react-native'
import CButton from '../../components/basics/Button'
import InterText from '../../components/basics/Button/InterText'
import FullScreenContainer from '../../components/FullScreenContainer'

function EnablefaceId() {
    return (
        <FullScreenContainer passedClassName='flex-1  justify-between'>
            <View></View>
            <View className="h-3/5 px-2 justify-around">
                <View>
                    <InterText passedClassName="text-xl pb-4" weight='100'>Privacy</InterText>
                    <InterText passedClassName="text-2xl pb-8" weight='600'>Enable biometric ID to secure your account</InterText>
                </View>
                <CButton passedClassName='w-full' theme='dark' onPress={() => { alert('Need apple device') }} >
                    Enable biometric ID
                </CButton>
            </View>

        </FullScreenContainer >
    )
}

export default EnablefaceId