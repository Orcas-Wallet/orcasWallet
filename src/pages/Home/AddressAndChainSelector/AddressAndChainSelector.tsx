import React, { useRef, useState } from 'react'
import { Button, View, Text, ScrollView } from 'react-native'
import ChainSelector from './ChainSelector'
import AddressSelector from './AddressSelector'
import Modal from "react-native-modal";
import { useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { toggleChainAddressSelectorVisiable, updateSelectedAddress } from '../../../store/addressSlice';
import { CHAIN_TYPE } from '../../../types';
import CModal from '../../../components/basics/CModal';
import CoinIcon from '../../../components/CoinIcon';

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
enum STEP {
    SELECT_CHAIN,
    SELECT_ADDRESS
}
function AddressAndChainSelector() {
    const [selectChain, setSelectChain] = useState(chainList[0])
    const [step, setStep] = useState(STEP.SELECT_CHAIN)
    const { selectedAddress } = useAppSelector((state) => state.address)
    const chainAddressSelectorVisiable = useAppSelector((state) => state.address.chainAddressSelectorVisiable)
    const [scrollOffset, setScrollOffset] = useState(null)

    const scrollViewRef = useRef(null);

    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(toggleChainAddressSelectorVisiable(false))
        setStep(0)
    }
    const onChainSeleted = (chain) => {
        setSelectChain(chain)
        setStep(STEP.SELECT_ADDRESS)
    }
    const onAddressSelected = (addressInfo) => {
        dispatch(updateSelectedAddress(addressInfo))
        closeModal()
    }
    const handleOnScroll = (event) => {
        setScrollOffset(event.nativeEvent.contentOffset.y)
    }
    const handleScrollTo = p => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo(p);
        }
    };

    return (
        <View >
            <CModal passedClassName={step === STEP.SELECT_CHAIN ? "" : "h-3/4"} isVisible={chainAddressSelectorVisiable} onClose={closeModal} scrollTo={handleScrollTo} scrollOffsetMax={100} scrollOffset={scrollOffset}
            >
                {
                    step === STEP.SELECT_CHAIN ? <View className='px-8'>
                        <ChainSelector chainList={chainList} selectChain={selectChain} onSelect={onChainSeleted} />
                    </View> :
                        <View className='h-full px-8'>
                            <View className='items-center my-5'>
                                <Text className='text-2xl font-bold'>Accounts</Text>
                                <View className='flex-row items-center justify-center mt-3'>
                                    <CoinIcon name={selectChain.chain} passedClassName={"w-8 h-8"} size={24} />
                                    <Text>&nbsp;&nbsp;{selectChain.chain}</Text>
                                </View>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onScroll={handleOnScroll} scrollEventThrottle={16}>
                                <AddressSelector addressList={ethAddressList} selectedAddress={selectedAddress} onSelect={onAddressSelected} />
                            </ScrollView>
                        </View>
                }
            </CModal >
        </View>
    )
}

export default AddressAndChainSelector