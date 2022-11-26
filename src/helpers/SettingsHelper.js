import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from "../core/translations";

export const LANGUAGE = 'languages';
export const NOTIFICATION_ALLOWED = 'notificationsAllowed';
export const FIRST_NOTIFICATION = 'firstNotification';
export const SECOND_NOTIFICATION = 'secondNotification';

class Setting {
    languages: string;
    notificationsAllowed: boolean;
    firstNotification: string;
    secondNotification: string;
}

export var settings: Setting = undefined;

export async function setDefaultSettings() {
    if(settings === undefined) {
        settings = {
            languages: i18n.locale,
            notificationsAllowed: "true",
            firstNotification: "2",
            secondNotification: "5"
        }
        await setSettings(LANGUAGE, i18n.locale);
        await setSettings(NOTIFICATION_ALLOWED, "true");
        await setSettings(FIRST_NOTIFICATION, "2");
        await setSettings(SECOND_NOTIFICATION, "5");
    } else {
        settings = {
            languages: await getSettings(LANGUAGE),
            notificationsAllowed:  await getSettings(NOTIFICATION_ALLOWED),
            firstNotification: await getSettings(FIRST_NOTIFICATION),
            secondNotification: await getSettings(SECOND_NOTIFICATION)
        }
    }
}

export async function setSettings(storageKey, value) {
    try {
        settings[storageKey] = value;
        await AsyncStorage.setItem(storageKey, value)
    } catch(e) {
        console.error("Error saving "+storageKey+" settings: ", e);
    }
}

export async function getSettings(storageKey): Setting {
    try {
        return await AsyncStorage.getItem(storageKey);
    } catch(e) {
        console.error("Error reading settings: ", e);
    }
}