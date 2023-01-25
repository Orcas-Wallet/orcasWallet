import React from 'react'
import { TouchableHighlight, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InterText from '../../../components/basics/Button/InterText';
import ListItem from '../../../components/Token/ListItem';
import { shortenAddress } from '../../../utils/utils';

function AddressItem({ onSelect, addressInfo }) {
    return (
        <ListItem onPress={() => { onSelect(addressInfo) }} passedClassName={"w-full"}>
            <View className='flex-row justify-center items-center'>
                <View className='bg-main-900 p-2 flex justify-start items-center rounded-full mr-5'>
                    <MCIcons name={"wallet"} size={"32"} color={"#fff"} />
                </View>
                <View className='justify-items-start'>
                    <InterText passedClassName='mb-1'>{addressInfo.name}</InterText>
                    <InterText passedClassName='text-[#808A9E] font-sm' weight='300'>{shortenAddress(addressInfo.address)}</InterText>
                </View>
            </View>
            <View></View>

        </ListItem>
    )
}

export default AddressItem