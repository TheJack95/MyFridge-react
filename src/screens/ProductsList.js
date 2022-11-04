import React from 'react'
import ProductItem from './ProductItem'
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../components/Header";
import theme, {commonStyles} from "../core/theme";
import {RealmContext} from "../models";
import {Food} from "../models/Food";
import Paragraph from "../components/Paragraph";
import Logo from "../components/Logo";
import i18n from "../core/translations";
import TopToolbar from "../components/TopToolbar";
import {Searchbar} from "react-native-paper";

export default function ProductsList({navigation}) {
    const {useQuery} = RealmContext;
    const items = useQuery(Food);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchBarOpen, setSearchBarOpen] = React.useState(false);
    const [itemsSearched, setItemsSearched] = React.useState(items);

    const onChangeSearch = (query) => {
        if(query.length === 0)  {
            setItemsSearched(items);
        } else {
            setSearchQuery(query);
            const result = items.find(item => item.foodName.includes(query));
            setItemsSearched(result);
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

    const onPlusPress = () => {
        navigation.navigate('NewProduct');
    }

    const onScanPress  = () => {
        navigation.navigate('BarcodeScanner');
    }

    const renderNoItems = () => {
        return <View style={[commonStyles.content, styles.noItems]}>
            <Logo/>
            <Header color={theme.colors.onBackground}>{i18n.t('noItems')}</Header>
            <Paragraph>{i18n.t('paragraph1')}</Paragraph>
            <Paragraph>{i18n.t('paragraph2')}</Paragraph>
        </View>;
    }

    return (
        <View style={commonStyles.container}>
            <TopToolbar
                title={i18n.t('appName')}
                rightIcon='magnify'
                rightIconPress={() => setSearchBarOpen(!searchBarOpen)}
            />
            { searchBarOpen &&
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            }
            { items.length === 0 && renderNoItems()}
            { items.length > 0 &&
                <View style={commonStyles.content}>
                    <FlatList
                        data={itemsSearched}
                        renderItem={({item}) =>
                            <ProductItem item={item}/>
                        }
                        ItemSeparatorComponent={renderSeparator}
                        keyExtractor={item => item._id.toString()}
                        showsVerticalScrollIndicator
                    />
                </View>
            }
            <View style={commonStyles.bottomBarContainer}>
                <TouchableOpacity
                    onPress={onScanPress} style={commonStyles.iconContainer}>
                    <MaterialCommunityIcons name="barcode-scan" size={40} color={theme.colors.onPrimary} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPlusPress} style={commonStyles.iconContainer}>
                    <AntDesign name="pluscircleo" size={40} color={theme.colors.onPrimary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    noItems: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})


