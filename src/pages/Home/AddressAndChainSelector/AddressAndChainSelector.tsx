import React, { useState } from 'react'
import { Button, View, Text } from 'react-native'
import ChainSelector from './ChainSelector'
import AddressSelector from './AddressSelector'
import Modal from "react-native-modal";
import { useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { toggleChainAddressSelectorVisiable, updateSelectedAddress } from '../../../store/addressSlice';
import { CHAIN_TYPE } from '../../../types';

const chainList = [
    {
        chain: CHAIN_TYPE.ETHEREUM,
        icon: "ethereum"
    },
    {
        chain: CHAIN_TYPE.BITCOIN,
        icon: "currency-btc"
    }

]
const ethAddressList = [
    {
        name: "evm# 1",
        address: "0xa328...aeff",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "evm# 2",
        address: "0xa328...aefgf",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "evm# 3",
        address: "0xa328...aefaf",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "evm# 4",
        address: "0xa328...aefsf",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "evm# 6",
        address: "0xa328...aesdf",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "evm# 7",
        address: "0xa328...asdef",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "evm# 9",
        address: "0xa328...aeasf",
        chain: CHAIN_TYPE.ETHEREUM
    },
]
function AddressAndChainSelector() {
    const [selectChain, setSelectChain] = useState(chainList[0])

    const { selectedAddress } = useAppSelector((state) => state.address)
    const chainAddressSelectorVisiable = useAppSelector((state) => state.address.chainAddressSelectorVisiable)
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(toggleChainAddressSelectorVisiable(false))

    }
    const onChainSeleted = (chain) => {
        setSelectChain(chain)
    }
    const onAddressSelected = (addressInfo) => {
        dispatch(updateSelectedAddress(addressInfo))
        closeModal()
    }

    return (
        <View >
            <Modal isVisible={chainAddressSelectorVisiable} style={{ margin: 0, justifyContent: 'flex-end' }}>
                <View className='h-4/6 overflow-y-scroll  rounded-t-2xl w-screen bg-white'>
                    <ChainSelector chainList={chainList} selectChain={selectChain} onSelect={onChainSeleted} />

                    <AddressSelector addressList={ethAddressList} selectedAddress={selectedAddress} onSelect={onAddressSelected} />
                </View>
                <Button onPress={() => closeModal()} title={"Close"}></Button>

            </Modal >
        </View>
    )
}

export default AddressAndChainSelector