import React from 'react'
import ProductItem from './ProductItem'
import {Dimensions, FlatList, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../components/Header";
import {theme} from "../core/theme";
import {RealmContext} from "../models";
import {Food} from "../models/Food";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductsList({navigation}) {
    const {useQuery} = RealmContext;
    const items = useQuery(Food);

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

    const onScanPress  = () => {
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
                        <ProductItem item={item} />
                    }
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={item => item._id.toString()}
                />
            </View>
            <View style={styles.bottomBarContainer}>
                <TouchableOpacity
                    onPress={onScanPress} style={styles.iconContainer}>
                    <MaterialCommunityIcons name="barcode-scan" size={40} color={theme.colors.light} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPlusPress} style={styles.iconContainer}>
                    <AntDesign name="pluscircleo" size={40} color={theme.colors.light} />
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
        paddingTop: 40,
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
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    iconContainer: {
        margin: 20,
    },
});


