import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

interface ICModal {
    children: string | ReactNode,
    isVisible: boolean,
    style?: any,
    onClose: () => void
}

const CModal: FC<ICModal> = ({ children, isVisible, style, onClose }) => {
    return (
        <Modal swipeDirection={['down']} onSwipeComplete={onClose} useNativeDriverForBackdrop swipeThreshold={100}
         onBackdropPress={onClose} isVisible={isVisible} style={{ margin: 0, justifyContent: 'flex-end', ...style }} >
            <View className='h-5/6 bg-white rounded-t-3xl items-center pt-4'>
                <View className='w-10 h-2 bg-gray-200 rounded-full'></View>
                {children}
            </View>
        </Modal>
    )
}

export default CModal