import React from 'react'
import { View, Text } from 'react-native'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/Container'

function TokenTransfer() {
    const address = "0x690b9a9e9aa1c9db991c7721a92d351db4fac990"
    return (
        <FullScreenContainer passedClassName='px-4'>
            <View className='mt-20 mb-30'>
                <Text className='text-white text-3xl'>
                    <Text className=''>{address.slice(0, 5)}</Text>
                    <Text className='text-[#454545]'>{address.slice(5, -5)}</Text>
                    <Text>{address.slice(-5)}</Text>
                </Text>
            </View>
            <View className='mt-64'><CButton passedClassName='w-full' title='Continue' onPress={() => { }} /></View>

        </FullScreenContainer>
    )
}

export default TokenTransfer