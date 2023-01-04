import React from 'react'
import { TouchableHighlight, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AddressItem({ onSelect, addressInfo }) {
    return (
        <TouchableWithoutFeedback onPress={() => onSelect(addressInfo)}>
            <View className='mb-4 px-4 rounded-xl flex-row w-full bg-[#F9F9FA]  h-[72] justify-between  items-center'>
                <View className='flex-row justify-center items-center'>
                    <View className='bg-main-900 p-2 flex justify-start items-center rounded-full mr-5'>
                        <MCIcons name={"wallet"} size={"40"} color={"#fff"} />
                    </View>
                    <View className='justify-items-start'>
                        <Text className=''>{addressInfo.name}</Text>
                        <Text className='text-[#BDBCBE]'>{addressInfo.address}</Text>
                    </View>
                </View>
                <View></View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddressItem