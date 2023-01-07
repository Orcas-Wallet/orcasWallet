import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CButton from '../../components/basics/Button'
import CoinIcon from '../../components/CoinIcon'
import FullScreenContainer from '../../components/Container'
import { tokenListMock } from '../../mock/mock'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateSelectedToken } from '../../store/tokenSlice'
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
const txInfo = {
    target: "",
    network: "",
    gasFee: "",
    totalCost: ""
}
function TokenTransfer() {
    const { selectedToken } = useAppSelector(((state) => state.token))
    const { selectedAddress } = useAppSelector(((state) => state.address))
    const [target, setTarget] = useState("0x690b9a9e9aa1c9db991c7721a92d351db4fac990")
    const [step, setStep] = useState(STEP.INPUT_ADDRESS)
    const [amount, setAmount] = useState("0")
    const dispatch = useAppDispatch()
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

    return (
        <FullScreenContainer passedClassName=''>
            <View className='bg-gray-100 h-0.5 my-4 w-full'>
                <View className='bg-main-900 h-0.5 w-2/5'></View>
            </View>
            {
                step === STEP.INPUT_ADDRESS &&
                <>
                    <View className='border-b border-gray-100'>
                        <TextInput
                            className='h-24 text-gray-300 text-3xl'
                            value={target}
                            onChangeText={(v) => { setTarget(v) }}
                            placeholder="Address" />
                    </View>
                    <View>
                        <View className='mt-4'>
                            <Text className='text-2xl font-semibold'>
                                Recents
                            </Text>
                        </View>
                    </View></>
            }
            {
                step === STEP.INPUTED_ADDRESS &&
                <View>
                    <Text className='text-3xl text-black'>
                        <Text >
                            {target.slice(0, 6)}
                        </Text>
                        <Text className='text-gray-300'>
                            {target.slice(6, -5)}
                        </Text>
                        <Text>
                            {target.slice(-5)}
                        </Text>
                    </Text>
                </View>
            }
            {
                step === STEP.SELECT_ASSET &&
                <View>
                    {
                        tokenListMock.map((tokeninfo) =>
                            <TokenItem key={tokeninfo.token}
                                tokenInfo={tokeninfo}
                                onPress={() => { selectToken(tokeninfo) }} />)
                    }
                </View>
            }

            {
                step === STEP.INPUT_AMOUNT &&
                <View>
                    <View className={"flex-row items-center justify-start bg-white"}>
                        <CoinIcon name={selectedToken.token} passedClassName={"rounded-full"} size={24} />
                        <View className='ml-4'>
                            <Text className=' font-semibold'>{selectedToken.token}</Text>
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
                        <CButton disabled={!target} onPress={onPress} passedClassName={"w-full"} theme={"dark"}>
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
        </FullScreenContainer>

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