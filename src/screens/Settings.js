import {StyleSheet, View} from 'react-native';
import React from "react";
import {commonStyles} from "../core/theme";
import TopToolbar from "../components/TopToolbar";
import i18n from "../core/translations";

export default function Settings({navigation}) {
    return (
        <View style={commonStyles.container}>
            <TopToolbar
                title={i18n.t('settings')}
                leftIcon='back'
                leftIconPress={navigation.goBack}
            />
            <View style={commonStyles.content}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
});