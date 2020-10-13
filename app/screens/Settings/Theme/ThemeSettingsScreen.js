import React from "react";
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {availableThemes, ThemeConstants} from "../../../themes/ThemeConstants";
// noinspection ES6CheckImport
import {t} from 'i18n-js'
import ThemeProvider from "../../../themes/ThemeProvider";


export default class ThemeSettingsScreen extends React.Component{
	constructor() {
		super();
		this.state = {
			themes: availableThemes
		};
	}

	render() {
		const {mode, theme, setTheme} = this.props.screenProps;
		return (
			<ScrollView
				style={[
					styles.page, {
						backgroundColor: theme.screenBackgroundColor
				}]}
			>
				{
					this.state.themes.map( (item) => {
						return(
							<TouchableOpacity
								key={'theme_' + item}
								style={styles.row}
								onPress={ () => {
									setTheme(item);
								}}
							>
								<Text
									style={[styles.button_text, {
										color: theme.textColor
									}]}
								>
									{ t('theme_settings.' + item) }
								</Text>
								{
									item === mode ?
										<Icon
											name='check'
											style={{flex: 1}}
											color={theme.textColor}
										/>
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
		paddingTop: 10,
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
