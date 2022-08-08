import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import warning from '../assets/warning.png'
import error from '../assets/error.png'

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}


export default class ProductItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.product}>
                <Image source={this.props.image} />
                <View style={styles.product_detail}>
                    <View style={styles.product_detail_header}>
                        <Text style={styles.product_name} numberOfLines={2} ellipsizeMode='tail'>
                            Fresh countryside chicken thigh ( pack of 4 )
                        </Text>
                        <Image style={styles.product_favorite} source={this.props.expired ? error : warning} />
                    </View>
                    <View style={styles.product_detail_footer}>
                        <View style={styles.product_exp_date_container}>
                            <Text style={styles.product_expiration_date}>
                                Expiration date: 28/11/2023
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
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
        color: '#4A4A4A',
        fontSize: 14,
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
        color: '#BABCBE',
        fontSize: 12,
    },
})