import { StyleSheet, View, Text } from 'react-native';
import "./src/utils/base64Polyfill"
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/pages/Auth/Welcome';
import Home from './src/pages/Home';
import Login from './src/pages/Auth/Regsiter';
import { store } from "./src/store";
import { Provider } from "react-redux";
import EnablefaceId from './src/pages/Auth/EnablefaceId';
import AddressSelector from './src/components/accountSelector';
import TokenTransfer from './src/pages/TokenTransfer';
import TokenRecieve from './src/pages/Home/TokenRecieve';
import QrcodeScanner from './src/components/Qrcode/Scanner';
import onAboard from './src/pages/Auth/onABoard';
import { useFonts, Inter_400Regular, Inter_100Thin, Inter_300Light, Inter_600SemiBold, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import Keychain from './src/components/Keychain';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    dark: true
  },
};


export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400: Inter_400Regular,
    Inter_100: Inter_100Thin,
    Inter_500: Inter_500Medium,
    Inter_700: Inter_700Bold,
    Inter_300: Inter_300Light,
    Inter_600: Inter_600SemiBold
  });
  console.log(fontsLoaded)
  if (!fontsLoaded) {
    return null;
  }
  const isLoggedIn = true;
  return (
    <View className='h-screen'>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{ headerShadowVisible: false, title: "", headerStyle: { backgroundColor: 'white' }, headerShown: true, }}>
            {isLoggedIn ? (
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

              </Stack.Group>
            ) : (
              <Stack.Group >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Login} />
                <Stack.Screen name="Aboard" component={onAboard} />
                <Stack.Screen name="FaceId" component={EnablefaceId} />
                {/* <Stack.Screen name="keyChain" component={Keychain}></Stack.Screen> */}
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
