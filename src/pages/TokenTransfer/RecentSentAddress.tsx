import { View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { getData } from '../../services/storage'
import ListItem from '../../components/Token/ListItem'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InterText from '../../components/basics/Button/InterText';
import { resentStorageKey, shortenAddress } from '../../utils/utils';

const RecentSentAddress = ({ account, onSelect }) => {
    const [recentList, setRecentList] = useState([])
    const key = useMemo(() => account && resentStorageKey(account), [account])


    useEffect(() => {
        console.log(key)
        getData(key).then(res => {
            console.log(res, 'recent')
            res && setRecentList(JSON.parse(res))
        })
    }, [account])

    return (
        <View>{

            recentList.map((_r) => <ListItem key={_r} onPress={() => onSelect(_r)} passedClassName={"w-full"}>

                <View className='flex-row justify-center items-center'>
                    <View className='bg-main-900 p-2 flex justify-start items-center rounded-full mr-5'>
                        <MCIcons name={"wallet"} size={"32"} color={"#fff"} />
                    </View>
                    <View className='justify-items-start'>
                        {/* <InterText passedClassName='mb-1'>{_r}</InterText> */}
                        <InterText passedClassName='text-[#808A9E] font-sm' weight='300'>{shortenAddress(_r)}</InterText>
                    </View>
                </View>
                <View></View>


            </ListItem>)
        }</View>
    )
}

export default RecentSentAddress