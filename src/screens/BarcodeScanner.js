import {Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import getProductByBarcode from "../helpers/BarcodeScannerHelper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import {commonStyles, theme} from "../core/theme";

export default function BarcodeScanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync().then(response => {
            setHasPermission(response.granted);
        })
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
        getProductByBarcode(data).then( response => {
            navigation.navigate("NewProduct", {name: response.name, imgUrl: response.imgUrl})
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

    return (
        <View style={commonStyles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
            />
            <View style={commonStyles.logoContainer}>
                <Header>Scan Product</Header>
            </View>
            <View style={commonStyles.content}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <Button mode="outlined" style={styles.buttonClose} onPress={() => navigation.navigate("ProductsList")}>
                    Close
                </Button>
            </View>
            <View style={commonStyles.bottomBarContainer}>
                {scanned && <TouchableOpacity
                    onPress={() => setScanned(false)} style={commonStyles.iconContainer}>
                    <MaterialCommunityIcons name="barcode-scan" size={40} color={theme.colors.light} />
                </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={onListItemPress} style={commonStyles.iconContainer}>
                    <MaterialIcons name="list-alt" size={40} color={theme.colors.light} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonClose: {
        position: "absolute",
        bottom: 0
    }
    }
);