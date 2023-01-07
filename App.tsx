import { StyleSheet, View, Text } from 'react-native';
import "./src/utils/base64Polyfill"
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/pages/Auth/Welcome';
import Home from './src/pages/Home';
import Login from './src/pages/Auth/Login';
import Register from './src/pages/Auth/Register';
import { store, useAppDispatch, useAppSelector } from "./src/store";
import { Provider } from "react-redux";
import EnablefaceId from './src/pages/Auth/EnablefaceId';
import AddressSelector from './src/components/accountSelector';
import TokenTransfer from './src/pages/TokenTransfer';
import TokenRecieve from './src/pages/Home/TokenRecieve';
import QrcodeScanner from './src/components/Qrcode/Scanner';
import ScanButton from './src/components/Qrcode/ScanButton';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    dark: true
  },
};

export default function App() {
  const isLoggedIn = true;
  return (
    <View className=' h-screen'>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Group screenOptions={{ headerShown: true, title: "", headerStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}>
                <Stack.Screen name="Home" component={Home} options={{
                  headerRight: () => (
                    <AddressSelector />
                  ),
                }} />
                <Stack.Screen name="tokenTransfer" component={TokenTransfer} options={{
                  headerRight: () => (
                    <ScanButton />
                  ),
                }} />
                <Stack.Screen name="tokenRecieve" component={TokenRecieve} options={{

                }} />
                <Stack.Screen name="scanner" component={QrcodeScanner} />

              </Stack.Group>
            ) : (
              <Stack.Group screenOptions={{ headerShown: true, title: "", headerStyle: { backgroundColor: 'white' } }} >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="FaceId" component={EnablefaceId} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
