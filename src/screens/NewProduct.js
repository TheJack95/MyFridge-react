import React, {useState} from 'react';
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
import {schedulePushNotification} from "../helpers/notificationsHelper";

export default function NewProduct({navigation}) {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [imgName, setImgName] = useState('healthy-food');

    const {useRealm} = RealmContext;
    const realm = useRealm();
    const handleAddFood = () => {
        realm.write(() => {
            let food = Food.generate(text, date, '', imgName);
            realm.create('Food', food);
            let notificationDate = new Date(date);
            notificationDate.setHours(9, 0);
            schedulePushNotification(
                "Food notification", text +" in scadenza", notificationDate
            ).then(value => navigation.goBack())
            .catch(error => {
                console.error("Error scheduling notification: ", error);
                navigation.goBack();
            })
        });
    }

    const onNameChange = (value) => {
        setText(value);
    }

    const onDateChange = (event, selectedDate) => {
        setDate(new Date(selectedDate));
    }

    return (
        <Background>
            <BackButton navigation={navigation}/>
            <Header color={theme.colors.primary}>Add new product</Header>
            <Image style={styles.product_image} source={demoProduct}/>
            <Header
                fontSize={21}
                color={theme.colors.primary}
            >
                Product name
            </Header>
            <TextInput
                label="Name"
                onChangeText={onNameChange}
                value={text}
            />
            <Header
                fontSize={21}
                color={theme.colors.primary}
            >Expiration Date</Header>
            <View style={styles.container}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={onDateChange}
                    display="spinner"
                    style={styles.datepicker}
                />
            </View>
            <Button mode="contained" onPress={handleAddFood}>
                Save
            </Button>
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
    product_image: {
        width: 100,
        height: 100,
    }
});