import React, { FC, ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
import InterText from './InterText'

interface ITextButton {
    onPress: () => void,
    passedClassName?: string,
    children?: ReactNode
}
const TextButton: FC<ITextButton> = ({ onPress, passedClassName, children }) => {
    return (
        <TouchableOpacity onPress={onPress} className={`${passedClassName}`}>
            <InterText passedClassName='text-sm text-gray-100 text-center text-main-900'>{children}</InterText>
        </TouchableOpacity>
    )
}

export default TextButton