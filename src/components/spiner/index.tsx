import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { useAppSelector } from '../../store'

const SpinnerContainer = () => {
    const { loading } = useAppSelector((state) => state.app)
    return (
        <View>
            <Spinner
                visible={loading}
                color="#000000"
                overlayColor={"#F5FCFFad"}
                textContent={''}
            />
        </View>
    )
}

export default SpinnerContainer
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
})