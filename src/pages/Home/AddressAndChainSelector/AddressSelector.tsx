import React from 'react'
import { View, Text, TouchableHighlight, ScrollView } from 'react-native'
import AddressItem from './AddressItem'


function AddressSelector({ addressList, onSelect, selectedAddress }) {
    return (
        <View>
            {
                addressList.map((address) => <AddressItem key={address.address} onSelect={() => onSelect(address)} addressInfo={address} />)
            }
        </View>
    )
}

export default AddressSelector