import React from 'react';
import {availableThemes, defaultTheme, ThemeConstants} from "./ThemeConstants";
import AsyncStorage from "@react-native-community/async-storage";


export const ThemeContext = React.createContext(null);


const getTheme = (mode: string) => {
	let Theme = {};
	for (let key in ThemeConstants) {
		Theme[key] = ThemeConstants[key][mode];
	}
	return Theme;
};


export default class ThemeProvider extends React.Component {
	constructor() {
		super();
		AsyncStorage.getItem('theme_mode').then(
			(value) => this.setTheme(value)
		).catch( (error) => {

		});
	}

	state = {
		mode: '',
		theme: {}
	};

	setTheme = async (mode) => {
		if(!availableThemes.includes(mode))
			mode = defaultTheme;

		this.setState({
			mode: mode,
			theme: getTheme(mode),
		});

		AsyncStorage.setItem('theme_mode', mode).catch( (error) => {

		});
	};

	render() {
		return (
			<ThemeContext.Provider
				value={{
					mode: this.state.mode,
					theme: this.state.theme,
					setTheme: this.setTheme,
				}}
			>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}
