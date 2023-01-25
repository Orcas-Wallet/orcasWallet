import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CButton from '../../components/basics/Button'
import InterText from '../../components/basics/Button/InterText'
import { useNavigation } from '@react-navigation/native'

const TransferResult = ({ result, amount, value, onClose }) => {
    const navigation = useNavigation()
    const viewTransfer = () => {
        onClose()
        navigation.navigate('TxDetail',
            {
                hash: result.hash,
                amount,
                value
            })
    }
    return (
        <View>

            {
                result.status === 1 && <View className='px-3 mb-8'>
                    <InterText passedClassName=' text-2xl text-center my-6'>
                        Your transfer is on its way!
                    </InterText>
                    <InterText weight='200' passedClassName=' text-base text-center my-6'>
                        Your transaction is in progress. Track it by clicking 'View Transfer' below.
                    </InterText>
                    <CButton passedClassName='w-full' theme='dark' onPress={onClose} >Done</CButton>
                    <CButton passedClassName='w-full mt-2' onPress={viewTransfer}>View Transfer</CButton>
                </View>
            }
            {
                result.status === 0 &&
                <View>
                    <InterText passedClassName=' text-2xl text-center my-6'>
                        Something went wrong
                    </InterText>
                    <InterText weight='200' passedClassName=' text-base text-center my-6'>
                        An error has occurred. Please try submitting your transaction again.
                    </InterText>
                    <CButton passedClassName='w-full' theme='dark' onPress={onClose} >Back</CButton>

                </View>
            }

        </View>
    )
}

export default TransferResult

const styles = StyleSheet.create({})