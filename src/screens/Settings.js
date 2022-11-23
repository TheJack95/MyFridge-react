import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from "react";
import theme, {commonStyles} from "../core/theme";
import Paragraph from "../components/Paragraph";
import i18n from "../core/translations";
import {Switch} from "react-native-paper";
import {getSettings, setSettings} from "../helpers/SettingsHelper";

export default function Settings() {
    const image = require('../core/backgound.jpeg');
    const [settings, updateSettings] = useState();
    const [notificationsAllowed, setNotificationsAllowed] = useState();

    useEffect(() => {
        getSettings()
            .then(r => {
                console.log(r)
                updateSettings(r);
                setNotificationsAllowed(r.notificationSettings.notificationsAllowed)
            })
            .catch(e => console.error(e));
    }, [])

    const onNotificationValueChange = (value) => {
        setNotificationsAllowed(value);
        settings.notificationSettings.notificationsAllowed = value;
        setSettings(settings).then(r => console.log("saved"));
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={commonStyles.content}>
                <View>
                    <View style={styles.switchContainer}>
                        <Paragraph style={styles.switchText}>{i18n.t('notificationSettingText')}</Paragraph>
                        <Switch value={notificationsAllowed} onValueChange={(value) => onNotificationValueChange(value)} color={theme.colors.primary}/>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    switchContainer: {
        backgroundColor: theme.colors.background,
        padding: 10,
        margin: 10,
        borderRadius: 44/2,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    switchText: {
        alignSelf: 'center',
        color: theme.colors.onSecondary,
        fontWeight: "bold"
    }
});