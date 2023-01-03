import { Text, TouchableOpacity } from 'react-native'
import React, { FC, ReactNode } from 'react'

interface TCButton {
    theme?: "dark" | "light",
    circle?: boolean,
    passedClassName?: string
    onPress: () => void
    children: ReactNode | string
}
const CButton: FC<TCButton> = ({ theme, onPress, passedClassName, circle, children }) => {
    const buttonTheme = theme === 'dark' ? {
        bgColor: "bg-main-900",
        textColor: "text-main-100"
    } : {
        bgColor: "bg-main-100",
        textColor: "text-main-900"
    }
    const circleTheme = circle ? "rounded-full w-14" : "w-5/12 rounded-2xl"
    return (
        <TouchableOpacity className={`bg-white h-14 text-base inline-block  ${buttonTheme.bgColor} ${circleTheme} flex justify-center ${passedClassName}`} onPress={onPress}>
            <Text className={`text-center  ${buttonTheme.textColor}`}  >
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default CButton