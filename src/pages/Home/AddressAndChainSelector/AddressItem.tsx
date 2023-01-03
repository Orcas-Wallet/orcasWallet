import React from 'react'
import { TouchableHighlight, View, Text, TouchableOpacity } from 'react-native'

function AddressItem({ onSelect, addressInfo }) {
    return (
        <TouchableOpacity onPress={() => onSelect()}>
            <View className='h-16 px-4 flex-row justify-between items-center '>
                <Text className=''>{addressInfo.name}</Text>
                <Text className='text-[#BDBCBE]'>{addressInfo.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddressItem