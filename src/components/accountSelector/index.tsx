import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getData } from '../../services/storage';
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleChainAddressSelectorVisiable } from "../../store/addressSlice";
import CoinIcon from '../CoinIcon';

function AddressSelector() {
    const dispatch = useAppDispatch()
    const selectedAddress = useAppSelector((state) => state.address.selectedAddress)

    const handlePress = () => {
        dispatch(toggleChainAddressSelectorVisiable(true))
    }
 
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className='flex-row items-center border-2 rounded-full p-2 border-gray-300'>
                <CoinIcon name={selectedAddress.chain} passedClassName={" rounded-full w-5 h-5"} size={18}></CoinIcon>
                <Text className=''>
                    {"  "}{selectedAddress.name || "evm"}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default AddressSelector