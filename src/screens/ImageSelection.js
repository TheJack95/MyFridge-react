import React from 'react'
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {IMAGES, IMAGE_NAMES} from "../constants/images";
import {Modal} from "react-native-web";

export default function ImageSelection({onImgSelection, setModalVisible, modalVisible}) {

    const renderSeparator = () => {
        return ( <View style={{height: "100%"}} /> );
    };

    const getImage = (img) => {
        return IMAGES[img];
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalView}>
                <FlatList
                    data={IMAGE_NAMES}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={onImgSelection(item)}>
                            <Image source={getImage(item)} style={styles.productImage} />
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={item => item}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    content: {
        height: 100,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    modalView: {
        margin: 20,
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
});