import { View, Text, Button } from 'react-native'
import React from 'react'
import FullScreenContainer from '../../components/Container'
import TokenAssets from './TokenAssets'
import AddressAndChainSelector from './AddressAndChainSelector/AddressAndChainSelector'
import { getTokenListByAddress } from '../../services/alchemy'

const Home = () => {

  return (
    <FullScreenContainer passedClassName='bg-black'>
      <View className='mt-6 mb-32'>
        <Text className='text-[#959597]'>
          0xA328...AE31
        </Text>
        <Text className='text-white text-2xl py-4'>
          $12,315,233.11
        </Text>
        <Text className='text-white flex justify-center'>
          <View><Text className='text-white'>+$2,150.92</Text></View>
          <View className='bg-[#123523] px-2 py-1 rounded-full'>
            <Text className='text-[#25985C]'>
              +5.21%
            </Text>
          </View>
        </Text>
      </View>
      <TokenAssets />
      <AddressAndChainSelector />
    </FullScreenContainer>
  )
}

export default Home