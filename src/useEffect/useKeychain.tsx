import React from 'react'
import { View, Text } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import Keychain from '../components/Keychain';



const useKeyChain = () => {
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async function getValueFor(key) {

        await LocalAuthentication.authenticateAsync({
            disableDeviceFallback: false
        })
        let result = await SecureStore.getItemAsync(key);

        if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
        } else {
            alert('No values stored under that key.');
        }
    }
}
export default useKeyChain