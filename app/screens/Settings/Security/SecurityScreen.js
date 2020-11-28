import React, {Component} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// noinspection ES6CheckImport
import I18n from "i18n-js";


const t = (key) => I18n.t('security.' + key)


export default class SecurityScreen extends Component{
	constructor() {
		super();
	}

	render(){
		const {mode, theme, setTheme} = this.props.screenProps;
		return(
			<ScrollView style={{
				backgroundColor: theme.screenBackgroundColor,
				flex: 1,
			}}>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => { this.props.navigation.navigate('change_password') } }
				>
					<Text style={[styles.button_text, {
						color: theme.textColor
					}]}>
						{t('change_password')}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => { this.props.navigation.navigate('pin_settings') } }
				>
					<Text style={[styles.button_text, {
						color: theme.textColor
					}]}>
						{t('app_pin')}
					</Text>
				</TouchableOpacity>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	button_text:{
		fontSize: 20,
	}
});
