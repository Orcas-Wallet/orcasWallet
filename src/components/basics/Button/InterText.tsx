import { Inter_900Black } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import React, { FC, ReactNode } from 'react'
import { Text } from 'react-native'
interface IInterText {
    passedClassName?: string,
    weight?: string,
    style ?: any,
    children ?: ReactNode
}

const InterText: FC<IInterText> = ({ passedClassName, style, children, weight = 700 }) => {
    return (
        <Text className={`${passedClassName} leading-6`} style={{ fontFamily: `Inter_${weight}`, ...style }}>{children}</Text >
    )
}

export default InterText