import {Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import getProductByBarcode from "../helpers/BarcodeScannerHelper";
import {AntDesign} from "@expo/vector-icons";
import {MaterialIcons} from '@expo/vector-icons';
import theme, {commonStyles} from "../core/theme";
import i18n from "../core/translations";
import TopToolbar from "../components/TopToolbar";

export default function BarcodeScanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [notFound, setNotFound] = useState(false);

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
        return (
            <View style={[commonStyles.content, styles.noItems]}>
                <Header color={theme.colors.secondary} fontSize={20}>{i18n.t('itemNotFound')}</Header>
                <Button mode="contained" style={styles.retryButton} onPress={onRetryPress}>
                    {i18n.t('retry')}
                </Button>
            </View>
        )
    }

    const onRetryPress = () => {
        setScanned(false);
        setNotFound(false);
    }

    const onPlusPress = () => {

    }

    return (
        <View style={commonStyles.container}>
            <TopToolbar title={i18n.t('scanProduct')} leftIcon='back' leftIconPress={navigation.goBack}/>
            <View style={commonStyles.content}>
                {!notFound &&
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                }
                { notFound && renderNoItemFound()}
                <Button mode="contained" style={styles.buttonClose} onPress={() => navigation.navigate("ProductsList")}>
                    {i18n.t('close')}
                </Button>
            </View>
            <View style={commonStyles.bottomBarContainer}>
                <TouchableOpacity
                    onPress={onListItemPress} style={commonStyles.iconContainer}>
                    <MaterialIcons name="list-alt" size={40} color={theme.colors.onPrimary}/>
                </TouchableOpacity>
                {scanned &&
                    <TouchableOpacity
                        onPress={onPlusPress} style={commonStyles.iconContainer}>
                        <AntDesign name="pluscircleo" size={40} color={theme.colors.onPrimary} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonClose: {
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.colors.secondary,
    },
    noItems: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    retryButton: {
        width: "50%"
    }
});