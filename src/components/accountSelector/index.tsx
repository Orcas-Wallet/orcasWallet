import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
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
                {selectedAddress.name}</Text>
        </TouchableOpacity>
    )
}

export default AddressSelector