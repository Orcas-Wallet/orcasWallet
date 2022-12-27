import React, { useState } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const chainList = [
    {
        chain: "Ethereum",
        icon: "ethereum"
    },
    {
        chain: "Bitcoin",
        icon: "currency-btc"
    }

]
function ChainSelector() {
    const [selectChain, setSelectChain] = useState(chainList[0])
    const handleSelectChange = (chain) => {
        setSelectChain(chain)
    }
    return (
        <View className='border-b-1 border-white bg-red'>
            <View className='flex-row my-12 px-3'>
                {
                    chainList.map((chain) => <TouchableHighlight key={chain.chain} className={`border-2 p-2  rounded-full mr-4 ${selectChain.chain === chain.chain ? 'border-white' : "border-black"}`} onPress={() => handleSelectChange(chain)}>
                        <View className='w-12 h-12  bg-gray-500 rounded-full flex justify-center items-center'>
                            <MCIcons name={chain.icon} color={'white'} size="38" />
                        </View>
                    </TouchableHighlight >)
                }
            </View>
            <View className='w-screen h-px	mb-10 bg-slate-600'></View>
            <View className='pb-10 px-3'>
                <Text className='text-white text-xl'>{selectChain.chain}</Text>
            </View>
        </View>
    )
}

export default ChainSelector