import React, {useCallback, useState} from 'react';
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, StyleSheet, Text, View, Dimensions} from "react-native";
import { Food } from "../models/Food";
import { RealmContext } from "../models";

import demoProduct from '../assets/foods/cake.png'
import {theme} from "../core/theme";

export default function NewProduct({navigation}) {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());

    const {useRealm} = RealmContext;
    const realm = useRealm();
    const handleAddFood = useCallback(
        () => {
            realm.write(() => {
                console.log(name)
                realm.create('Food', Food.generate(name, date, 'cake'));
                navigation.goBack();
            });
        },
        [realm],
    );

    const onNameChange = (event, newName) => {
        setName(newName);
    }

    const onDateChange = (event, newDate) => {
        setDate(new Date(newDate));
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
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
                value={name}
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