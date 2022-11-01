import React from 'react'
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {IMAGE_NAMES, IMAGES} from "../constants/images";

export default function ImageSelection({onImgSelection}) {

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: "100%",

                }}
            />
        );
    };

    const getImage = (img) => {
        return IMAGES[img];
    }

    return (
        <View style={styles.content}>
            <FlatList
                horizontal={true}
                data={IMAGE_NAMES}
                renderItem={({item}) =>
                    <TouchableOpacity onPress={onImgSelection(getImage(item))}>
                        <Image source={getImage(item)} style={styles.product_image} />
                    </TouchableOpacity>
                }
                ItemSeparatorComponent={renderSeparator}
                keyExtractor={item => item}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        height: 100,
    },
    product_image: {
        width: 100,
        height: 100,
    }
});