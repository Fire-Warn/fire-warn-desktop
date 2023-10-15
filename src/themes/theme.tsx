import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import merge from 'lodash/merge';

import { shadows } from './shadows';

export const colors = {
	strokes: '#B3B3B3',
	lightPrimary: '#EEF4F5',
	lightSecondary: '#FFEFE7',
};

const themeOptions: ThemeOptions = {
	palette: {
		primary: { main: '#0A6672', contrastText: '#ffffff' },
		secondary: { main: '#FF5D00', contrastText: '#ffffff' },
		background: { default: '#f4f5f7', paper: '#ffffff' },
		text: { primary: '#253858', secondary: '#68758B' },
		action: { active: '#6b778c' },
		success: { main: '#237680', contrastText: '#ffffff', light: '#EDF7ED' },
		warning: { main: '#FF7D34', contrastText: '#ffffff' },
		error: { main: '#FF5D01', contrastText: '#ffffff' },
		grey: {
			'50': '#BDBDBD',
			'300': '#E0E0E0',
			'500': '#D0D4DB',
			'700': '#DFDFDF',
			'800': '#F4F5F7',
		},
	},
	shadows: shadows,
	direction: 'ltr',
	shape: { borderRadius: 4 },
	typography: {
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
		button: { fontWeight: 600 },
		h1: { fontWeight: 600, fontSize: '3.5rem' },
		h2: { fontWeight: 600, fontSize: '3rem' },
		h3: { fontWeight: 600, fontSize: '2.25rem' },
		h4: { fontWeight: 600, fontSize: '2rem' },
		h5: { fontWeight: 600, fontSize: '1.5rem' },
		h6: { fontWeight: 600, fontSize: '1.125rem' },
		subtitle1: { fontSize: '14px' },
		subtitle2: { fontSize: '12px' },
		overline: { fontWeight: 600 },
	},
};

export default responsiveFontSizes(createTheme(merge({ colors }, themeOptions)));
