import React, {useEffect, useState} from 'react'
import ProductItem from './ProductItem'
import {Button, Dimensions, FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import btnPlus from '../assets/button_plus.png'
import iconStar from '../assets/icon_star.png'
import Header from "../components/Header";
import {theme} from "../core/theme";
import {getAllData, removeAllData} from "../helpers/databaseHelper";
import {Food} from "../models/Food";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductsList({navigation}) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        Realm.open({
            schema: [Food], // predefined schema
        }).then(realm => {
            const tasks = realm.objects(Food);
            setItems([...tasks]);
            try {
                tasks.addListener(() => {
                    setItems([...tasks]);
                });
            } catch (error) {
                console.error(
                    `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`
                );
            }
            return () => {
                tasks.removeAllListeners();
                realm.close();
            };
        });
    }, []);

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#D8D8D8",
                }}
            />
        );
    };

    const onPlusPress = () => {
        navigation.navigate('NewProduct');
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
            />
            <View style={styles.logoContainer}>
                <Header>My Fridge</Header>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={items}
                    renderItem={({item}) =>
                        <ProductItem name={item.name} image={item.image} expirationDate={item.expirationDate}/>
                    }
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <View style={styles.bottomBarContainer}>
                <Button
                    onPress={removeAllData}
                    title="delete"
                    color={theme.colors.light}
                    accessibilityLabel="delete"
                />
                <TouchableOpacity
                    onPress={onPlusPress}>
                    <Image style={styles.buttonPlus} source={btnPlus}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={getAllData}>
                    <Image style={styles.buttonPlus} source={iconStar}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logoContainer: {
        paddingTop: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        width: Screen.width,
    },
    content: {
        // height: Screen.height,
        width: Screen.width,
        // height: 300,
        flex: 1,
    },
    body: {
        flex: 1,
        marginBottom: 56,
    },
    bottomBarContainer: {
        alignItems: "flex-end",
        backgroundColor: theme.colors.primary
    },
    buttonPlus: {
        width: 40,
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 20,
        tintColor: theme.colors.light,
    }
});


