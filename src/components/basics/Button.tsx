import { View, Text, Button } from 'react-native'
import React, { FC } from 'react'
import { styled } from 'nativewind';

interface TCButton {
    title: string,

    theme?: "dark" | "light",
    passedClassName?: string
    onPress: () => void
}
const StyledButton = styled(Button);

const CButton: FC<TCButton> = ({ theme, title, onPress, passedClassName }) => {
    const buttonTheme = theme === 'dark' ? "bg-zinc-600" : "bg-white"
    const color = theme === 'dark' ? "white" : "black"
    return (
        <View className={`bg-white text-black w-5/12 rounded-2xl lihei text-base inline-block ${passedClassName} ${buttonTheme}`}>
            <StyledButton color={color} className='text-center  leading-8 leading-lg' onPress={onPress} title={title} />
        </View>
    )
}

export default CButton