import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './src/core/theme'
import {BarcodeScanner, ProductsList, Settings} from './src/screens'
import NewProduct from "./src/screens/NewProduct";
import {RealmContext} from './src/models';
import * as Notifications from "expo-notifications";
import {AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome} from "@expo/vector-icons";
import i18n from "./src/core/translations";
import {Provider} from "react-native-paper";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {

    const {RealmProvider} = RealmContext;

    return (
        <RealmProvider>
            <Provider>
                <NavigationContainer theme={theme}>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            headerStyle: {
                                backgroundColor: theme.colors.primary
                            },
                            headerTitleStyle: {
                                fontSize: 30,
                                color: theme.colors.onPrimary,
                                fontWeight: 'bold',
                            },
                            tabBarStyle: {
                                backgroundColor: theme.colors.primary,
                            },
                            tabBarActiveTintColor: theme.colors.onPrimaryContainer,
                            tabBarInactiveTintColor: theme.colors.onPrimary,
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconColor = focused ? theme.colors.onPrimaryContainer : theme.colors.onPrimary;
                                switch (route.name) {
                                    case 'NewProduct':
                                        return <AntDesign name="plussquare" size={50} color={iconColor} />
                                    case 'BarcodeScanner':
                                        return <MaterialCommunityIcons name="barcode-scan" size={30} color={iconColor} />;
                                    case 'ItemList':
                                        return <FontAwesome name="list" size={30} color={iconColor} />;
                                    case 'Settings':
                                        return <Ionicons name="settings-sharp" size={30} color={iconColor} />;
                                    default:
                                        return <MaterialCommunityIcons name="home" size={30} color={iconColor} />;
                                }

                            }
                        })}
                    >
                        <Tab.Screen
                            name="ProductsList"
                            component={ProductsList}
                            options={{
                                title: i18n.t('appName'),
                            }}
                        />
                        <Tab.Screen
                            name="ItemList"
                            component={ProductsList}
                            options={{title: i18n.t('myProducts')}}
                        />
                        <Tab.Screen
                            name="NewProduct"
                            component={NewProduct}
                            options={{
                                tabBarLabel: () => null,
                                title: i18n.t('addNewProduct')}}
                        />
                        <Tab.Screen
                            name="BarcodeScanner"
                            component={BarcodeScanner}
                            options={{title: i18n.t('scanProduct')}}
                        />
                        <Tab.Screen
                            name="Settings"
                            component={Settings}
                            options={{title: i18n.t('settings')}}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        </RealmProvider>
    )
}
