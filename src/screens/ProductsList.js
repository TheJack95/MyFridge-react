import React from 'react'
import ProductItem from './ProductItem'
import {Dimensions, FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import btnPlus from '../assets/button_plus.png'
import warning from '../assets/warning.png'
import Header from "../components/Header";
import {theme} from "../core/theme";
import {RealmContext} from "../models";
import {Food} from "../models/Food";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductsList({navigation}) {
    const {useQuery,  useRealm} = RealmContext;
    const items = useQuery(Food);
    const realm = useRealm();

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

    const onDeleteAllPress = () => {
        realm.write(() => {
            realm.deleteAll();
        });
    }
    const logItmes = () => {
       console.log(items)
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
                        <ProductItem name={item.name} imageUrl={item.imageUrl} expirationDate={item.expirationDate}/>
                    }
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={item => item._id.toString()}
                />
            </View>
            <View style={styles.bottomBarContainer}>
                <TouchableOpacity
                    onPress={onPlusPress}>
                    <Image style={styles.buttonPlus} source={btnPlus}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onDeleteAllPress}>
                    <Image style={styles.buttonPlus} source={warning}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logItmes}>
                    <Image style={styles.buttonPlus} source={warning}/>
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


