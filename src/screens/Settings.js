import {ImageBackground, StyleSheet, View} from 'react-native';
import theme, {commonStyles} from "../core/theme";
import Paragraph from "../components/Paragraph";
import i18n from "../core/translations";
import {Switch} from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import {
    FIRST_NOTIFICATION,
    NOTIFICATION_ALLOWED,
    SECOND_NOTIFICATION,
    setSettings,
    settings
} from "../helpers/SettingsHelper";
import Header from "../components/Header";
import {useState} from "react";

export default function Settings() {
    const image = require('../core/backgound.jpeg');
    const [notificationsAllowed, setNotificationsAllowed] = useState(settings.notificationsAllowed === 'true');
    const [firstNotification, setFirstNotification] = useState(settings.firstNotification);
    const [secondNotification, setSecondNotification] = useState(settings.secondNotification);

    const onNotificationValueChange = (value) => {
        setNotificationsAllowed(value);
        setSettings(NOTIFICATION_ALLOWED, value.toString()).then(r => console.debug(`${NOTIFICATION_ALLOWED} value: ${value} saved`));
    }

    const onFirstNotificationValueChange = (value) => {
        setFirstNotification(value);
        setSettings(FIRST_NOTIFICATION, value.toString()).then(r => console.debug(`${FIRST_NOTIFICATION} value: ${value} saved`));
    }

    const onSecondNotificationValueChange = (value) => {
        setSecondNotification(value);
        setSettings(SECOND_NOTIFICATION, value.toString()).then(r => console.debug(`${SECOND_NOTIFICATION} value: ${value} saved`));
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={commonStyles.content}>
                <View style={{margin: 10}}>
                    <Header
                        fontSize={21}
                        color={theme.colors.onPrimary}
                        textAlign={'justify'}
                    >{i18n.t('notifications')}</Header>
                    <Paragraph style={{color: theme.colors.onSecondary}}>{i18n.t('notificationSettingText2')}</Paragraph>
                </View>
                <View style={styles.notSettingsContainer}>
                    <View style={styles.switchContainer}>
                        <Paragraph style={styles.switchText}>{i18n.t('notificationSettingText')}</Paragraph>
                        <Switch value={notificationsAllowed} onValueChange={(value) => onNotificationValueChange(value)}
                                color={theme.colors.primary}/>
                    </View>
                    {notificationsAllowed && (
                        <>
                            <View style={styles.switchContainer}>
                                <Paragraph style={styles.switchText}>{i18n.t('firstNotification')}</Paragraph>
                                <InputSpinner
                                    min={1}
                                    step={1}
                                    color={theme.colors.primary}
                                    value={firstNotification}
                                    onChange={(num) => {
                                        onFirstNotificationValueChange(num);
                                    }}
                                    skin='round'
                                    width={100}
                                    height={35}
                                />
                            </View>
                            {/*<View style={styles.switchContainer}>
                                <Paragraph style={styles.switchText}>{i18n.t('secondNotification')}</Paragraph>
                                <InputSpinner
                                    min={0}
                                    step={1}
                                    color={theme.colors.primary}
                                    value={secondNotification}
                                    onChange={(num) => {
                                        onSecondNotificationValueChange(num);
                                    }}
                                    skin='round'
                                    width={100}
                                    height={35}
                                />
                            </View>*/}
                        </>
                    )}
                </View>
                {/*<View style={{margin: 10}}>
                    <Header
                        fontSize={21}
                        color={theme.colors.onPrimary}
                        textAlign={'justify'}
                    >{i18n.t('language')}</Header>
                </View>*/}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    notSettingsContainer: {
        backgroundColor: theme.colors.background,
        padding: 10,
        margin: 10,
        borderRadius: 44 / 2,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    switchText: {
        alignSelf: 'center',
        color: theme.colors.onSecondary,
        fontWeight: "bold"
    },
    input: {
        height: 50
    }
});