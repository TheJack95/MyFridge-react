import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, StatusBar, StyleSheet, View} from "react-native";
import {Food} from "../models/Food";
import {RealmContext} from "../models";
import demoProduct from '../assets/foods/healthy-food.png'
import theme, {commonStyles} from "../core/theme";
import {schedulePushNotification} from "../helpers/NotificationsHelper";
import i18n from "../core/translations";
import ImageSelection from "./ImageSelection";
import {IMAGES} from "../constants/images";
import TopToolbar from "../components/TopToolbar";

export default function NewProduct({navigation, route}) {
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if(route?.params?.name) {
            const {name, imgUrl} = route.params;
            setText(name);
            setImageUrl(imgUrl);
        }
    }, []);

    const handleAddFood = () => {
        let notificationDate = new Date(date);
        notificationDate.setHours(9, 0);
        schedulePushNotification(
            "Food notification", text +" in scadenza", notificationDate
        ).then(notificationId => {
            let food = Food.generate(text, date, imageUrl, imageName, notificationId);
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

    const onDateChange = (event, selectedDate) => {
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

    return (
        <View style={commonStyles.container}>
            <TopToolbar title={i18n.t('addNewProduct')} leftIcon='back' leftIconPress={navigation.goBack}/>
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
                    <DateTimePicker
                        value={date}
                        mode="date"
                        onChange={onDateChange}
                        display="spinner"
                        style={styles.datepicker}
                        minimumDate={new Date()}
                        textColor={theme.colors.onBackground}
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: 50,
    },
    datepicker: {
        width: 400,
        margin: 0,
        padding: 0,
        color: theme.colors.primary
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    button: {
        flex: 1,
        margin: 10,
    }
});