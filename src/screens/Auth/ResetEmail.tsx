import { Modal, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmailVerify from '../../components/EmailVerify';
import { useAppDispatch, useAppSelector } from '../../store';
import { confirmRecoverEmail, recoverEmail } from '../../store/accountSlice';
import { Box, Text } from 'native-base';
import CButton from '../../components/basics/Button';
import CModal from '../../components/basics/CModal';
import InterText from '../../components/basics/Button/InterText';
import { useNavigation } from '@react-navigation/native';

const ResetEmail = () => {
    const navigation = useNavigation()
    const [isShow, setIsShow] = useState(false)
    const [email, setEmail] = useState('')
    const dispatch = useAppDispatch()
    const onRequestEmailCode = (email) => {
        return dispatch(recoverEmail(email))
    }
    const onCodeConfirm = (code) => {
        return dispatch(confirmRecoverEmail(code))
    }
    const onSuccess = (email) => {
        setEmail(email)
    }
    const onClose = () => {
        setEmail('')
        setIsShow(false)
        navigation.navigate("Home")
    }

    return (
        <View>
            <CModal isVisible={isShow && !!email} onClose={() => { setIsShow(false) }}>
                <View className='px-6 mb-12 w-full'>
                    <InterText passedClassName=' text-2xl text-center my-6'>
                        Success!
                    </InterText>
                    <InterText weight='200' passedClassName='text-base text-center'>
                        You have successfully change your email address to
                    </InterText>
                    <InterText weight='600' passedClassName=' text-base text-center my-6'>
                        {email}
                    </InterText>
                    <CButton passedClassName='w-full' theme='dark' onPress={onClose} >Got it</CButton>
                </View>
            </CModal>
            <EmailVerify type={"RECOVER"} onCodeConfirm={onCodeConfirm} onRequestEmailCode={onRequestEmailCode} onSuccess={onSuccess} />
        </View>
    )
}

export default ResetEmail