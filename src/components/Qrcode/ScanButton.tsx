import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import CButton from '../basics/Button'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ScanButton() {
    const navigation = useNavigation()
    return (
        <View>
            {
                <CButton passedClassName='w-10 bg-white' onPress={() => { navigation.navigate('scanner') }}>
                    <MCIcons name={"qrcode-scan"} size={24}></MCIcons>
                </CButton>
            }
        </View >
    )
}

export default ScanButton