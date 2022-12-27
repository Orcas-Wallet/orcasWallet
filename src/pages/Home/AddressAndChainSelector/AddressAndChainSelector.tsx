import React, { useState } from 'react'
import { Button, View, Text } from 'react-native'
import ChainSelector from './ChainSelector'
import AddressSelector from './AddressSelector'
import Modal from "react-native-modal";
import { useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { toggleChainAddressSelectorVisiable } from '../../../store/addressSlice';


function AddressAndChainSelector() {
    const chainAddressSelectorVisiable = useAppSelector((state) => state.address.chainAddressSelectorVisiable)
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(toggleChainAddressSelectorVisiable(false))

    }
    return (
        <View className='bg-red'>
            <Modal isVisible={chainAddressSelectorVisiable} style={{ margin: 0, justifyContent: 'flex-end' }}>
                <View className='h-4/6 overflow-y-scroll bg-[#141316] rounded-t-2xl w-screen'>
                    <ChainSelector />

                    <AddressSelector />
                </View>
                <Button onPress={() => closeModal()} title={"Close"}></Button>

            </Modal >
        </View>
    )
}

export default AddressAndChainSelector