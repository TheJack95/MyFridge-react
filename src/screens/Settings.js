import {ImageBackground, StyleSheet, View} from 'react-native';
import React from "react";
import {commonStyles} from "../core/theme";

export default function Settings({navigation}) {

    const image = require('../core/backgound.jpeg');
    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={commonStyles.container}>
                <View style={commonStyles.content}>

                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
});