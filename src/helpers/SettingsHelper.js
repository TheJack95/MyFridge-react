import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from "../core/translations";

const STORAGE_KEY = 'settings';

type NotificationSettings = {
    notificationsAllowed: boolean;
    firstNotification: string;
    secondNotification: string;
}

export type Setting = {
    languages: string;
    notificationSettings: NotificationSettings
}

export async function setDefaultSettings() {
    if(await getSettings() === null) {
        let defSettings = {
            languages: i18n.locale,
            notificationSettings: {
                notificationsAllowed: true,
                firstNotification: '2',
                secondNotification: '5'
            }
        }
        await setSettings(defSettings);
    }
}

export async function setSettings(value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch(e) {
        console.error("Error saving settings: ", e);
    }
}

export async function getSettings() {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.error("Error reading settings: ", e);
    }
}