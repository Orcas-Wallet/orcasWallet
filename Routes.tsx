import { StyleSheet, Text, View } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import React, { useEffect } from 'react'
import Welcome from './src/pages/Auth/Welcome';
import Home from './src/pages/Home';
import Register from './src/pages/Auth/Register';
import Login from './src/pages/Auth/Login';

import EnablefaceId from './src/pages/Auth/EnablefaceId';
import AddressSelector from './src/components/accountSelector';
import TokenTransfer from './src/pages/TokenTransfer';
import TokenRecieve from './src/pages/Home/TokenRecieve';
import QrcodeScanner from './src/components/Qrcode/Scanner';
import onAboard from './src/pages/Auth/onABoard';
import Keychain from './src/components/Keychain';
import Menu from './src/pages/Menu';
import UserAgreement from './src/pages/Menu/MenuNav/UserAgreement';
import PrivacyPolicy from './src/pages/Menu/MenuNav/PrivacyPolicy';
import HelpCenter from './src/pages/Menu/MenuNav/HelpCenter';
import ContactUs from './src/pages/Menu/MenuNav/ContactUs';
import TxDetail from './src/pages/TxDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './src/store';
import { asyncStoredData, loginWithToken } from './src/store/accountSlice';
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
    useEffect(() => {
        if (access_token) {
          dispatch(loginWithToken(access_token))
        }
      }, [access_token])
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