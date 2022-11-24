import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
    en: {
        appName: 'My Fridge',
        noItems: 'No items added',
        paragraph1: 'Scan a product barcode',
        paragraph2: 'Add one by clicking the "+" button',
        paragraph3: 'Or from the page "My products"',
        expirationDate: 'Expiration date',
        productName: 'Product name',
        addNewProduct:'New product',
        scanProduct: 'Scan Product',
        cancel: 'Cancel',
        close: 'Close',
        save: 'Save',
        name: 'Name',
        itemNotFound: 'Item not found. Retry or add it manually.',
        selectImage: 'Select image',
        changeImage: 'Change image',
        retry: 'Retry',
        settings: 'Settings',
        search: 'Search',
        home: 'Home',
        myProducts: 'My products',
        addToFridge: 'Add to My Fridge',
        nearExpiration: ' will expire at ',
        requestCamera: 'Requesting for camera permission',
        noCameraAccess: 'No access to camera',
        notifications: 'Notifications',
        notificationSettingText: 'Notifiche per i prodotti in scadenza',
        notificationSettingText2: 'Scegli quanti giorni prima della scadenza vuoi ricevere la notifica',
        firstNotification: 'Days before expiration',
        secondNotifications: 'Second notification',
        language: 'Language',
    },
    it: {
        appName: 'Il Mio Frigo',
        noItems: 'Nessun articolo',
        paragraph1: 'Scansiona un codice a barre di un prodotto',
        paragraph2: 'Aggiungine uno facendo clic sul pulsante "+"',
        paragraph3: 'Oppure dalla pagina "I miei articoli"',
        expirationDate: 'Data di scadenza',
        productName: 'Nome del prodotto',
        addNewProduct:'Nuovo prodotto',
        scanProduct: 'Scansiona',
        cancel: 'Annulla',
        close: 'Chiudi',
        save: 'Salva',
        name: 'Nome',
        itemNotFound: 'Nessun prodotto trovato. Riprova o aggiungine uno manualmente.',
        selectImage: 'Seleziona immagine',
        changeImage: 'Cambia immagine',
        retry: 'Riprova',
        settings: 'Impostazioni',
        search: 'Cerca',
        home: 'Home',
        myProducts: 'I miei articoli',
        addToFridge: 'Aggiungi al mio frigo',
        nearExpiration: ' scade il giorno ',
        requestCamera: 'Richiesta di autorizzazione alla fotocamera',
        noCameraAccess: 'Nessun accesso alla fotocamera',
        notifications: 'Notifiche',
        notificationSettingText: 'Notifiche per i prodotti in scadenza',
        notificationSettingText2: 'Scegli quanti giorni prima della scadenza vuoi ricevere la notifica',
        firstNotification: 'Giorni prima della scandenza',
        secondNotification: 'Seconda notifica',
        language: 'Lingua',
    },
};
const i18n = new I18n(translations, {defaultLocale: 'en', locale: Localization.locale});
i18n.enableFallback = true;

export default i18n;