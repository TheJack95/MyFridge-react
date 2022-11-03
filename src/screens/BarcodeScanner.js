import {Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import getProductByBarcode from "../helpers/BarcodeScannerHelper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {MaterialIcons} from '@expo/vector-icons';
import {commonStyles, theme} from "../core/theme";
import i18n from "../core/translations";
import Paragraph from "../components/Paragraph";

export default function BarcodeScanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    const [notFound, setNotFound] = useState(true);

    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync().then(response => {
            setHasPermission(response.granted);
        })
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        getProductByBarcode(data).then(response => {
            if (response.status === 1)
                navigation.navigate("NewProduct", {name: response.name, imgUrl: response.imgUrl})
            else
                setNotFound(true);
        });
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const onListItemPress = () => {
        navigation.navigate('ProductsList');
    }

    const renderNoItemFound = () => {
        return <Header color={theme.colors.secondary} fontSize={20}>{i18n.t('itemNotFound')}</Header>;
    }

    const onScanPress = () => {
        setScanned(false);
        setNotFound(false);
    }

    return (
        <View style={commonStyles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
            />
            <View style={commonStyles.logoContainer}>
                <Header>{i18n.t('scanProduct')}</Header>
            </View>
            <View style={commonStyles.content}>
                {!notFound &&
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                }
                { notFound && renderNoItemFound()}
                <Button mode="outlined" style={styles.buttonClose} onPress={() => navigation.navigate("ProductsList")}>
                    {i18n.t('close')}
                </Button>
            </View>
            <View style={commonStyles.bottomBarContainer}>
                {scanned && <TouchableOpacity
                    onPress={onScanPress()} style={commonStyles.iconContainer}>
                    <MaterialCommunityIcons name="barcode-scan" size={40} color={theme.colors.light}/>
                </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={onListItemPress} style={commonStyles.iconContainer}>
                    <MaterialIcons name="list-alt" size={40} color={theme.colors.light}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonClose: {
        position: "absolute",
        bottom: 0,
    }
});