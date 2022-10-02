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

    getDate(dateString) {
        const date = new Date(dateString);
        // return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();//format: d-m-y;
        return date.toLocaleDateString();
    }

    getImage(imageName) {
		if(imageName)
	   		return require('../assets/foods/cake-small.png');
		
		return require('../assets/foods/fish-small.png');
    }

    isExpired() {
        return new Date(this.props.expirationDate) <= new Date();
    }

    render() {
        return (
            <View style={styles.product}>
                <Image source={this.getImage(this.props.imageUrl)} />
                <View style={styles.product_detail}>
                    <View style={styles.product_detail_header}>
                        <Text style={styles.product_name} numberOfLines={2} ellipsizeMode='tail'>
                            {this.props.name}
                        </Text>
                        <Image style={styles.product_favorite} source={this.isExpired() ? error : warning} />
                    </View>
                    <View style={styles.product_detail_footer}>
                        <View style={styles.product_exp_date_container}>
                            <Text style={styles.product_expiration_date}>
                                Expiration date: {this.getDate(this.props.expirationDate)}
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