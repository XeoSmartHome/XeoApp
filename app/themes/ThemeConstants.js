import {BOOTSTRAP_COLOR_DARK, BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_SECONDARY, XEO_BLUE} from "../constants";
import {t} from 'i18n-js'


export const ThemeConstants = {
	headerBackgroundColor: {
		light: XEO_BLUE,
		dark: BOOTSTRAP_COLOR_SECONDARY
	},
	headerTextColor: {
		light: BOOTSTRAP_COLOR_LIGHT,
		dark: BOOTSTRAP_COLOR_LIGHT
	},
	screenBackgroundColor: {
		light: BOOTSTRAP_COLOR_LIGHT,
		dark: BOOTSTRAP_COLOR_DARK
	},
	textColor: {
		light: '#000000',
		dark: BOOTSTRAP_COLOR_LIGHT
	},
	buttonDisabledOpacity: {
		light: 0.5,
		dark: 0.5
	}

};

export const availableThemes = ['light', 'dark'];
export const defaultTheme = 'light';
