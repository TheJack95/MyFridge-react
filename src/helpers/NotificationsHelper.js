import * as Notifications from "expo-notifications";

export async function schedulePushNotification(title, body, date) {
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body
        },
        trigger: {date},
    });
    return id;
}
