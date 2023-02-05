import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import InterText from './InterText';
import { localAuth } from '../../../utils/utils';
function DelayButton({ passedClassName, children, onLongPress }) {
    const onDelay = async () => {
        try {
            await localAuth()
            onLongPress()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <TouchableOpacity
            className={`bg-main-900 h-14  flex justify-center  items-center flex-row rounded-2xl ${passedClassName}`}
            delayLongPress={1000}
            onPressIn={() => { console.log("on Press IN") }}
            onPressOut={() => { console.log("on Press IN") }}
            onPress={() => { console.log("on Press") }}
            onLongPress={onDelay}
        >
            <Image source={require('./faceID.png')} className={'w-8 h-8'}/>

            <InterText passedClassName={`text-center font-bold  text-base pl-3 text-white`} weight={"700"} >
                {children}
            </InterText>
        </TouchableOpacity>
    )
}

export default DelayButton