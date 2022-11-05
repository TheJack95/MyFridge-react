import React from 'react'
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

export default function ProductsList({navigation}) {
    const {useQuery} = RealmContext;
    const items = useQuery(Food);

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
        </View>;
    }

    return (
        <View style={commonStyles.container}>
            { items.length === 0 && renderNoItems()}
            { items.length > 0 &&
                <View style={commonStyles.content}>
                    <FlashList
                        data={items}
                        renderItem={({item}) =>
                            <ProductItem item={item}/>
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
    }
})


