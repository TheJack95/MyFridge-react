import React, {useEffect, useState} from 'react'
import {ProductItem} from './ProductItem'
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from "../components/Header";
import theme, {commonStyles, Screen} from "../core/theme";
import Paragraph from "../components/Paragraph";
import Logo from "../components/Logo";
import i18n from "../core/translations";
import {FlashList} from "@shopify/flash-list";
import {Menu, Searchbar} from "react-native-paper";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const ProductsList = ({route, items, onToggleAddToMyFridge, onDeleteFood}) => {
    const [filteredDataSource, setFilteredDataSource] = useState(items);
    const [masterDataSource, setMasterDataSource] = useState(items);

    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [sortBy, setSortBy] = useState('expirationDate');

    useEffect(() => {
        if (route.name === 'ProductsList') {
            items = items.filtered('inFridge == true')
            setSortBy('expirationDate')
        } else {
            setSortBy('foodName')
        }
    }, []);

    useEffect(() => {
        const sorted = items.sorted(sortBy);
        setFilteredDataSource(sorted);
        setMasterDataSource(sorted);
    }, [sortBy]);


    const searchFilterFunction = (text) => {
        if (text) {
            const newData = items.filter(function (item) {
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

    const renderNoItems = () => {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Logo/>
            <Header color={theme.colors.primaryContainer}>{i18n.t('noItems')}</Header>
            <Paragraph>{i18n.t('paragraph1')}</Paragraph>
            <Paragraph>{i18n.t('paragraph2')}</Paragraph>
            {route.name === 'ProductsList' && <Paragraph>{i18n.t('paragraph3')}</Paragraph>}
        </View>;
    }

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const renderFilterIcon = () => {
        return <View style={styles.sortContainer}>
            <TouchableOpacity
                onPress={openMenu}>
                {sortBy === 'expirationDate' ?
                    <MaterialCommunityIcons name="sort-calendar-ascending" size={30} color={theme.colors.primary}/> :
                    <MaterialCommunityIcons name="sort-alphabetical-ascending" size={30} color={theme.colors.primary}/>
                }
            </TouchableOpacity>
        </View>
    }

    const onSortPress = (sortBy: string) => {
        setSortBy(sortBy);
        closeMenu();
    }

    return (
        <View style={commonStyles.container}>
            <View style={styles.searchbarContainer}>
                <Searchbar
                    placeholder={i18n.t('search')}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                {route.name === 'ProductsList' && (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={renderFilterIcon()}>
                        <Menu.Item onPress={() => onSortPress("expirationDate")} title="Order by expiration date"/>
                        <Menu.Item onPress={() => onSortPress('foodName')} title="Order by name"/>
                    </Menu>
                )}

            </View>
            {filteredDataSource.length === 0 && renderNoItems()}
            {filteredDataSource.length > 0 &&
                <View style={commonStyles.content}>
                    <FlashList
                        data={filteredDataSource}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                            <ProductItem
                                item={item}
                                renderMoreInfo={route.name === 'ProductsList'}
                                onAddToMyFridge={(date) => onToggleAddToMyFridge(item, date)}
                                onDelete={() => onDeleteFood(item)}
                            />
                        )}
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
    searchbarContainer: {
        zIndex: 1,
        marginVertical: 10,
        backgroundColor: theme.colors.secondaryContainer,
        flexDirection: "row",
    },
    searchbar: {
        flexGrow: 1,
        backgroundColor: theme.colors.secondaryContainer,
    },
    sortContainer: {
        margin: 10
    }
})


