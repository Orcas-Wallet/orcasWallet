import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

interface ICModal {
    children: string | ReactNode,
    isVisible: boolean,
    style?: any,
    onClose: () => void
    scrollTo?: (p: number) => void
    scrollOffset?: number
    scrollOffsetMax?: number
    passedClassName?: string
}

const CModal: FC<ICModal> = ({ children, passedClassName, isVisible, style, onClose, scrollOffsetMax, scrollTo, scrollOffset }) => {
    return (
        <Modal
            swipeDirection={['down']}
            scrollOffset={scrollOffset}
            onSwipeComplete={onClose}
            scrollTo={scrollTo}
            scrollOffsetMax={scrollOffsetMax}
            propagateSwipe={true}
            onBackdropPress={onClose}
            isVisible={isVisible}
            style={{ margin: 0, justifyContent: 'flex-end', ...style }} >
            <View className={`bg-white rounded-t-3xl items-center pt-4 ${passedClassName}`}>
                <View className='w-10 h-2 bg-gray-200 rounded-full' />
                {children}
            </View>
        </Modal>
    )
}

export default CModal