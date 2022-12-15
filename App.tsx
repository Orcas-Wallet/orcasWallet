import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/pages/Auth/Welcome';
import Home from './src/pages/Home';
import Login from './src/pages/Auth/Login';
import Register from './src/pages/Auth/Register';
const Stack = createNativeStackNavigator();


export default function App() {
  const isLoggedIn = false;
  return (
    <View className='h-screen bg-fuchsia-300'>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: 'black',

              },
              headerTitleStyle: {
                color: "white",
              },
              title: ""
            }}>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
