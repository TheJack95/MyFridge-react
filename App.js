import React from 'react'
import {Provider} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {theme} from './src/core/theme'
import {ProductsList,} from './src/screens'
import NewProduct from "./src/screens/NewProduct";

const Stack = createStackNavigator()

export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="ProductsList"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {/*<Stack.Screen name="StartScreen" component={StartScreen}/>*/}
                    {/*<Stack.Screen name="LoginScreen" component={LoginScreen}/>*/}
                    {/*<Stack.Screen name="RegisterScreen" component={RegisterScreen}/>*/}
                    <Stack.Screen name="ProductsList" component={ProductsList}/>
                    <Stack.Screen name="NewProduct" component={NewProduct}/>
                    {/*<Stack.Screen*/}
                    {/*    name="ResetPasswordScreen"*/}
                    {/*    component={ResetPasswordScreen}*/}
                    {/*/>*/}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}