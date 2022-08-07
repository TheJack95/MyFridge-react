import React from 'react'
import Logo from '../components/Logo'
import ProductItem from './ProductItem'
import {Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import demoProduct from '../assets/demo_product4.png'
import btnPlus from '../assets/button_plus.png'
import Header from "../components/Header";
import {theme} from "../core/theme";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductsList({navigation}) {
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

    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Header>My Fridge</Header>
                <Logo/>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={
                        [
                            {id: 1, image: demoProduct, expired: true},
                            {id: 2, image: demoProduct},
                            {id: 3, image: demoProduct, expired: true},
                            {id: 4, image: demoProduct, expired: true},
                            {id: 5, image: demoProduct},
                            {id: 6, image: demoProduct},
                            {id: 7, image: demoProduct},
                            {id: 8, image: demoProduct}
                        ]
                    }
                    renderItem={({item}) =>
                        <ProductItem image={item.image} expired={item.expired}/>
                    }
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.bottomBarContainer}>
                <TouchableOpacity
                    onPress={onPlusPress}>
                    <Image style={styles.buttonPlus} source={btnPlus}/>
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
        marginTop: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: theme.colors.background
    },
    buttonPlus: {
        width: 50,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 20,
        tintColor: theme.colors.primary,
    }
});


