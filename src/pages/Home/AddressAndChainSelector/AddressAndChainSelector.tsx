import React, { useEffect, useRef, useState } from 'react'
import { Button, View, Text, ScrollView } from 'react-native'
import ChainSelector from './ChainSelector'
import AddressSelector from './AddressSelector'
import Modal from "react-native-modal";
import { useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { toggleChainAddressSelectorVisiable, updateSelectedAddress, updateTokenBalance } from '../../../store/addressSlice';
import { CHAIN_TYPE } from '../../../types';
import CModal from '../../../components/basics/CModal';
import CoinIcon from '../../../components/CoinIcon';
import { getData, storeData } from '../../../services/storage';
import { ethAddressList } from '../../../mock/mock';

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
const btcAddressList = [
    {
        name: "btc# 1",
        address: "0xa328...aeff",
        chain: CHAIN_TYPE.ETHEREUM
    },
    {
        name: "btc# 2",
        address: "0xa328...aefgf",
        chain: CHAIN_TYPE.BITCOIN
    },
    {
        name: "btc# 3",
        address: "0xa328...aefaf",
        chain: CHAIN_TYPE.BITCOIN
    },
    {
        name: "btc# 4",
        address: "0xa328...aefsf",
        chain: CHAIN_TYPE.BITCOIN
    },
    {
        name: "btc# 6",
        address: "0xa328...aesdf",
        chain: CHAIN_TYPE.BITCOIN
    },
    {
        name: "btc# 7",
        address: "0xa328...asdef",
        chain: CHAIN_TYPE.BITCOIN
    },
    {
        name: "btc# 9",
        address: "0xa328...aeasf",
        chain: CHAIN_TYPE.BITCOIN
    },
]
const addressList = {
    [CHAIN_TYPE.BITCOIN]: btcAddressList,
    [CHAIN_TYPE.ETHEREUM]: ethAddressList
}
enum STEP {
    SELECT_CHAIN,
    SELECT_ADDRESS
}
function AddressAndChainSelector() {
    const [selectChain, setSelectChain] = useState(chainList[0])
    const [step, setStep] = useState(STEP.SELECT_CHAIN)
    const { selectedAddress } = useAppSelector((state) => state.address)
    const chainAddressSelectorVisiable = useAppSelector((state) => state.address.chainAddressSelectorVisiable)

    useEffect(() => {
        getData('selectedAccount').then(async (data) => {
            const addressInfo = JSON.parse(data)
            saveAddressInfo(addressInfo)
        }).catch(async (e) => {
            console.log(e)
            // no storaged data
            const addressInfo = addressList[CHAIN_TYPE.ETHEREUM][0]
            await saveAddressInfo(addressInfo)
        })
    }, [])

    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(toggleChainAddressSelectorVisiable(false))
        setStep(0)
    }
    const onChainSeleted = (chain) => {
        setSelectChain(chain)
        setStep(STEP.SELECT_ADDRESS)
    }
    const onAddressSelected = async (addressInfo) => {
        await saveAddressInfo(addressInfo)
        closeModal()
    }
    const saveAddressInfo = async (addressInfo) => {
        await storeData('selectedAccount', JSON.stringify(addressInfo))
        dispatch(updateSelectedAddress(addressInfo))
    }


    return (
        <View >
            <CModal passedClassName={step === STEP.SELECT_CHAIN ? "" : "h-3/4"} isVisible={chainAddressSelectorVisiable} onClose={closeModal}
            >
                {
                    step === STEP.SELECT_CHAIN ? <View className='px-8'>
                        <ChainSelector chainList={chainList} onSelect={onChainSeleted} />
                    </View> :
                        <View className='h-full px-4'>
                            <View className='items-center my-5'>
                                <Text className='text-2xl font-bold'>Accounts</Text>
                                <View className='flex-row items-center justify-center mt-3'>
                                    <CoinIcon name={selectChain.chain} passedClassName={"w-8 h-8"} size={24} />
                                    <Text>&nbsp;&nbsp;{selectChain.chain}</Text>
                                </View>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                                <AddressSelector addressList={addressList[selectChain.chain]} selectedAddress={selectedAddress} onSelect={onAddressSelected} />
                            </ScrollView>
                        </View>
                }
            </CModal >
        </View>
    )
}

export default AddressAndChainSelector