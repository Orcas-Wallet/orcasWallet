import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './src/pages/Auth/Welcome';
import Home from './src/pages/Home';
import Login from './src/pages/Auth/Login';
import Register from './src/pages/Auth/Register';
import {AppDispatch, RootState, store} from "./src/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import {updateName} from "./src/appSlice";
import {useEffect} from "react";

const Stack = createNativeStackNavigator();

export default function App() {
    const {name} = useSelector((state: RootState) => state.app.name)
    const dispatch = useDispatch<AppDispatch>()

    console.log(`app name ${name}`)
    useEffect(() => {
        dispatch(updateName('newApp'))
    }, [])

    const isLoggedIn = false;
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    {isLoggedIn ? (
                        <Stack.Group>
                            <Stack.Screen name="Home" component={Home}/>
                        </Stack.Group>
                    ) : (
                        <Stack.Group screenOptions={{headerShown: true}}>
                            <Stack.Screen name="Welcome" component={Welcome}/>
                            <Stack.Screen name="Login" component={Login}/>
                            <Stack.Screen name="Register" component={Register}/>
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
