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

export async function removeNotification(id) {
    return Notifications.cancelScheduledNotificationAsync(id)
        .then(value => console.debug("Cancel notification: ", value))
        .catch(error => console.error(error));
}
