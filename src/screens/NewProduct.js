import React, {useEffect, useState} from 'react';
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, StyleSheet, View} from "react-native";
import {Food} from "../models/Food";
import {RealmContext} from "../models";
import demoProduct from '../assets/foods/healthy-food.png'
import {theme} from "../core/theme";
import {schedulePushNotification} from "../helpers/NotificationsHelper";
import i18n from "../core/translations";

export default function NewProduct({navigation, route}) {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        if(route?.params?.name) {
            const {name, imgUrl} = route.params;
            setText(name);
            setImageUrl(imgUrl);
        }
    }, []);

    const {useRealm} = RealmContext;
    const realm = useRealm();
    const handleAddFood = () => {
        realm.write(() => {
            let food = Food.generate(text, date, imageUrl, 'healthy-food');
            realm.create('Food', food);
            let notificationDate = new Date(date);
            notificationDate.setHours(9, 0);
            schedulePushNotification(
                "Food notification", text +" in scadenza", notificationDate
            ).then(value => navigation.navigate('ProductsList'))
            .catch(error => {
                console.error("Error scheduling notification: ", error);
                navigation.navigate('ProductsList');
            })
        });
    }

    const onNameChange = (value) => {
        setText(value);
    }

    const onDateChange = (event, selectedDate) => {
        setDate(new Date(selectedDate));
    }

    const onImageSelect = (selectedImg) => {
        food.imageName = new Date(selectedImg);
    }

    const getImage = () => {
        if(imageUrl) return {uri: imageUrl};
        return demoProduct;
    }

    return (
        <Background>
            <Header color={theme.colors.primary}>{i18n.t('addNewProduct')}</Header>
            <Image style={styles.productImage} source={getImage()}/>
            <Header
                fontSize={21}
                color={theme.colors.primary}
            >
                {i18n.t('productName')}
            </Header>
            <TextInput
                label="Name"
                onChangeText={onNameChange}
                value={text}
            />
            <Header
                fontSize={21}
                color={theme.colors.primary}
            >{i18n.t('expirationDate')}</Header>
            <View style={styles.container}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={onDateChange}
                    display="spinner"
                    style={styles.datepicker}
                    minimumDate={new Date()}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={[{backgroundColor: theme.colors.secondary}, styles.button]} onPress={() => navigation.navigate("ProductsList")}>
                    {i18n.t('cancel')}
                </Button>
                <Button mode="contained" style={styles.button} onPress={handleAddFood}>
                    {i18n.t('save')}
                </Button>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        alignItems: 'center'
    },
    textContainer: {
        width: '100%',
        marginVertical: 12,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: theme.colors.surface,
    },
    datepicker: {
        width: 400,
        margin: 0,
        padding: 0
    },
    productImage: {
        width: 100,
        height: 100,
    },
    button: {
        flex: 1,
        margin: 10,
    }
});