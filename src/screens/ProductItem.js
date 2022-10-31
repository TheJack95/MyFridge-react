import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View, Animated, I18nManager} from 'react-native';

import warning from '../assets/warning.png'
import error from '../assets/error.png'
import check from '../assets/check.png'
import {theme} from "../core/theme";
import {RectButton, Swipeable} from "react-native-gesture-handler";
import {RealmContext} from "../models";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductItem(props) {
    const {_id, foodName, imageUrl, expirationDate} = props.item;
    const {useRealm} = RealmContext;
    const realm = useRealm();
    let swipeableRow: Swipeable;

    const getDate = () => {
        const date = new Date(expirationDate);
        return date.toLocaleDateString();
    }

    const getImage = () => {
		if(imageUrl)
	   		return require('../assets/foods/cake-small.png');
		
		return require('../assets/foods/fish-small.png');
    }

    const isNearExpirationDate = () => {
        const today = new Date();
        const date = new Date(expirationDate);
        if(date <= today)
            return error;
        const diffTime = Math.abs(date, today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays <= 5)
            return warning;
        return check;
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
                <Image source={getImage()} />
                <View style={styles.product_detail}>
                    <View style={styles.product_detail_header}>
                        <Text style={styles.product_name} numberOfLines={2} ellipsizeMode='tail'>
                            {foodName}
                        </Text>
                        <Image style={styles.product_favorite} source={isNearExpirationDate()} />
                    </View>
                    <View style={styles.product_detail_footer}>
                        <View style={styles.product_exp_date_container}>
                            <Text style={styles.product_expiration_date}>
                                Expiration date: {getDate()}
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
    product_detail: {
        justifyContent: 'space-around',
        marginLeft: 10,
        flexDirection: 'column',
        flex: 1,
    },
    product_detail_header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    product_name: {
        color: theme.colors.text,
        fontSize: 20,
        width: 180,
    },
    product_favorite: {
        width: 30,
        height: 30,
    },
    product_detail_footer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    product_exp_date_container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    product_expiration_date: {
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
})