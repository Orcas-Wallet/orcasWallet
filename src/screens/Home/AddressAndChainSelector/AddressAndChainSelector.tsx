import React, { useEffect, useRef, useState } from 'react'
import { Button, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import ChainSelector from './ChainSelector'
import AddressSelector from './AddressSelector'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import { useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { toggleChainAddressSelectorVisiable, updateSelectedAddress, updateTokenBalance } from '../../../store/addressSlice';
import { CHAIN_TYPE } from '../../../types';
import CModal from '../../../components/basics/CModal';
import CoinIcon from '../../../components/CoinIcon';
import { getData, storeData } from '../../../services/storage';
import ListItem from '../../../components/Token/ListItem';
import CButton from '../../../components/basics/Button';

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
enum STEP {
    SELECT_CHAIN,
    SELECT_ADDRESS,
    ADD_ACCOUNT
}
function AddressAndChainSelector() {
    const [selectChain, setSelectChain] = useState(chainList[0])
    const [step, setStep] = useState(STEP.SELECT_CHAIN)
    const { selectedAddress } = useAppSelector((state) => state.address)
    const { wallets } = useAppSelector((state) => state.account)
    const chainAddressSelectorVisiable = useAppSelector((state) => state.address.chainAddressSelectorVisiable)
    const [walletName, setWalletName] = useState('')

    const addressList = {
        [CHAIN_TYPE.BITCOIN]: btcAddressList,
        [CHAIN_TYPE.ETHEREUM]: wallets
    }

    useEffect(() => {
        wallets.length > 0 && saveAddressInfo(wallets[0])
    }, [wallets])

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
        // await storeData('selectedAccount', JSON.stringify(addressInfo))
        dispatch(updateSelectedAddress(addressInfo))
    }
    const onCreate = () => { }


    return (
        <View >
            <CModal passedClassName={step === STEP.SELECT_CHAIN ? "" : "h-3/4"} isVisible={chainAddressSelectorVisiable} onClose={closeModal}
            >
                {
                    step === STEP.SELECT_CHAIN && <View className='px-8'>
                        <ChainSelector chainList={chainList} onSelect={onChainSeleted} />
                    </View>
                }
                {
                    step === STEP.SELECT_ADDRESS && <View className='h-full px-4'>
                        <View className='items-center my-5'>
                            <TouchableOpacity className='absolute right-0 w-8 h-8 rounded-full bg-slate-200 border border-gray-400 justify-center items-center' onPress={() => setStep(STEP.ADD_ACCOUNT)}>
                                <MCIcons name={"plus"} color={"#0F6EFF"} size={18} />
                            </TouchableOpacity>
                            <Text className='text-2xl font-bold'>Accounts</Text>
                            <View className='flex-row items-center justify-center mt-3'>
                                <CoinIcon name={selectChain.chain} passedClassName={"w-8 h-8"} size={24} />
                                <Text>&nbsp;&nbsp;{selectChain.chain}</Text>
                            </View>
                            <View>

                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                            <AddressSelector addressList={addressList[selectChain.chain]} selectedAddress={selectedAddress} onSelect={onAddressSelected} />
                        </ScrollView>
                    </View>
                }
                {
                    step === STEP.ADD_ACCOUNT &&
                    <View className='w-full px-4'>
                        <Text className='text-2xl text-center font-bold'>Add Account</Text>
                        <View className='flex-row mt-4 h-[72] bg-[#F9F9FA] px-4  w-full rounded-2xl justify-between items-center'>
                            <View className='flex-row items-center'>
                                <CoinIcon name={selectChain.chain} />
                                <View className='justify-items-start ml-4'>
                                    <Text>{selectChain.chain}</Text>
                                </View>
                            </View>
                            <View></View>

                        </View>
                        <View className=' h-[72] px-4 mt-4 bg-[#F9F9FA] w-full rounded-2xl  justify-center'>
                            <TextInput value={walletName}
                                className={'text-base'}
                                style={{ fontFamily: 'Inter_500' }}
                                placeholder={'Account name'}
                                onChangeText={(e) => setWalletName(e)}></TextInput>
                        </View>
                        <CButton passedClassName='w-full mt-4' theme='dark' onPress={onCreate}>Create</CButton>

                    </View>
                }
            </CModal >
        </View>
    )
}

export default AddressAndChainSelector