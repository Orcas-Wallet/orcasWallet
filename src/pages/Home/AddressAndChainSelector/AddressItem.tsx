import React from 'react'
import { TouchableHighlight, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItem from '../../../components/Token/ListItem';

function AddressItem({ onSelect, addressInfo }) {
    return (
        <ListItem onPress={() => { onSelect(addressInfo) }} passedClassName={"w-full"}>
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

        </ListItem>
    )
}

export default AddressItem