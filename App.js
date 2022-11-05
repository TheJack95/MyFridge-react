import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './src/core/theme'
import {BarcodeScanner, ProductsList,} from './src/screens'
import NewProduct from "./src/screens/NewProduct";
import {RealmContext} from './src/models';
import * as Notifications from "expo-notifications";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
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
                                console.log(focused)
                                let iconName;
                                switch (route.name) {
                                    case 'NewProduct':
                                        iconName = "plussquare";
                                        break;
                                    case 'BarcodeScanner':
                                        iconName = "barcode-scan";
                                        break;
                                    default:
                                        iconName = 'home';
                                }
                                let iconColor = focused ? theme.colors.onPrimaryContainer : theme.colors.onPrimary;
                                return iconName === 'plussquare' ?
                                    <AntDesign name="plussquare" size={40} color={iconColor} /> :
                                    <MaterialCommunityIcons name={iconName} size={40} color={iconColor} />;
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
                            name="NewProduct"
                            component={NewProduct}
                            options={{title: i18n.t('addNewProduct')}}
                        />
                        <Tab.Screen
                            name="BarcodeScanner"
                            component={BarcodeScanner}
                            options={{title: i18n.t('scanProduct')}}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        </RealmProvider>
    )
}
