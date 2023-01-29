import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import FullScreenContainer from './FullScreenContainer'
import CButton from './basics/Button'
import { useNavigation } from '@react-navigation/native'
import { TEmailVerifyType } from '../types'
import InterText from './basics/Button/InterText'
import MCIcons from 'react-native-vector-icons/Fontisto'
import VerifyCodeInput from './VerifyCodeInput'
import TextButton from './basics/Button/TextButton'
import { useAppDispatch } from '../store'
import { confirmRegister, registerAccount } from '../store/accountSlice'

enum EStep {
    FILL_EMAIL,
    FILL_CODE,
}

const text = {
    REGISTER: [
        {
            title: 'Getting Started',
            subTitle:
                'Your email will be kept private and secure by DAuth. Even Orcas will not have access to this information.',
            desc: 'By signing up, you are agreeing to our Terms and Privacy policy',
        },
        {
            title: 'Verify your identity',
            subTitle: 'We have just sent a code to',
            desc: '',
        },
    ],
    LOGIN: [
        {
            title: 'Welcome back!',
            subTitle: 'To access your account, please sign in using your email address.',
            desc: '',
        },
        {
            title: 'Verify your identity',
            subTitle: 'We have just sent a code to',
            desc: '',
        },
    ],
}

interface IEmailVerify {
    type: TEmailVerifyType
}

const EmailVerify: FC<IEmailVerify> = ({ type = 'REGISTER' }) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [step, setStep] = useState(EStep.FILL_EMAIL)
    const dispatch = useAppDispatch()

    const onNextPress = async () => {
        if (step === EStep.FILL_EMAIL) {
            try {
                console.warn(`send register request ...`)
                await dispatch(registerAccount(email))
                console.warn(`handle registered`)
                // request email verify code
                setStep(EStep.FILL_CODE)
            } catch (e) {
                console.warn(`show warning`)
                console.error(`register failed reason ${e}`)
            }
        }
    }
    const onVerify = async () => {
        try {
            console.warn(`send confirm register request ...`)
            await dispatch(confirmRegister(code))
            console.warn(`handle confirm registered`)
        } catch (e) {
            console.warn(`show warning`)
            console.error(`confirm register failed reason ${e}`)
        }
    }
    return (
        <FullScreenContainer>
            <View className="flex-1">
                <View className="py-2">
                    <InterText passedClassName="text-2xl py-4">{text[type][step].title}</InterText>
                    <InterText passedClassName="text-base text-[#A2A0A8]" weight="300">
                        {text[type][step].subTitle}
                    </InterText>
                    {step === EStep.FILL_CODE && <InterText passedClassName="text-base">{email}</InterText>}
                </View>
                <SafeAreaView>
                    {step === EStep.FILL_EMAIL ? (
                        <View className="bg-[#F9F9FA] flex-row items-center pl-6 rounded-2xl">
                            <MCIcons name={'male'} size={24}></MCIcons>
                            <TextInput
                                className="h-14	text-base px-4 flex-1"
                                style={{ lineHeight: 0, fontFamily: 'Inter_400' }}
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>
                    ) : (
                        <VerifyCodeInput onComplete={setCode} />
                    )}
                </SafeAreaView>
                <View className="mt-6 pb-24">
                    <InterText passedClassName="text-sm text-gray-100 text-center" weight="300">
                        By creating an account, you agree to our
                    </InterText>
                    <View className="flex-row items-center justify-center">
                        <TextButton onPress={() => {}}>Terms</TextButton>
                        <InterText passedClassName="text-sm text-gray-100 text-center" weight="300">
                            {' '}
                            and{' '}
                        </InterText>
                        <TextButton onPress={() => {}}>Conditions</TextButton>
                    </View>
                </View>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className={'flex-1'}>
                <View className="flex-1 justify-around">
                    {step === EStep.FILL_EMAIL && (
                        <CButton theme="dark" passedClassName="w-full" onPress={onNextPress}>
                            Let’s go!
                        </CButton>
                    )}
                    {step === EStep.FILL_CODE && (
                        <CButton theme="dark" disabled={code.length !== 6} passedClassName="w-full" onPress={onVerify}>
                            Verify
                        </CButton>
                    )}
                </View>
            </KeyboardAvoidingView>
        </FullScreenContainer>
    )
}
const styles = StyleSheet.create({
    container: {},
})

export default EmailVerify
