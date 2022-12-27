import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import FullScreenContainer from './Container'
import CButton from './basics/Button'
import { createGenericAccount } from '../services/generic'
import { useNavigation } from '@react-navigation/native'

enum EStep {
  FILL_EMAIL,
  FILL_CODE,
}
const text = [
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
const EmailVerify = () => {
  const [email, setEmail] = useState('keysafe@gmail.com')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(EStep.FILL_EMAIL)
  const navigation = useNavigation()
  const onNextPress = () => {
    if (step === EStep.FILL_EMAIL) {
      // request email verify code
      setStep(EStep.FILL_CODE)
    } else {
      // createAccount
      const seed = createGenericAccount()
      navigation.navigate('FaceId')
    }

  }
  return (
    <FullScreenContainer>
      <View className='py-8'>
        <Text className='text-2xl py-4 text-white font-bold'>
          {
            text[step].title
          }
        </Text>
        <Text className='text-white text-base'>
          {text[step].subTitle}
        </Text>
      </View>
      <SafeAreaView>
        {
          step === EStep.FILL_EMAIL ? <TextInput
            className='h-12 border text-base bg#373639] rounded-sm px-4 text-white'
            onChangeText={setEmail}
            value={email}
          /> : <TextInput
            className='h-12 border text-base bg-[#373639] rounded-sm px-4 text-white'
            onChangeText={setCode}
            value={code}
          />
        }
      </SafeAreaView>
      <View className='mt-6 pb-24'>
        <Text className='text-sm text-white'>
          {text[step].desc}
        </Text>
      </View>
      <CButton passedClassName='w-full' onPress={onNextPress} title={"Next"} />
    </FullScreenContainer >

  )
}

export default EmailVerify