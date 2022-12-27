import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleChainAddressSelectorVisiable } from "../../store/addressSlice";

function AddressSelector() {
    const dispatch = useAppDispatch()
    const handlePress = () => {
        dispatch(toggleChainAddressSelectorVisiable(true))
    }
    return (
        <TouchableHighlight onPress={handlePress}>
            <Text className='text-white'>
                EVM #0 </Text>
        </TouchableHighlight>
    )
}

export default AddressSelector