import { View, Text, Button, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FullScreenContainer from '../../components/FullScreenContainer'
import TokenAssets from './TokenAssets'
import AddressAndChainSelector from './AddressAndChainSelector/AddressAndChainSelector'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateTokenPrice } from '../../store/tokenSlice'

import CButton from '../../components/basics/Button'
import TokenRecieve from './TokenRecieve'
import CModal from '../../components/basics/CModal'
import { useAppDispatch, useAppSelector } from '../../store'
import { useNavigation } from '@react-navigation/native'
import { getTokenPrice } from '../../services/coingecko'
import { fetchTokenBalance } from '../../store/addressSlice'
import { tokenMetas } from '../../utils/tokens/const'
import { shortenAddress, shortNumber, wait } from '../../utils/utils'
import InterText from '../../components/basics/Button/InterText'
import MenuButton from './MenuButton'
import { loginWithToken } from '../../store/accountSlice'
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
  const { isEnableFaceId, access_token, account } = useAppSelector((state) => state.account)
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = React.useState(false);


  const dispatch = useAppDispatch()
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
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchTokenBalance(selectedAddress.address) as any)
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    dispatch(fetchTokenBalance(selectedAddress.address) as any)
  }, [])
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
  useEffect(() => {
    if (!access_token) {
      // need login with email

    } else {
      if (!isEnableFaceId) {
        navigation.navigate('EnableFaceId')
      }
      if (!account) {
        // need login with access token
      }
    }
  }, [isEnableFaceId, access_token])

  return (
    <FullScreenContainer passedClassName='bg-white'>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className='mt-6 mb-10'>
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
          <View className='flex-row justify-between pt-6'>
            {
              buttonGroup.map((btn) => (<View key={btn.name}>
                <CButton key={btn.name} theme='dark' circle passedClassName='' onPress={() => handleButtonPress(btn.name)}>
                  <MCIcons name={btn.icon} color={'white'} size={26} />
                </CButton>
                <InterText passedClassName='text-center pt-2' weight='400'>{btn.name}</InterText>
              </View>))
            }
          </View>

        </View>
        <TokenAssets onRecieveBtnPress={() => { setShowModal(true) }} />
        <AddressAndChainSelector />
        <CModal isVisible={showModal} onClose={() => { setShowModal(false) }}><TokenRecieve /></CModal>
      </ScrollView>



    </FullScreenContainer>
  )
}

export default Home