import React from 'react'
import {Provider} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {theme} from './src/core/theme'
import {ProductsList,} from './src/screens'
import NewProduct from "./src/screens/NewProduct";
import {RealmContext} from './src/models';

const Stack = createStackNavigator()

export default function App() {

    const {RealmProvider} = RealmContext;

    return (
        <RealmProvider>
            <Provider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="ProductsList"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="ProductsList" component={ProductsList}/>
                        <Stack.Screen name="NewProduct" component={NewProduct}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </RealmProvider>
    )
}