import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
function MenuButton() {
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate("Menu")
    }
    return (
        <TouchableOpacity onPress={onPress} className={`bg-transparent`}>
            <MCIcons name={"menu"} color={"#131517"} size={24} />
        </TouchableOpacity>
    )
}

export default MenuButton