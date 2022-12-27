import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'

function AddressItem({ onSelect, addressInfo }) {
    return (
        <TouchableHighlight onPress={() => onSelect()}>
            <View className='h-16 px-4 flex-row justify-between items-center bg-[#1B1B1B]'>
                <Text className='text-white'>{addressInfo.name}</Text>
                <Text className='text-[#BDBCBE]'>{addressInfo.address}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default AddressItem