import React from 'react'
import { View, Text, TouchableHighlight, ScrollView } from 'react-native'
import AddressItem from './AddressItem'


function AddressSelector({ addressList, onSelect, selectedAddress }) {
    return (
        <ScrollView className='flex-1'>
            {
                addressList.map((address) => <AddressItem key={address.address} onSelect={() => onSelect(address)} addressInfo={address} />)
            }
        </ScrollView>
    )
}

export default AddressSelector