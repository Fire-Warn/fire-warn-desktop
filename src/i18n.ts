import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enums from './locales/ua/enums.json';
import components from './locales/ua/components.json';
import login from './locales/ua/pages/auth/login.json';
import usersPage from './locales/ua/pages/usersPage.json';

export enum Language {
	UA = 'ua',
}

export const resources: Record<Language, any> = {
	[Language.UA]: {
		login,
		usersPage,
		enums,
		components,
	},
};

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		lng: Language.UA,
		ns: ['login', 'usersPage', 'enums', 'components'],
		interpolation: {
			escapeValue: false,
		},
		react: {
			transSupportBasicHtmlNodes: true,
		},
		resources,
	});

export default i18n;
