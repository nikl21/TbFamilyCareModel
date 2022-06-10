import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import * as resources from './resources';
import english from './resources/en';
import hindi from './resources/hi';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english, //changed here
    },
    hi: {
      translation: hindi, //changed here
    },
  },
  lng: 'en',
});

export default i18n;
