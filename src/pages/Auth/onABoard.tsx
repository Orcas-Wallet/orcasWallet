import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import EmailVerify from '../../components/EmailVerify'
import CButton from '../../components/basics/Button'
import FullScreenContainer from '../../components/FullScreenContainer'
import MCIcons from 'react-native-vector-icons/Ionicons';

const stepText = [
  {
    title: "Anonymous wallet with institutional-level security",
    subTitle: "Welcome to Orcas"
  },
  {
    subTitle: "Powered by MPC",
    title: "Institutional-level security made to scale"
  },
  {
    subTitle: "Privacy from day 1",
    title: "Protected by DAuth, to keep you anonymous"
  }
]
const OnAboard = ({ navigation }) => {
  const [step, setStep] = useState(0)
  const onNext = () => {
    if (step < 2) {
      setStep(step + 1)
    }

  }
  const onBack = () => {
    setStep(0)
  }
  const handleRegister = () => {
    navigation.navigate("Register")
  }
  return (
    <FullScreenContainer passedClassName='flex-1'>
      <View className='h-2/5  items-center'>
        <View>
          <Text>asds</Text>
        </View>

      </View>
      <View className='h-3/5 items-center justify-around'>
        <View className='mb-10'>
          <Text className='text-gray-100 text-sm mb-2'>
            {stepText[step].subTitle}
          </Text>
          <Text className='text-3xl font-semibold'>
            {stepText[step].title}
          </Text>
        </View>
        <View className=' flex-row w-16 justify-between'>
          {
            [0, 1, 2].map((idx) => {
              return step === idx ? <View className='w-8 h-2 bg-main-900 rounded-full' /> : <View className='w-2 h-2 bg-main-100 rounded-full' />
            })
          }
        </View>
        <View className='flex-row'>
          {
            step === 1 && <CButton passedClassName='flex-initial w-20 mr-4' onPress={onBack}><MCIcons name={"arrow-back"} size={24}></MCIcons></CButton>
          }
          {
            step === 2 && <CButton passedClassName='w-full mr-4' onPress={handleRegister}>Slide to go private</CButton>
          }
          {
            step < 2 && <CButton theme='dark' passedClassName='w-full  flex-initial' onPress={onNext}>Next</CButton>
          }
        </View>
      </View>

      {/* <EmailVerify /> */}
    </FullScreenContainer>
  )
}

export default OnAboard