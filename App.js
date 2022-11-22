import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import theme from './src/core/theme'
import {BarcodeScanner, ProductsList, Settings} from './src/screens'
import NewProduct from "./src/screens/NewProduct";
import {RealmContext} from './src/models';
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
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

    useEffect(() => {
        Notifications.getPermissionsAsync().then((statusObj) => {
            if (statusObj.status !== 'granted') {
                return Permissions.askAsync('notifications')
            }
            return statusObj;
        }).then((statusObj) => {
            if (statusObj.status !== 'granted') {
                return true;
            }
        })
    }, [])

    return (
        <RealmProvider>
            <Provider>
                <NavigationContainer theme={theme}>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            initialRouteName: 'ProductsList',
                            unmountOnBlur: true,
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
                                height: 100,
                                padding: 15
                            },
                            tabBarItemStyle: {
                                borderRadius: 10,
                                height: 60,
                                width: 'auto'
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
                                        return <FontAwesome name="list" size={30} color={theme.colors.inversePrimary}/>;
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
                            component={Settings}
                            options={{title: i18n.t('settings')}}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        </RealmProvider>
    )
}
