import React, { FC } from 'react'
import { Linking, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MCIcons from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
interface ISocialItem {
    name: string,
    link: string,

}
const SocialItem: FC<ISocialItem> = ({ name, link }) => {
    const nav = useNavigation()
    const onPress = () => {
        Linking.openURL(link)
    }
    return (
        <TouchableOpacity onPress={onPress} className={' w-16 mr-6 h-16 bg-[#F5F7FE] justify-center items-center rounded-2xl'}>
            {
                name === 'twitter' ? <MCIcons color={"#0F6EFF"} name={'twitter'} size={36}></MCIcons>
                    : <MaterialIcons color={"#0F6EFF"} name={name} size={36}></MaterialIcons>
            }

        </TouchableOpacity>
    )
}

export default SocialItem