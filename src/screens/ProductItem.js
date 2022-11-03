import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View, Animated, I18nManager} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {theme} from "../core/theme";
import {RectButton, Swipeable} from "react-native-gesture-handler";
import {RealmContext} from "../models";
import {IMAGES} from "../constants/images";
import i18n from "../core/translations";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductItem(props) {
    const {foodName, imageUrl, imageName, expirationDate} = props.item;
    const {useRealm} = RealmContext;
    const realm = useRealm();
    let swipeableRow: Swipeable;

    const getDate = () => {
        return expirationDate.toLocaleDateString();
    }

    const getImage = () => {
		if(imageName && IMAGES[imageName])
	   		return IMAGES[imageName];

        if(imageUrl)
            return {uri: imageUrl};
		
		return require('../assets/foods/healthy-food.png');
    }

    const isNearExpirationDate = () => {
        const today = new Date();
        if(expirationDate <= today)
            return <AntDesign name="closecircle" size={30} color={theme.colors.error} />;

        const diffTime = Math.abs(expirationDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays <= 5)
            return <Entypo name="warning" size={30} color={theme.colors.warning} />;

        return <AntDesign name="checkcircle" size={30} color={theme.colors.success} />;
    }

    const renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: Animated.AnimatedInterpolation
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]} >
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (
        progress: Animated.AnimatedInterpolation,
        _dragAnimatedValue: Animated.AnimatedInterpolation
    ) => (
        <View
            style={{
                width: 192,
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            {renderRightAction('Delete', '#dd2c00', 64, progress)}
        </View>
    );

    const updateRef = (ref: Swipeable) => {
        swipeableRow = ref;
    };

    const doSwipeOperation = (direction) => {
        realm.write(() => {
            realm.delete(props.item);
        });
    }

    return (
        <Swipeable
            ref={updateRef}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={renderRightActions}
            onSwipeableOpen={doSwipeOperation}
        >
            <View style={styles.product}>
                <Image source={getImage()} style={styles.productImage}/>
                <View style={styles.productDetail}>
                    <View style={styles.productDetailHeader}>
                        <Text style={styles.productName} numberOfLines={2} ellipsizeMode='tail'>
                            {foodName}
                        </Text>
                        {isNearExpirationDate()}
                    </View>
                    <View style={styles.productDetailFooter}>
                        <View style={styles.productExpDateContainer}>
                            <Text style={styles.productExpirationDate}>
                                {i18n.t('expirationDate')}: {getDate()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    product: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        flex: 1,
    },
    body: {
        flex: 1,
        height: Screen.height - 122,
    },
    productDetail: {
        justifyContent: 'space-around',
        marginLeft: 10,
        flexDirection: 'column',
        flex: 1,
    },
    productDetailHeader: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    productName: {
        color: theme.colors.text,
        fontSize: 20,
        width: 180,
    },
    productDetailFooter: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    productExpDateContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    productExpirationDate: {
        color: theme.colors.text,
        fontSize: 15,
    },
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    productImage: {
        width: 70,
        height: 70,
    }
})