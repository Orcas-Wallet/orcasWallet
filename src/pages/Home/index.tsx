import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import FullScreenContainer from '../../components/Container'
import TokenAssets from './TokenAssets'
import AddressAndChainSelector from './AddressAndChainSelector/AddressAndChainSelector'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CButton from '../../components/basics/Button'
import TokenRecieve from './TokenRecieve'
import CModal from '../../components/basics/CModal'
import { useAppSelector } from '../../store'
import { useNavigation } from '@react-navigation/native'
const buttonGroup = [
  {
    icon: "arrow-top-right",
    name: "Send",
  },
  {
    name: "Recieve",
    icon: "arrow-bottom-right"
  },
  {
    name: "Buy",
    icon: "plus"
  },
  {
    name: "More",
    icon: "dots-horizontal"
  }
]
const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()

  const handleButtonPress = (btnType: string) => {
    switch (btnType) {
      case "Send":
        navigation.navigate("tokenTransfer", {})
        break;
      case "Recieve":
        // console.log("send");
        setShowModal(true)
        break;
      default:
        return
    }
  }
  return (
    <FullScreenContainer passedClassName='bg-white'>
      <View className='mt-6 mb-32'>
        <Text className=''>
          0xA328...AE31
        </Text>
        <Text className='text-2xl py-2'>
          $12,315,233.11
        </Text>
        {/* <Text className='flex justify-center'>
          <View><Text className=''>+$2,150.92</Text></View>
          <View className='px-2 py-1 rounded-full'>
            <Text className='text-[#25985C]'>
              +5.21%
            </Text>
          </View>
        </Text> */}
        <View className='flex-row justify-between pt-10'>
          {
            buttonGroup.map((btn) => (<View>
              <CButton key={btn.name} theme='dark' circle passedClassName='' onPress={() => handleButtonPress(btn.name)}>
                <MCIcons name={btn.icon} color={'white'} size="26" />
              </CButton>
              <Text className='text-center pt-2'>{btn.name}</Text>
            </View>))
          }
        </View>

      </View>
      <TokenAssets onRecieveBtnPress={() => {setShowModal(true)}}/>
      <AddressAndChainSelector />
      <CModal isVisible={showModal} onClose={() => { setShowModal(false) }}><TokenRecieve /></CModal>
    </FullScreenContainer>
  )
}

export default Home