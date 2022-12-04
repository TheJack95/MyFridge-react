import * as Notifications from "expo-notifications";
import {settings} from "./SettingsHelper";

export async function allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}

export async function schedulePushNotification(title, body, date) {
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync()
    if(hasPushNotificationPermissionGranted && settings.notificationsAllowed === 'true') {
        return await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body
            },
            trigger: {date},
        });
    }
    return 'null';
}

export function removeNotification(id) {
    if(!id || id === 'null' ) {
        return Promise.resolve();
    }
    return Notifications.cancelScheduledNotificationAsync(id);
}
