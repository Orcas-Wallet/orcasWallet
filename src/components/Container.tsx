import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'
interface IFullScreenContainer {
    passedClassName?: string
    children?: ReactNode

}
const FullScreenContainer: FC<IFullScreenContainer> = ({ children, passedClassName }) => {
    return (
        <View className={`h-screen px-6 ${passedClassName}`} children={children}></View >
    )
}

export default FullScreenContainer