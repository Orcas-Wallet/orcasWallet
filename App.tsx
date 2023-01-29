import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'
import "./src/utils/base64Polyfill"

import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { store } from "./src/store";
import { Provider } from "react-redux";

import Routes from './Routes';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';


export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100: require('./assets/fonts/Inter-Thin.otf'),
    Inter_200: require('./assets/fonts/Inter-ExtraLight.otf'),
    Inter_300: require('./assets/fonts/Inter-Light.otf'),
    Inter_400: require('./assets/fonts/Inter-Regular.otf'),
    Inter_500: require('./assets/fonts/Inter-Medium.otf'),
    Inter_600: require('./assets/fonts/Inter-SemiBold.otf'),
    Inter_700: require('./assets/fonts/Inter-Bold.otf'),
    Inter_800: require('./assets/fonts/Inter-ExtraBold.otf'),
    Inter_900: require('./assets/fonts/Inter-Black.otf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  console.log(fontsLoaded)
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className='h-screen' onLayout={onLayoutRootView}>
      <Provider store={store}>
        <Routes />

      </Provider>
    </View >

  );
}
