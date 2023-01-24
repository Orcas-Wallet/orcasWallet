import { useNavigation, useRoute } from '@react-navigation/native'
import { utils } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard, Button, Platform } from 'react-native'
import MCIcons from 'react-native-vector-icons/Ionicons';

import CButton from '../../components/basics/Button'
import CModal from '../../components/basics/CModal';
import CoinIcon from '../../components/CoinIcon'
import FullScreenContainer from '../../components/FullScreenContainer'
import ScanButton from '../../components/Qrcode/ScanButton';
import { useAppDispatch, useAppSelector } from '../../store'
import { updateSelectedToken } from '../../store/tokenSlice'
import { tokenMetas } from '../../utils/tokens/const';
import { shortenAddress } from '../../utils/utils'
import TokenItem from '../Home/TokenItem'

enum STEP {
    INPUT_ADDRESS,
    INPUTED_ADDRESS,
    SELECT_ASSET,
    INPUT_AMOUNT,
    REVIEWING,
    SENDING
}
function TokenTransfer({ route }) {
    const { scannedAddress } = route.params;
    const { selectedToken } = useAppSelector(((state) => state.token))
    const { selectedAddress } = useAppSelector(((state) => state.address))
    const { tokenBalance } = useAppSelector(((state) => state.address))
    const [showModal, setShowModal] = useState(false)
    const [target, setTarget] = useState("0x3F523280AC40E0C2A92c8DE99C5C0059EcE64Cdf")
    const [step, setStep] = useState(0)
    const [amount, setAmount] = useState("0")
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    useEffect(() => {
        setTarget(scannedAddress)
    }, [scannedAddress])
    useEffect(() => {
        if (step > STEP.INPUTED_ADDRESS) {
            navigation.setOptions({ title: shortenAddress(target) })
        }
        if (step <= STEP.INPUTED_ADDRESS) {
            navigation.setOptions({
                headerRight: () => (
                    <ScanButton />
                ),
            })
        }
    }, [step, navigation])
    const onBack = () => {
        let _step = step
        _step = _step - 1
        if (_step < STEP.INPUT_ADDRESS) {
            navigation.goBack()
        }
        setStep(_step)
    }
    const onPress = () => {
        Keyboard.dismiss()
        let _step = step
        if (step === STEP.INPUTED_ADDRESS) {
            if (selectedToken) {
                _step = STEP.INPUT_AMOUNT
            } else {
                _step += 1
            }
        } else if (step === STEP.INPUT_AMOUNT) {
            _step += 1
            // generate tx info 
        } else if (step === STEP.REVIEWING) {
            console.log("toggle send")
        } else {
            _step += 1
        }
        setStep(_step)
    }
    const selectToken = (_tokeInfo) => {
        // setTokenInfo()
        onPress()
        dispatch(updateSelectedToken(_tokeInfo))
    }
    useEffect(() => {

        return () => {
            dispatch(updateSelectedToken(null))
        }
    }, [])
    const isValid = useMemo(() => utils.isAddress(target), [target])
    return (
        <FullScreenContainer passedClassName='' withBackBtn={step > STEP.INPUT_ADDRESS} onBack={onBack}>
            <View className='bg-gray-100 h-0.5 my-4 w-full'>
                <View className={`bg-main-900 h-0.5`} style={{ width: `${(step + 1) * 20}%` }}></View>
            </View>
            {
                step === STEP.INPUT_ADDRESS &&
                <>
                    <View className='relative border-b border-gray-300'>
                        {
                            !target && <View className='absolute top-8 flex-row items-center'>
                                <MCIcons name="search" size={30} color="#00000040" />
                                <Text className='text-2xl text-gray-50'>Address</Text>
                            </View>
                        }
                        <TextInput
                            className='h-24 text-3xl'
                            value={target}
                            placeholder={""}
                            onChangeText={(v) => { setTarget(v) }}
                        />
                    </View>
                    <View>
                        <View className='mt-10'>
                            <Text className='text-2xl font-semibold text-center'>
                                No recents
                            </Text>
                            <Text className='text-gray-100 text-center mt-2'  >
                                Sent addresses will be shown here
                            </Text>
                        </View>
                    </View></>
            }
            {
                step === STEP.INPUTED_ADDRESS &&
                <View className='flex-row justify-start flex-wrap'>

                    <TextInput
                        multiline
                        className='h-24 text-3xl'
                        value={target}
                        placeholder={""}
                        onChangeText={(v) => { setTarget(v) }}
                        autoFocus
                    />

                </View>
            }
            {
                step === STEP.SELECT_ASSET &&
                <View>
                    {
                        tokenMetas.map((tokenInfo) =>
                            <TokenItem
                                balance={tokenBalance[tokenInfo.name]}
                                key={tokenInfo.name}
                                tokenInfo={tokenInfo}
                                onPress={() => { selectToken(tokenInfo) }} />)
                    }
                </View>
            }

            {
                step === STEP.INPUT_AMOUNT &&
                <View>
                    <View className={"flex-row items-center justify-start bg-white"}>
                        <CoinIcon name={selectedToken.name} passedClassName={"rounded-full"} size={24} />
                        <View className='ml-4'>
                            <Text className=' font-semibold'>{selectedToken.name}</Text>
                            <Text className='text-sm text-gray-100 font-light'>{selectedToken.balance} available</Text>
                        </View>
                    </View>
                    <View className='mt-10'>
                        <View className='px-1'>
                            <View className='flex-row justify-between items-center'>
                                <TextInput
                                    className='h-16 w-24 text-3xl'
                                    value={amount}
                                    keyboardType="numeric"
                                    onChangeText={(v) => { setAmount(v) }} />
                                <CButton onPress={() => { setAmount(selectedToken.balance.toString()) }} passedClassName={"w-12 h-6"}>
                                    <Text className='text-sm'>
                                        Max</Text></CButton>
                            </View>
                            <Text className='text-gray-100'>
                                $ 0.242351
                            </Text>
                        </View>
                    </View>
                </View>
            }
            {
                step === STEP.REVIEWING &&
                <View>
                    <View>
                        <Text className='text-4xl font-semibold'>
                            {
                                amount
                            }
                        </Text>
                        <Text className='text-4xl font-semibold'>
                            of {selectedToken.symbol}
                        </Text>
                    </View>
                    <View className='mt-24'>
                        <View className='flex-row py-5 border-b border-gray-100 justify-between'>
                            <Text>From</Text>
                            <Text>{shortenAddress(selectedAddress.address)}</Text>
                        </View>
                        <View className='flex-row py-5 border-b border-gray-100 justify-between'>
                            <Text>To</Text>
                            <Text>{shortenAddress(target)}</Text>
                        </View>
                        <View className='flex-row py-5 border-b border-gray-100 justify-between'>
                            <Text>Network</Text>
                            <Text>{selectedAddress.chain}</Text>
                        </View>
                        <View className='flex-row py-5 border-b border-gray-100 justify-between'>
                            <Text>Estimated fee</Text>
                            <Text>$0.1</Text>
                        </View>
                        <View className='flex-row py-5 border-b border-gray-100 justify-between'>
                            <Text>Total Cost</Text>
                            <Text>0</Text>
                        </View>
                    </View>
                </View>
            }
            {
                step !== STEP.SELECT_ASSET && <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <View style={styles.inner}>
                        <CButton disabled={!isValid} onPress={onPress} passedClassName={"w-full"} theme={"dark"}>
                            {
                                step <= STEP.SELECT_ASSET && "Continue"
                            }
                            {
                                step === STEP.INPUT_AMOUNT && "Review"
                            }
                            {
                                step === STEP.REVIEWING && "Hold To Send"
                            }
                        </CButton>
                    </View>
                </KeyboardAvoidingView>
            }
            <CModal isVisible={showModal} onClose={() => setShowModal(false)}>
                <View>
                    <Text>
                        Your transfer is on its way!
                    </Text>
                    <Text>
                        Your transaction is in progress. Track it by clicking 'View Transfer' below.
                    </Text>
                    <CButton onPress={() => { }} >Done</CButton>
                    <CButton onPress={() => { }}>View Transfer</CButton>
                </View>
            </CModal>
        </FullScreenContainer >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
});
export default TokenTransfer