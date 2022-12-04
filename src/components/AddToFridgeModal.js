import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import Header from "./Header";
import {Dialog, Portal} from "react-native-paper";
import theme, {commonStyles} from "../core/theme";
import DatePicker from "react-native-date-picker";
import i18n from "../core/translations";
import Button from "./Button";

export default function AddToFridgeModal({modalOpen, onDismiss, onAddToMyFridge}) {

    const [date, setDate] = useState(new Date());


    const onDateChange = (selectedDate) => {
        setDate(new Date(selectedDate));
    }


    return <Portal>
        <Dialog
            visible={modalOpen}
            onDismiss={onDismiss}
            dismissable
            style={commonStyles.modalView}
        >
            <Dialog.Title>
                <Header
                    fontSize={21}
                    color={theme.colors.primary}
                >{i18n.t('expirationDate')}</Header>
            </Dialog.Title>
            <Dialog.Content>
                <DatePicker
                    date={date}
                    onDateChange={onDateChange}
                    androidVariant='iosClone'
                    minimumDate={new Date()}
                    mode="date"
                    locale={i18n.locale}
                    fadeToColor={theme.colors.primaryContainer}
                    theme="light"
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button style={styles.saveButton} mode="contained" onPress={() => onAddToMyFridge(date)}>
                    {i18n.t('save')}
                </Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
}

const styles = StyleSheet.create({
    saveButton: {
        marginTop: 10,
        backgroundColor: theme.colors.onPrimary,
        width: '50%'
    }
})
