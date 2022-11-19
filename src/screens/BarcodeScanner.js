import {Text, View, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import getProductByBarcode from "../helpers/BarcodeScannerHelper";
import theme, {commonStyles} from "../core/theme";
import i18n from "../core/translations";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";

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

    const renderNoItems = () => {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Logo/>
            <Header color={theme.colors.onBackground}>{i18n.t('noItems')}</Header>
            <Paragraph>{i18n.t('paragraph1')}</Paragraph>
            <Paragraph>{i18n.t('paragraph2')}</Paragraph>
            {route.name === 'ProductsList' && <Paragraph>{i18n.t('paragraph3')}</Paragraph>}
        </View>;
    }

    if (hasPermission === null) {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Header color={theme.colors.onBackground}>{i18n.t('requestCamera')}</Header>
        </View>;
    }
    if (hasPermission === false) {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Header color={theme.colors.onBackground}>{i18n.t('noCameraAccess')}</Header>
        </View>;
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
            <View style={commonStyles.content}>
                {!notFound &&
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                }
                { notFound && renderNoItemFound()}
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