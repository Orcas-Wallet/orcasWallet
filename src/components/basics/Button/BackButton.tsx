import React from 'react'
import CButton from '.'
import MCIcons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';

function BackButton({ onPress, passedClassName }) {
    return (
        <TouchableOpacity onPress={onPress} className={`bg-transparent ${passedClassName}`}>
            <MCIcons name={"arrow-back"} color={"#0F6EFF"} size={24} />
        </TouchableOpacity>
    )
}

export default BackButton