import React, {useEffect, useState} from 'react'
import ProductItem from './ProductItem'
import {StyleSheet, View} from 'react-native';
import Header from "../components/Header";
import theme, {commonStyles, Screen} from "../core/theme";
import {RealmContext} from "../models";
import {Food} from "../models/Food";
import Paragraph from "../components/Paragraph";
import Logo from "../components/Logo";
import i18n from "../core/translations";
import {FlashList} from "@shopify/flash-list";
import {Searchbar} from "react-native-paper";

export default function ProductsList({navigation, route}) {
    const realm = RealmContext.useRealm();
    let items = [];
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    if(route.name === 'ProductsList')
        items = realm.objects(Food).filtered('inFridge == true');
    else
        items = realm.objects(Food);

    useEffect(() => {
        setFilteredDataSource(items);
        setMasterDataSource(items);
    }, []);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.foodName
                    ? item.foodName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearchQuery(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearchQuery(text);
        }
    };

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#D8D8D8",
                }}
            />
        );
    };

    const renderNoItems = () => {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Logo/>
            <Header color={theme.colors.onBackground}>{i18n.t('noItems')}</Header>
            <Paragraph>{i18n.t('paragraph1')}</Paragraph>
            <Paragraph>{i18n.t('paragraph2')}</Paragraph>
            {route.name === 'ProductsList' && <Paragraph>{i18n.t('paragraph3')}</Paragraph>}
        </View>;
    }

    return (
        <View style={commonStyles.container}>
            <Searchbar
                placeholder={i18n.t('search')}
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchQuery}
                style={styles.searchbar}
            />
            { filteredDataSource.length === 0 && renderNoItems()}
            { filteredDataSource.length > 0 &&
                <View style={commonStyles.content}>
                    <FlashList
                        data={filteredDataSource}
                        renderItem={({item}) =>
                            <ProductItem item={item} renderMoreInfo={route.name === 'ProductsList'}/>
                        }
                        ItemSeparatorComponent={renderSeparator}
                        keyExtractor={item => item._id.toString()}
                        estimatedItemSize={100}
                        estimatedListSize={{height: Screen.height, width: Screen.width}}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    noItems: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbar: {
        zIndex:1
    }
})


