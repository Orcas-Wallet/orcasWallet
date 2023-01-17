import React from 'react'
import { View, Text } from 'react-native'
import CButton from './basics/Button'
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';



function Keychain() {
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key, {
            requireAuthentication: true,
            keychainAccessible: SecureStore.ALWAYS
        });

        if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
        } else {
            alert('No values stored under that key.');
        }
    }
    const handleFacesDetected = (faces) => {
        console.log(faces);
    }
    return (
        <View>
            <Text>asdsa</Text>
            <CButton passedClassName='w-full' onPress={() => { save("test", "sdasdsadsaa") }}>save</CButton>
            <CButton onPress={() => getValueFor('test')}>get</CButton>
        </View>
    )
}

export default Keychain