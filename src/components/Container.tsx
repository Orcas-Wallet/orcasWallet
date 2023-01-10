import React, { FC, ReactNode, useEffect } from 'react'
import { View } from 'react-native'
interface IFullScreenContainer {
    passedClassName?: string
    children?: ReactNode,
    style?: any

}
const FullScreenContainer: FC<IFullScreenContainer> = ({ children, passedClassName, style }) => {
    useEffect(() => {

    }, [])

    return (
        <View className={`h-screen bg-white px-6 ${passedClassName}`} style={style} children={children}></View >
    )
}

export default FullScreenContainer