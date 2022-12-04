import React from 'react';
import {Animated, Dimensions, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';

import theme from "../core/theme";
import {RectButton, Swipeable} from "react-native-gesture-handler";
import {RealmContext} from "../models";
import {IMAGES} from "../constants/images";
import i18n from "../core/translations";
import {removeNotification} from "../helpers/NotificationsHelper";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default function ProductItem(props) {
    const {foodName, imageUrl, imageName, expirationDate, notificationId, inFridge} = props.item;
    const {renderMoreInfo} = props;
    const {onAddToMyFridge} = props;
    const {useRealm} = RealmContext;
    const realm = useRealm();
    let swipeableRow: Swipeable;

    const getDate = () => {
        return expirationDate?.toLocaleDateString();
    }

    const getImage = () => {
        if (imageName && IMAGES[imageName])
            return IMAGES[imageName];

        if (imageUrl)
            return {uri: imageUrl};

        return require('../assets/foods/healthy-food.png');
    }

    const isNearExpirationDate = () => {
        const today = new Date();
        if (expirationDate <= today)
            return <AntDesign name="closecircle" size={30} color={theme.colors.errorIcon}/>;

        const diffTime = Math.abs(expirationDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 5)
            return <Entypo name="warning" size={30} color={theme.colors.warning}/>;

        return <AntDesign name="checkcircle" size={30} color={theme.colors.success}/>;
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
            <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
                <RectButton
                    style={[styles.rightAction, {backgroundColor: color}]}
                    onPress={doSwipeOperation}
                >
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const getRightActionText = () => {
        if(renderMoreInfo) {
            return i18n.t("remove");
        }
        return i18n.t("delete");
    }

    const renderRightActions = (
        progress: Animated.AnimatedInterpolation,
        _dragAnimatedValue: Animated.AnimatedInterpolation
    ) => (
        <View
            style={{
                marginLeft: -30,
                width: 110,
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            {renderRightAction(getRightActionText(), '#dd2c00', 64, progress)}
        </View>
    );

    const updateRef = (ref: Swipeable) => {
        swipeableRow = ref;
    };

    const doSwipeOperation = (direction) => {
        realm.write(() => {
            let food = realm.objectForPrimaryKey("Food", props.item._id);
            if (!renderMoreInfo) {
                realm.delete(food);
            } else {
                food.inFridge = false;
                food.expirationDate = null;
            }
        });
        removeNotification(notificationId).then(() => {})
            .catch(error => console.error(error));
    }

    const renderAction = () => {
        if (inFridge) {
            return <AntDesign name="check" size={30} color={theme.colors.success}/>;
        }
        return (
            <TouchableOpacity
                onPress={() => onAddToMyFridge()}>
                <AntDesign name="plussquare" size={30} color={theme.colors.primary}/>
            </TouchableOpacity>
        );
    }

    return (
        <Swipeable
            ref={updateRef}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={renderRightActions}
        >
            <View style={styles.product}>
                <Image source={getImage()} style={styles.productImage}/>
                <View style={styles.productDetail}>
                    <Text style={styles.productName} numberOfLines={2} ellipsizeMode='tail'>
                        {foodName}
                    </Text>
                    {renderMoreInfo &&
                        <Text style={styles.productExpirationDate}>
                            {i18n.t('expirationDate')}: {getDate()}
                        </Text>
                    }
                </View>
                <View>
                    {renderMoreInfo && isNearExpirationDate()}
                    {!renderMoreInfo && renderAction()}
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    product: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        flex: 1,
        margin: 10,
        borderRadius: 44 / 2,
        alignItems: "center",
    },
    productDetail: {
        flexGrow: 1,
        marginLeft: 20
    },
    productName: {
        color: theme.colors.text,
        fontSize: 20,
        width: 180,
    },
    productExpirationDate: {
        color: theme.colors.text,
        fontSize: 15,
    },
    leftAction: {
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
        marginVertical: 10,
    },
    productImage: {
        width: 50,
        height: 50,
    }
})
