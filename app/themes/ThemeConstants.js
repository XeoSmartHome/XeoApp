import {
	BOOTSTRAP_COLOR_DANGER,
	BOOTSTRAP_COLOR_DARK,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	BOOTSTRAP_COLOR_SECONDARY, BOOTSTRAP_COLOR_SUCCESS, BOOTSTRAP_COLOR_WARNING,
	XEO_BLUE
} from "../constants";
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
	placeholderTextColor: {
		light: BOOTSTRAP_COLOR_SECONDARY,
		dark: BOOTSTRAP_COLOR_SECONDARY
	},
	buttonDisabledOpacity: {
		light: 0.5,
		dark: 0.5
	},
	primaryColor: {
		light: BOOTSTRAP_COLOR_PRIMARY,
		dark: BOOTSTRAP_COLOR_PRIMARY
	},
	secondaryColor: {
		light: BOOTSTRAP_COLOR_SECONDARY,
		dark: BOOTSTRAP_COLOR_SECONDARY
	},
	successColor: {
		light: BOOTSTRAP_COLOR_SUCCESS,
		dark: BOOTSTRAP_COLOR_SUCCESS
	},
	dangerColor: {
		light: BOOTSTRAP_COLOR_DANGER,
		dark: BOOTSTRAP_COLOR_DANGER
	},
	warningColor: {
		light: BOOTSTRAP_COLOR_WARNING,
		dark: BOOTSTRAP_COLOR_WARNING
	},
	lightColor: {
		light: BOOTSTRAP_COLOR_LIGHT,
		dark: BOOTSTRAP_COLOR_LIGHT
	}

};

export const availableThemes = ['light', 'dark'];
export const defaultTheme = 'light';
