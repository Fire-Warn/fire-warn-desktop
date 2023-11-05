import { enUS as dataGridEnUS, frFR as dataGridFrFR } from '@mui/x-data-grid';
import { enUS, frFR } from '@mui/material/locale';
import dayjsFrCa from 'dayjs/locale/fr-ca';
import dayjsEnCa from 'dayjs/locale/en-ca';
import { StripeElementLocale } from '@stripe/stripe-js/types/stripe-js/elements-group';

import { Language } from 'i18n';
import { OrganizationLanguage } from 'clients/CoreService';

export const muiUiLocales: Record<Language, typeof enUS> = {
	[Language.EN]: enUS,
	[Language.FR]: frFR,
};

export const dataGridLocales: Record<Language, typeof dataGridEnUS> = {
	[Language.EN]: dataGridEnUS,
	[Language.FR]: dataGridFrFR,
};

export const dayjsLocales: Record<Language, typeof dayjsEnCa> = {
	[Language.EN]: dayjsEnCa,
	[Language.FR]: dayjsFrCa,
};

export const jitsiLanguages: Record<Language, string> = {
	[Language.EN]: 'en',
	[Language.FR]: 'fr',
};

export const languageFromOrganizationLanguage: Record<OrganizationLanguage, Language> = {
	[OrganizationLanguage.EN]: Language.EN,
	[OrganizationLanguage.FR]: Language.FR,
};

export const stripeLanguages: Record<Language, StripeElementLocale> = {
	[Language.EN]: 'en-CA',
	[Language.FR]: 'fr-CA',
};
