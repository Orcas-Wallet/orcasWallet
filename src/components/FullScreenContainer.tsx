import { useNavigation } from '@react-navigation/native'
import React, { FC, ReactNode, useEffect } from 'react'
import { View } from 'react-native'
import BackButton from './basics/Button/BackButton'
interface IFullScreenContainer {
    passedClassName?: string
    children?: ReactNode,
    style?: any,
    withBackBtn?: boolean
    onBack?: () => void

}
const FullScreenContainer: FC<IFullScreenContainer> = ({ children, passedClassName, style, onBack, withBackBtn }) => {
    const navigation = useNavigation()
    useEffect(() => {
        if (withBackBtn) {
            navigation.setOptions({ headerLeft: () => <BackButton passedClassName={"-mx-5"} onPress={onBack} /> })
        }
    }, [withBackBtn, navigation])

    return (
        <View className={`h-screen bg-white px-6 ${passedClassName}`} style={style} children={children}></View >
    )
}

export default FullScreenContainer