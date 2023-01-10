import React from 'react'
import { View, Text } from 'react-native'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/FullScreenContainer'

function EnablefaceId() {
    return (
        <FullScreenContainer>
            <View className="mt-96 px-2">
                <Text className="text-2xl pb-8 ">Enable biometric ID</Text>
                <View>
                    <Text className="text-base pb-10 ">Biometric authentication verifies your identity and prevents unauthorized access of your account
                    </Text>
                </View>
                <CButton title='Enable biometric ID' passedClassName='w-full' onPress={() => { alert('Need apple device')}} />
            </View>

        </FullScreenContainer>
    )
}

export default EnablefaceId