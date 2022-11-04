import React from 'react'
import {FlatList, Image, StyleSheet, TouchableOpacity, View, Modal} from "react-native";
import {IMAGES, IMAGE_NAMES} from "../constants/images";
import theme from "../core/theme";
import i18n from "../core/translations";
import Header from "../components/Header";
import Button from "../components/Button";

export default function ImageSelection({onImgSelection, setModalVisible, modalVisible}) {

    const getImage = (img) => {
        return IMAGES[img];
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Header fontSize={15} color={theme.colors.primary}>{i18n.t('changeImage')}</Header>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Header color={theme.colors.primary}>{i18n.t('selectImage')}</Header>
                    <FlatList
                        data={IMAGE_NAMES}
                        renderItem={({item}) =>
                            <TouchableOpacity onPress={() => onImgSelection(item)}>
                                <Image source={getImage(item)} style={styles.imageListItem} />
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item}
                        numColumns={3}
                    />
                    <Button style={styles.button} mode="contained" onPress={() => setModalVisible(false)}>
                        {i18n.t('close')}
                    </Button>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    productImage: {
        width: 100,
        height: 100,
    },
    imageListItem: {
        width: 70,
        height: 70,
        margin: 10
    },
    modalView: {
        margin: 20,
        marginTop: 100,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginTop: 30
    }
});