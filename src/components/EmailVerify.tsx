import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import React, { FC, useState } from 'react'
import FullScreenContainer from './FullScreenContainer'
import CButton from './basics/Button'
import { createGenericAccount } from '../services/generic'
import { useNavigation } from '@react-navigation/native'
import { TEmailVerifyType } from '../types'
import InterText from './basics/Button/InterText'
import MCIcons from 'react-native-vector-icons/Fontisto';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import VerifyCodeInput from './VerifyCodeInput'

enum EStep {
  FILL_EMAIL,
  FILL_CODE,
}
const text = {
  "REGISTER": [{
    title: "Welcome to Keysafe",
    subTitle: "This email address is required to access your crypto accounts",
    desc: "By signing up, you are agreeing to our Terms and Privacy policy",
  },
  {
    title: "Verify your email",
    subTitle: "Enter the confirmation code we just emailed to you",
    desc: "",
  }],
  "LOGIN": [
    {
      title: "Welcome to Keysafe",
      subTitle: "This email address is required to access your crypto accounts",
      desc: "By signing up, you are agreeing to our Terms and Privacy policy",
    },
    {
      title: "Verify your email",
      subTitle: "Enter the confirmation code we just emailed to you",
      desc: "",
    }
  ]
}
interface IEmailVerify {
  type: TEmailVerifyType
}
const EmailVerify: FC<IEmailVerify> = ({ type = 'REGISTER' }) => {
  const [email, setEmail] = useState('keysafe@gmail.com')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(EStep.FILL_EMAIL)
  const navigation = useNavigation()

  const onNextPress = () => {
    if (step === EStep.FILL_EMAIL) {
      // request email verify code
      setStep(EStep.FILL_CODE)
    }
  }
  const onVerify = () => {
    const seed = createGenericAccount()
    navigation.navigate('FaceId')
  }
  return (
    <FullScreenContainer>
      <View className='py-8'>
        <InterText passedClassName='text-2xl py-4'>
          {
            text[type][step].title
          }
        </InterText>
        <InterText passedClassName='text-base text-[#A2A0A8]' weight='300'>
          {text[type][step].subTitle}
        </InterText>
      </View>
      <SafeAreaView>
        {
          step === EStep.FILL_EMAIL ? <View className='bg-[#F9F9FA] flex-row items-center pl-4 rounded-2xl'>
            <MCIcons name={'male'} size={24}></MCIcons>
            <TextInput
              className='h-14	text-base px-4 ' style={{ lineHeight: 0, fontFamily: "Inter_400" }}
              onChangeText={setEmail}
              value={email}
            />
          </View> : <VerifyCodeInput onComplete={setCode} />
        }
      </SafeAreaView>
      <View className='mt-6 pb-24'>
        <InterText passedClassName='text-sm text-gray-100' weight='300'>
          {text[type][step].desc}
        </InterText>
      </View>
      <View>
        {
          step === EStep.FILL_EMAIL && <CButton theme='dark' passedClassName='w-full' onPress={onNextPress} >Let’s go!</CButton>
        }
        {
          step === EStep.FILL_CODE && <CButton theme='dark' disabled={code.length !== 6} passedClassName='w-full' onPress={onVerify} >Verify</CButton>
        }
      </View>
    </FullScreenContainer >

  )
}

export default EmailVerify