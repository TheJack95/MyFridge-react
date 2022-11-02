import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
    en: {
        appName: 'My Fridge',
        noItems: 'No items added',
        paragraph1: 'Scan a product barcode',
        paragraph2: 'Or add one by clicking the "+" button',
        expirationDate: 'Expiration date',
        productName: 'Product name',
        addNewProduct:'Add new product',
        scanProduct: 'Scan Product',
        cancel: 'Cancel',
        close: 'Close',
        save: 'Save',
        name: 'Name'
    },
    it: {
        appName: 'Il Mio Frigo',
        noItems: 'Nessun articolo',
        paragraph1: 'Scansiona un codice a barre di un prodotto',
        paragraph2: 'Oppure aggiungine uno facendo clic sul pulsante "+"',
        expirationDate: 'Data di scadenza',
        productName: 'Nome del prodotto',
        addNewProduct:'Aggiungi nuovo prodotto',
        scanProduct: 'Scansiona prodotto',
        cancel: 'Annulla',
        close: 'Chiudi',
        save: 'Salva',
        name: 'Nome'
    },
};
const i18n = new I18n(translations, {defaultLocale: 'en', locale: Localization.locale});
i18n.enableFallback = true;

export default i18n;