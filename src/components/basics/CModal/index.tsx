import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

interface ICModal {
    children: string | ReactNode,
    isVisible: boolean,
    style?: any,
    onClose: () => void
    passedClassName?: string
}

const CModal: FC<ICModal> = ({ children, passedClassName, isVisible, style, onClose }) => {
    return (
        <Modal
            swipeDirection={['down']}
            onSwipeComplete={onClose}
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