import { View, Text, Button } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import FullScreenContainer from '../../components/FullScreenContainer'
import TokenAssets from './TokenAssets'
import AddressAndChainSelector from './AddressAndChainSelector/AddressAndChainSelector'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateTokenPrice } from '../../store/tokenSlice'

import CButton from '../../components/basics/Button'
import TokenRecieve from './TokenRecieve'
import CModal from '../../components/basics/CModal'
import { useAppSelector } from '../../store'
import { useNavigation } from '@react-navigation/native'
import { getTokenPrice } from '../../services/coingecko'
import { useDispatch } from 'react-redux'
import { fetchTokenBalance, updateTokenBalance } from '../../store/addressSlice'
import { tokenMetas } from '../../utils/tokens/const'
import { shortenAddress, shortNumber } from '../../utils/utils'
import InterText from '../../components/basics/Button/InterText'
import MenuButton from './MenuButton'
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
  const { selectedAddress, tokenBalance } = useAppSelector((state) => state.address)
  const { tokenPrice } = useAppSelector((state) => state.token)
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()

  const dispatch = useDispatch()
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
  const totalValue = useMemo(() => tokenMetas.reduce((pre, token) => {
    const balance = tokenBalance[token.name]
    const price = tokenPrice[token.name].usd
    return Number(balance) * Number(price) + pre
  }, 0), [tokenPrice, tokenBalance])
  useEffect(() => {
    getTokenPrice().then(res => {
      dispatch(updateTokenPrice(res))
    }).catch(error => {
      console.log(error)
    })
    dispatch(fetchTokenBalance(selectedAddress.address) as any)
  }, [selectedAddress.address])
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuButton />
      ),
    })
  }, [])

  return (
    <FullScreenContainer passedClassName='bg-white'>
      <View className='mt-6 mb-32'>
        <InterText weight='400'>
          {shortenAddress(selectedAddress.address)}
        </InterText>
        <InterText weight='500' passedClassName='text-2xl py-2'>
          ${shortNumber(totalValue)}
        </InterText>
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
              <InterText passedClassName='text-center pt-2' weight='400'>{btn.name}</InterText>
            </View>))
          }
        </View>

      </View>
      <TokenAssets onRecieveBtnPress={() => { setShowModal(true) }} />
      <AddressAndChainSelector />
      <CModal isVisible={showModal} onClose={() => { setShowModal(false) }}><TokenRecieve /></CModal>
    </FullScreenContainer>
  )
}

export default Home