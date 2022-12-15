import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'
interface IFullScreenContainer {
    passedClassName?: string
    children?: ReactNode

}
const FullScreenContainer: FC<IFullScreenContainer> = ({ children, passedClassName }) => {
    return (
        <View className={`bg-black h-screen px-3 ${passedClassName}`} children={children}></View >
    )
}

export default FullScreenContainer