import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import theme from './src/core/theme'
import {RealmContext} from './src/models';
import * as Notifications from "expo-notifications";
import {AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import i18n from "./src/core/translations";
import {Provider} from "react-native-paper";
import {setDefaultSettings, settings} from "./src/helpers/SettingsHelper";
import {Platform} from "react-native";
import * as Device from "expo-device";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import FoodManager from "./src/screens/FoodManager";
import {NewProduct} from "./src/screens/NewProduct";
import {BarcodeScanner} from "./src/screens/BarcodeScanner";
import {SettingsScreen} from "./src/screens/Settings";

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
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        setDefaultSettings().then(r => console.debug(settings))
        registerForPushNotificationsAsync()
            .then(token => setExpoPushToken(token))
            .catch(e => console.error(e));
    }, [])

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            if (existingStatus !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        }
    }

    return (
        <RealmProvider>
            <Provider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <NavigationContainer theme={theme}>
                        <Tab.Navigator
                            screenOptions={({route}) => ({
                                initialRouteName: 'ProductsList',
                                unmountOnBlur: true,
                                headerStyle: {
                                    backgroundColor: theme.colors.primary,
                                },
                                headerTitleStyle: {
                                    fontSize: 30,
                                    color: theme.colors.onSecondary,
                                    fontWeight: 'bold',
                                },
                                tabBarStyle: {
                                    backgroundColor: theme.colors.primary,
                                    height: 60
                                },
                                tabBarItemStyle: {
                                    paddingVertical: 5
                                },
                                tabBarInactiveTintColor: theme.colors.primaryContainer,
                                tabBarActiveTintColor: theme.colors.primaryContainer,
                                tabBarActiveBackgroundColor: theme.colors.onPrimaryContainer,
                                tabBarIcon: ({focused, color, size}) => {
                                    switch (route.name) {
                                        case 'NewProduct':
                                            return <AntDesign name="plussquare" size={50} color={theme.colors.success}/>
                                        case 'BarcodeScanner':
                                            return <MaterialCommunityIcons name="barcode-scan" size={30}
                                                                           color={theme.colors.tertiary}/>;
                                        case 'ItemList':
                                            return <FontAwesome name="list" size={30}
                                                                color={theme.colors.inversePrimary}/>;
                                        case 'Settings':
                                            return <Ionicons name="settings-sharp" size={30}
                                                             color={theme.colors.outlineVariant}/>;
                                        default:
                                            return <MaterialCommunityIcons name="fridge-variant" size={35}
                                                                           color={theme.colors.warning}/>;
                                    }
                                }
                            })}
                        >
                            <Tab.Screen
                                name="ProductsList"
                                component={FoodManager}
                                options={{
                                    title: i18n.t('appName'),
                                }}
                            />
                            <Tab.Screen
                                name="ItemList"
                                component={FoodManager}
                                options={{title: i18n.t('myProducts')}}
                            />
                            <Tab.Screen
                                name="NewProduct"
                                component={NewProduct}
                                options={{
                                    tabBarLabel: () => null,
                                    title: i18n.t('addNewProduct')
                                }}
                            />
                            <Tab.Screen
                                name="BarcodeScanner"
                                component={BarcodeScanner}
                                options={{title: i18n.t('scanProduct')}}
                            />
                            <Tab.Screen
                                name="Settings"
                                component={SettingsScreen}
                                options={{title: i18n.t('settings')}}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                </GestureHandlerRootView>
            </Provider>
        </RealmProvider>
    )
}
