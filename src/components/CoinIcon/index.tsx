import React from 'react'
import { View } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CoinIcon({ name, passedClassName = '', size = 26 }) {
    const colorTheme = {
        bitcoin: {
            color: "#fca25d",
            bgColor: "#fff6ef",
            icon: "currency-btc"
        },
        ethereum: {
            color: "#0F6EFF",
            bgColor: "#0F6EFF",
            icon: "ethereum"
        }
    }
    const theme = colorTheme[name.toLowerCase()]
    return (
        <View className={`w-12 h-12  bg-main-100 rounded-xl flex justify-center items-center ${passedClassName}`}>
            <MCIcons name={theme.icon} color={theme.color} size={size} />
        </View>

    )
}

export default CoinIcon