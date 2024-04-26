import I18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import pt from './pt.json';

I18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  resources: {
    en,
    pt,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default I18n;
