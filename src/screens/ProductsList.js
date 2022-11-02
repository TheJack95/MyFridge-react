import React from 'react'
import ProductItem from './ProductItem'
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../components/Header";
import {theme, commonStyles} from "../core/theme";
import {RealmContext} from "../models";
import {Food} from "../models/Food";
import Paragraph from "../components/Paragraph";
import Logo from "../components/Logo";

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
        navigation.navigate('BarcodeScanner');
    }

    return (
        <View style={commonStyles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
            />
            <View style={commonStyles.logoContainer}>
                <Header>My Fridge</Header>
            </View>
            { items.length === 0 && (
                <View style={[commonStyles.container, {alignItems: "center"}]}>
                    <Logo/>
                    <Header color={theme.colors.primary}>No items yet</Header>
                    <Paragraph>Scan a product barcode</Paragraph>
                    <Paragraph>Or add one by clicking the "+" button!</Paragraph>
                </View>
            )}
            <View style={commonStyles.content}>
                <FlatList
                    data={items}
                    renderItem={({item}) =>
                        <ProductItem item={item} />
                    }
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={item => item._id.toString()}
                    showsVerticalScrollIndicator
                />
            </View>
            <View style={commonStyles.bottomBarContainer}>
                <TouchableOpacity
                    onPress={onScanPress} style={commonStyles.iconContainer}>
                    <MaterialCommunityIcons name="barcode-scan" size={40} color={theme.colors.light} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPlusPress} style={commonStyles.iconContainer}>
                    <AntDesign name="pluscircleo" size={40} color={theme.colors.light} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


