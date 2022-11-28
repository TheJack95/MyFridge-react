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
import {Modal, Portal, Searchbar} from "react-native-paper";
import Button from "../components/Button";
import DatePicker from "react-native-date-picker";

export default function ProductsList({route}) {
    const {useQuery, useRealm} = RealmContext;
    const realm = useRealm();
    let items = [];
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [itemToAdd, setItemToAdd] = useState();

    if (route.name === 'ProductsList')
        items = useQuery(Food).filtered('inFridge == true');
    else
        items = useQuery(Food);

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

    const onDateChange = (selectedDate) => {
        setDate(new Date(selectedDate));
    }

    const onAddToMyFridge = () => {
        setModalOpen(false);
        realm.write(() => {
            itemToAdd.inFridge = true;
            itemToAdd.expirationDate = date;
        });
    }

    const renderNoItems = () => {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Logo/>
            <Header color={theme.colors.primaryContainer}>{i18n.t('noItems')}</Header>
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
            {filteredDataSource.length === 0 && renderNoItems()}
            {filteredDataSource.length > 0 &&
                <View style={commonStyles.content}>
                    <FlashList
                        data={filteredDataSource}
                        renderItem={({item}) =>
                            <ProductItem
                                item={item}
                                renderMoreInfo={route.name === 'ProductsList'}
                                onAddToMyFridge={() => {
                                    setItemToAdd(item);
                                    setModalOpen(true);
                                }}
                            />
                        }
                        keyExtractor={item => item._id.toString()}
                        estimatedItemSize={100}
                        estimatedListSize={{height: Screen.height, width: Screen.width}}
                    />
                </View>
            }
            <Portal>
                <Modal
                    visible={modalOpen}
                    onDismiss={() => setModalOpen(false)}
                    dismissable
                    theme={theme}
                    contentContainerStyle={commonStyles.modalView}
                >
                    <Header
                        fontSize={21}
                        color={theme.colors.primary}
                    >{i18n.t('expirationDate')}</Header>
                    <DatePicker
                        date={date}
                        mode="date"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                        androidVariant='iosClone'
                        locale={i18n.locale}
                    />
                    <Button style={styles.saveButton} mode="contained" onPress={onAddToMyFridge}>
                        {i18n.t('save')}
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    noItems: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbar: {
        zIndex: 1,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: theme.colors.onPrimary,
        width: '50%'
    }
})


