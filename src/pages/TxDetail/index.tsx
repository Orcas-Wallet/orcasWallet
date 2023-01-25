import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InterText from '../../components/basics/Button/InterText'
import FullScreenContainer from '../../components/FullScreenContainer'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getTxDetails } from '../../services/alchemy'
import { shortenAddress, shortNumber } from '../../utils/utils'
import { useAppSelector } from '../../store'
import { utils } from 'ethers'
const items = [
    {
        name: "hash",
        text: "Transaction hash",
    },
    {
        name: "status",
        text: "Transaction status",
    },
    {
        name: "from",
        text: "from",
    },
    {
        name: "to",
        text: "to",
    },
    {
        name: "network",
        text: "Network",
    },
    {
        name: "total",
        text: "Total cost",
    },
    {
        name: "hash",
        text: "Transaction hash",
    }
]
const TxDetail = () => {
    const route = useRoute();
    const [txDetail, setTxDetail] = useState(null)
    const { ethPrice } = useAppSelector(state => state.token)
    useEffect(() => {
        getTxDetails(route.params.hash).then(res => {
            setTxDetail(res)
        })
    }, [route.params])
    console.log(route.params)


    return (
        <FullScreenContainer>
            <View className='mt-4 mb-10'>
                <InterText weight='500' passedClassName='text-3xl pb-2'>Sent</InterText>
                <InterText weight='500' passedClassName='text-3xl pb-2'>{route.params.amount} of ETH</InterText>
                <InterText weight='200' passedClassName={"text-sm text-[#2D2D2D]"}>${shortNumber(route.params.value)}USD</InterText>
            </View>
            <View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        Hash
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            {shortenAddress(route.params.hash)}
                        </InterText>
                    </View>
                </View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        status
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            {txDetail && txDetail.status === 1 ? "Success" : "Failed"}
                        </InterText>
                    </View>
                </View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        From
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            {txDetail && shortenAddress(txDetail.from)}
                        </InterText>
                    </View>
                </View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        To
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            {txDetail && shortenAddress(txDetail.to)}
                        </InterText>
                    </View>
                </View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        Network
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            Ethereum
                        </InterText>
                    </View>
                </View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        Estimated gas fee
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            {txDetail && txDetail.gasUsed.toString()}
                        </InterText>
                    </View>
                </View>
                <View className='flex-row h-16 border-b border-gray-300 justify-between items-center'>
                    <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                        Total cost
                    </InterText>
                    <View>
                        <InterText weight='500' passedClassName={"text-base text-[#2D2D2D]"}>
                            {
                                txDetail && "$ " + shortNumber(Number(utils.formatUnits(Number(txDetail.gasUsed)), 'gwei') * Number(ethPrice) + Number(route.params.value))
                            }
                        </InterText>
                    </View>
                </View>
            </View>
        </FullScreenContainer >
    )
}

export default TxDetail