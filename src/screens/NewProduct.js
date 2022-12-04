import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DatePicker from 'react-native-date-picker'
import {Image, StyleSheet, View} from "react-native";
import {Switch} from "react-native-paper";
import {Food} from "../models/Food";
import {RealmContext} from "../models";
import demoProduct from '../assets/foods/healthy-food.png'
import theme, {commonStyles} from "../core/theme";
import {schedulePushNotification} from "../helpers/NotificationsHelper";
import i18n from "../core/translations";
import {IMAGES} from "../constants/images";
import Paragraph from "../components/Paragraph";
import {settings} from "../helpers/SettingsHelper";
import {ImageSelection} from "./ImageSelection";

export const NewProduct = ({navigation, route}) => {
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(true);

    useEffect(() => {
        if(route?.params?.name) {
            const {name, imgUrl} = route.params;
            setText(name);
            setImageUrl(imgUrl);
        }
    }, []);

    const getTomorrowDate = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow;
    }

    const buildNotificationDate = () => {
        let notificationDate = new Date(date);
        let dayOfMonth = notificationDate.getDate();
        if(dayOfMonth - parseInt(settings.firstNotification) > new Date().getDate() )
            notificationDate.setDate(dayOfMonth - parseInt(settings.firstNotification));
        notificationDate.setHours(9, 0);
        return notificationDate;
    }

    const handleAddFood = () => {
        let notificationDate = buildNotificationDate();
        schedulePushNotification(
            i18n.t('appName'), text + i18n.t('nearExpiration') + notificationDate.toLocaleDateString(), notificationDate
        ).then(notificationId => {
            let food = Food.generate(text, date, imageUrl, imageName, notificationId, isSwitchOn);
            realm.write(() => {
                realm.create('Food', food);
                navigation.navigate('ProductsList');
            });
        })
        .catch(error => {
            console.error("Error scheduling notification: ", error);
            navigation.navigate('ProductsList');
        })

    }

    const onNameChange = (value) => {
        setText(value);
    }

    const onDateChange = (selectedDate) => {
        setDate(new Date(selectedDate));
    }

    const onImgSelection = (selectedImg) => {
        setImageName(selectedImg);
        setModalOpen(false);
    }

    const getImage = () => {
        if(imageUrl.length > 0) return {uri: imageUrl};
        if(imageName) return IMAGES[imageName];
        return demoProduct;
    }

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={commonStyles.container}>
            <View style={[commonStyles.content, styles.container]}>
                <Image style={styles.productImage} source={getImage()}/>
                {imageUrl.length === 0 && <ImageSelection onImgSelection={onImgSelection} setModalVisible={setModalOpen} modalVisible={modalOpen} /> }
                <Header
                    fontSize={21}
                    color={theme.colors.primary}
                >
                    {i18n.t('productName')}
                </Header>
                <TextInput
                    label={i18n.t('name')}
                    onChangeText={onNameChange}
                    value={text}
                />
                <Header
                    fontSize={21}
                    color={theme.colors.primary}
                >{i18n.t('expirationDate')}</Header>
                <View style={styles.dateContainer}>
                    <DatePicker
                        date={date}
                        onDateChange={onDateChange}
                        androidVariant='iosClone'
                        minimumDate={getTomorrowDate()}
                        mode="date"
                        locale={i18n.locale}
                        style={styles.datepicker}
                        fadeToColor={theme.colors.surfaceVariant}
                        theme="light"
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Paragraph style={styles.switchText}>{i18n.t('addToFridge')}</Paragraph>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={theme.colors.primary}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode="contained" style={[styles.button,{backgroundColor: theme.colors.secondary}]} onPress={() => navigation.navigate("ProductsList")}>
                        {i18n.t('cancel')}
                    </Button>
                    <Button mode="contained" style={styles.button} onPress={handleAddFood}>
                        {i18n.t('save')}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surfaceVariant
    },
    dateContainer: {
        width: 300,
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        marginVertical: 12,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    switchContainer: {
        flexDirection: "row"
    },
    datepicker: {
        height: 180,
        width: 400,
        marginBottom: 10
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    button: {
        flex: 1,
        margin: 10,
        backgroundColor: theme.colors.onPrimary
    },
    switchText: {
        alignSelf: 'center',
        marginHorizontal: 30,
        fontSize: 20,
        color: theme.colors.primary,
        fontWeight: "bold"
    }
});
