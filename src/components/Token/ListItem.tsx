import React, { FC, ReactNode } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

interface IListItem {
    children: ReactNode,
    onPress: () => void,
    passedClassName?: string
}
const ListItem: FC<IListItem> = ({ children, onPress, passedClassName }) => {
    return (
        <TouchableWithoutFeedback  onPress={onPress}>
            <View className={`mb-4 px-4 rounded-xl  flex-row bg-[#F9F9FA] h-[72] justify-between items-center ${passedClassName}`}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ListItem