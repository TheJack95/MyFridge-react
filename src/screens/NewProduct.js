import React, {useState} from 'react';
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, StyleSheet, View} from "react-native";

import demoProduct from '../assets/foods/cake.png'

export default function HelloWorldApp ({ navigation }) {
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())

    const onSavePress = () => {

    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Add new product</Header>
            <Image style={styles.product_image} source={demoProduct} />
            <Header fontSize={21}>Product name</Header>
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
                    onChange={setDate}
                    display="spinner"
                />
            </View>
            <Button mode="contained" onPress={onSavePress}>
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