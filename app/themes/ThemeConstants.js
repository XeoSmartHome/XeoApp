import I18n from 'i18n-js';
import {XEO_BLUE} from "../constants";
import {
	BOOTSTRAP_COLOR_DANGER,
	BOOTSTRAP_COLOR_DARK,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	BOOTSTRAP_COLOR_SECONDARY,
	BOOTSTRAP_COLOR_SUCCESS,
	BOOTSTRAP_COLOR_WARNING
} from "./bootstrap_colors";


export const ThemeConstants = {
	headerBackgroundColor: {
		light: XEO_BLUE,
		dark: BOOTSTRAP_COLOR_SECONDARY,
		pink: '#CA278C'
	},
	headerTextColor: {
		light: BOOTSTRAP_COLOR_LIGHT,
		dark: BOOTSTRAP_COLOR_LIGHT,
		pink: '#FFE9E8'
	},
	screenBackgroundColor: {
		light: BOOTSTRAP_COLOR_LIGHT,
		dark: BOOTSTRAP_COLOR_DARK,
		pink: '#9C1C6B'
	},
	textColor: {
		light: '#000000',
		dark: BOOTSTRAP_COLOR_LIGHT,
		pink: '#FFE9E8'
	},
	placeholderTextColor: {
		light: BOOTSTRAP_COLOR_SECONDARY,
		dark: BOOTSTRAP_COLOR_SECONDARY,
		pink: '#E47297'
	},
	buttonDisabledOpacity: {
		light: 0.5,
		dark: 0.5,
		pink: 0.5
	},
	primaryColor: {
		light: BOOTSTRAP_COLOR_PRIMARY,
		dark: BOOTSTRAP_COLOR_PRIMARY,
		pink: '#CA278C'
	},
	secondaryColor: {
		light: BOOTSTRAP_COLOR_SECONDARY,
		dark: BOOTSTRAP_COLOR_SECONDARY,
		pink: '#E47297'
	},
	successColor: {
		light: BOOTSTRAP_COLOR_SUCCESS,
		dark: BOOTSTRAP_COLOR_SUCCESS,
		pink: BOOTSTRAP_COLOR_SUCCESS
	},
	dangerColor: {
		light: BOOTSTRAP_COLOR_DANGER,
		dark: BOOTSTRAP_COLOR_DANGER,
		pink: BOOTSTRAP_COLOR_DANGER
	},
	warningColor: {
		light: BOOTSTRAP_COLOR_WARNING,
		dark: BOOTSTRAP_COLOR_WARNING,
		pink: BOOTSTRAP_COLOR_WARNING
	},
	lightColor: {
		light: BOOTSTRAP_COLOR_LIGHT,
		dark: BOOTSTRAP_COLOR_LIGHT,
		pink: BOOTSTRAP_COLOR_LIGHT
	}

};

export const availableThemes = ['light', 'dark', 'pink'];
export const defaultTheme = 'light';
