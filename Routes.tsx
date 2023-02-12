import { StyleSheet, Text, View } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import React, { useEffect } from 'react'
import Welcome from './src/screens/Auth/Welcome';
import Home from './src/screens/Home';
import Register from './src/screens/Auth/Register';
import Login from './src/screens/Auth/Login';

import EnablefaceId from './src/screens/Auth/EnablefaceId';
import AddressSelector from './src/components/accountSelector';
import TokenTransfer from './src/screens/TokenTransfer';
import TokenRecieve from './src/screens/Home/TokenRecieve';
import QrcodeScanner from './src/components/Qrcode/Scanner';
import onAboard from './src/screens/Auth/onABoard';
import Keychain from './src/components/Keychain';
import Menu from './src/screens/Menu';
import UserAgreement from './src/screens/Menu/MenuNav/UserAgreement';
import PrivacyPolicy from './src/screens/Menu/MenuNav/PrivacyPolicy';
import HelpCenter from './src/screens/Menu/MenuNav/HelpCenter';
import ContactUs from './src/screens/Menu/MenuNav/ContactUs';
import TxDetail from './src/screens/TxDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from './src/store';
import { asyncStoredData } from './src/store/accountSlice';
import ResetEmail from './src/screens/Auth/ResetEmail';
// import ResetEmail from './src/screens/Auth/ResetEmail';
const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        dark: true
    },
};
const Routes = () => {
    const { access_token, isLogin } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(asyncStoredData())
    }, [])
    console.log(access_token, isLogin)
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{ headerShadowVisible: false, title: "", headerStyle: { backgroundColor: 'white' }, headerShown: true, }}>
                {access_token && isLogin ? (
                    <Stack.Group screenOptions={{
                        headerTintColor: '#0F6EFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }}>
                        <Stack.Screen name="Home" component={Home} options={{
                            headerRight: () => (
                                <AddressSelector />
                            ),
                        }} />
                        <Stack.Screen name="tokenTransfer" component={TokenTransfer} />
                        <Stack.Screen name="tokenRecieve" component={TokenRecieve} options={{

                        }} />
                        <Stack.Screen name="scanner" component={QrcodeScanner} />
                        <Stack.Screen name="Menu" component={Menu} />
                        <Stack.Screen name="UserAgreement" component={UserAgreement} />
                        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                        <Stack.Screen name="HelpCenter" component={HelpCenter} />
                        <Stack.Screen name="ContactUs" component={ContactUs} />
                        <Stack.Screen name="TxDetail" component={TxDetail} />
                        <Stack.Screen name="EnableFaceId" component={EnablefaceId} />
                        <Stack.Screen name="ResetEmail" component={ResetEmail} />
                    </Stack.Group>
                ) : (
                    <Stack.Group >
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Aboard" component={onAboard} />
                        {/* <Stack.Screen name="keyChain" component={Keychain}></Stack.Screen> */}
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
});