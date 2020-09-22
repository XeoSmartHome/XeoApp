import React, {Component} from "react";
import {AsyncStorage, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import I18n, {t} from 'i18n-js';
import * as Localization from "expo-localization";
import {Icon} from "react-native-elements";


export default class LanguageSettingsScreen extends Component{
	constructor() {
		super();
		this.state = {
			locale: '',
			languages: [],
		};
	}

	getLanguages(){
		return Object.keys(I18n.translations).map((locale) => {
			return(
				{
					locale: locale,
					name: I18n.translations[locale].name
				}
			)
		})
	}

	componentDidMount() {
		this.setState({
			locale: I18n.currentLocale(),
			languages: this.getLanguages()
		})
	}

	on_language_selected(locale){
		I18n.locale = locale;
		this.setState({
			locale: locale
		});
		AsyncStorage.setItem('locale', locale).catch( (error) => {
			console.warn(error);
		});
	}

	render() {
		return(
			<ScrollView
				style={styles.page}
			>
				{
					this.state.languages.map( (item) => {
						return(
							<TouchableOpacity
								key={'lang_' + item.locale}
								style={styles.row}
								onPress={ () => {
									this.on_language_selected(item.locale)
								}}
							>
								<Text
									style={styles.button_text}
								>
									{
										item.name
									}
								</Text>
								{
									this.state.locale === item.locale ?
										<Icon name='check' style={{flex: 1}}/>
										:
										null
								}
							</TouchableOpacity>
						)
					})
				}
			</ScrollView>
		)
	}

}

const styles = StyleSheet.create({
	page: {
		paddingTop: 10
	},
	row: {
		paddingVertical: '3%',
		paddingHorizontal: '3%',
		width: '94%',
		marginHorizontal: '3%',
		flexDirection: 'row'
	},
	button_text:{
		flex: 1,
		fontSize: 18
	}
});

