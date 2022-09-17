import React, {useCallback, useState} from 'react';
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, StyleSheet, View} from "react-native";
import TaskContext, {Food} from '../models/Food';

import demoProduct from '../assets/foods/cake.png'
import {theme} from "../core/theme";

export default function NewProduct({navigation}) {
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())

    const {useRealm, useQuery, useObject} = TaskContext;
    const realm = useRealm();
    const handleAddFood = useCallback(
        (): void => {
            realm.write(() => {
                realm.create('Food', Food.generate(name, date, '../assets/foods/cake.png'));
            });
        },
        [realm],
    );

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
                returnKeyType="next"
                onChangeText={setName}
                value={name}
            />
            <Header fontSize={21}>Expiration Date</Header>
            <View style={styles.container}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={onDateChange}
                    display="spinner"
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
    },
    product_image: {
        width: 100,
        height: 100,
    }
});