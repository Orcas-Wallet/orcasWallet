import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleChainAddressSelectorVisiable } from "../../store/addressSlice";

function AddressSelector() {
    const dispatch = useAppDispatch()
    const selectedAddress = useAppSelector((state) => state.address.selectedAddress)

    const handlePress = () => {
        dispatch(toggleChainAddressSelectorVisiable(true))
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text className=''>
                {selectedAddress.name || " enm #1"}</Text>
        </TouchableOpacity>
    )
}

export default AddressSelector