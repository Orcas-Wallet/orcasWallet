import React from 'react'
import { View, Text, TouchableHighlight, ScrollView } from 'react-native'
import AddressItem from './AddressItem'

const ethAddressList = [
    {
        name: "evm# 1",
        address: "0xa328...aeff"
    },
    {
        name: "evm# 2",
        address: "0xa328...aefgf"
    },
    {
        name: "evm# 3",
        address: "0xa328...aefaf"
    },
    {
        name: "evm# 4",
        address: "0xa328...aefsf"
    },
    {
        name: "evm# 6",
        address: "0xa328...aesdf"
    },
    {
        name: "evm# 7",
        address: "0xa328...asdef"
    },
    {
        name: "evm# 9",
        address: "0xa328...aeasf"
    },
]
function AddressSelector() {

    const onSelect = () => {

    }
    return (
        <ScrollView className='flex-1'>
            {
                ethAddressList.map((address) => <AddressItem key={address.address} onSelect={onSelect} addressInfo={address} />)
            }
        </ScrollView>
    )
}

export default AddressSelector