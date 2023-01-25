import { Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { FC, ReactNode } from 'react'
import InterText from './InterText'

interface TCButton {
    theme?: "dark" | "light",
    circle?: boolean,
    disabled?: boolean,
    passedClassName?: string
    onPress: () => void
    children: ReactNode | string
}
const CButton: FC<TCButton> = ({ theme, onPress, passedClassName, circle, children, disabled = false }) => {
    const buttonTheme = theme === 'dark' ? {
        bgColor: "bg-main-900",
        textColor: "text-white"
    } : {
        bgColor: "bg-main-100",
        textColor: "text-main-900"
    }
    const disabledClassed = disabled ? "bg-[#0F6EFF33] text-white" : ""
    const circleTheme = circle ? "rounded-full w-14" : "w-5/12 rounded-2xl"
    const onButtonPress = () => {

        !disabled && onPress()
    }
    return (
        <TouchableOpacity
            disabled={disabled}
            className={`bg-white h-14  ${buttonTheme.bgColor} ${circleTheme} flex justify-center ${passedClassName} ${disabledClassed}`}
            onPress={onButtonPress}>
            <InterText passedClassName={`text-center font-bold  text-base  ${buttonTheme.textColor}`} weight={"700"} >
                {children}
            </InterText>
        </TouchableOpacity>
    )
}

export default CButton