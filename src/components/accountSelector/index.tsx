import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleChainAddressSelectorVisiable } from "../../store/addressSlice";

function AddressSelector() {
    const dispatch = useAppDispatch()
    const selectedAddress = useAppSelector((state) => state.address.selectedAddress)

    const handlePress = () => {
        dispatch(toggleChainAddressSelectorVisiable(true))
    }
    return (
        <TouchableHighlight onPress={handlePress}>
            <Text className='text-white'>
                {selectedAddress.name || " enm #1"}</Text>
        </TouchableHighlight>
    )
}

export default AddressSelector