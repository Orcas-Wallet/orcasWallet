import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import InterText from '../../components/basics/Button/InterText'
import FullScreenContainer from '../../components/FullScreenContainer'

import MCIcons from 'react-native-vector-icons/FontAwesome'
import SocialItem from '../../components/socialItem'
import CButton from '../../components/basics/Button'
const MenuItem = ({ children, onPress }) => {
    return <TouchableOpacity onPress={onPress} className={"flex-row justify-between items-center py-4"}>
        <InterText passedClassName='font-base' weight='500'>
            {children}
        </InterText>
        <MCIcons size={20} name={"angle-right"}></MCIcons>
    </TouchableOpacity>
}
const generalSetting = [
    {
        name: "UserAgreement",
        text: "User Agreement"
    },
    {
        name: "PrivacyPolicy",
        text: "Privacy Policy"
    },
    {
        name: "HelpCenter",
        text: "Help Center"
    },
    {
        name: "ContactUs",
        text: "Contact Us"
    }
]
const socialList = [
    {
        name: 'twitter',
        link: "https://twitter.com/"
    },
    {
        name: "web",
        link: "https://twitter.com/"
    }
]
function Menu({ navigation }) {
    const onPress = (name) => {
        console.log(name)
        navigation.navigate(name)
    }
    const handleLogout = () => {

    }
    return (
        <FullScreenContainer passedClassName=''>
            <View>
                <InterText passedClassName='text-2xl'>Settings</InterText>
            </View>
            <View className='my-8'>
                <InterText passedClassName='text-sm' weight='200'>Security</InterText>
                <MenuItem onPress={() => onPress("ResetEmail")}>Reset Email</MenuItem>
            </View>
            <View className='my-6'>
                <InterText passedClassName='text-sm' weight='200'>General</InterText>
                {
                    generalSetting.map(({name, text}) =>
                        <MenuItem key={name} onPress={() => onPress(name)}>{text}</MenuItem>)
                }
            </View>
            <View className='my-6'>
                <InterText passedClassName='text-sm mb-4' weight='200'>Follow Us</InterText>
                <View className='flex-row items-start'>
                    {
                        socialList.map(({ name, link }) => <SocialItem key={name} name={name} link={link} />)
                    }

                </View>
            </View>
            <View className='w-full items-center'>
                <CButton onPress={handleLogout} passedClassName="bg-transparent">
                    <InterText passedClassName=' text-red-400 text-base' weight='600'>
                        Log out
                    </InterText>
                </CButton>
            </View>
            <View>
                <InterText passedClassName='text-center' weight='200'>
                    Orcas Wallet © 2022 v1.0
                </InterText>
            </View>

        </FullScreenContainer>
    )
}

export default Menu