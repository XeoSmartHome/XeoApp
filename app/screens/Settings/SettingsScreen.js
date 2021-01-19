import React, {Component} from "react";
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
// noinspection ES6CheckImport
import {t} from "i18n-js";
import {AntDesign, FontAwesome5, Ionicons} from '@expo/vector-icons';


export default class SettingsScreen extends Component{

	constructor() {
		super();
	}

	render(){
		const {mode, theme, setTheme} = this.props.screenProps;
		return(
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('account_settings') } }
					>
						<Icon
							name='account-circle-outline'
							type='material-community'
							size={25}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{t('settings.account')}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
									  onPress={ () => { this.props.navigation.navigate('rooms_settings') } }
					>
						<FontAwesome5
							name="home"
							size={25}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{/*t('settings.account')*/}
							Rooms
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('notifications_settings') } }
					>
						<Icon
							name='notifications-none'
							type='ionicons'
							size={26}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{t('settings.notifications')}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
									  onPress={ () => { this.props.navigation.navigate('security') } }
					>
						<Icon
							name='security'
							type='material-community'
							size={26}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{t('settings.security')}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('language_settings') } }
					>
						<Icon
							name='language'
							type='ionicons'
							size={26}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{t('settings.language')}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('theme_settings') } }
					>
						<Ionicons
							name="ios-color-palette"
							size={26}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{t('settings.theme')}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
									  onPress={ () => { this.props.navigation.navigate('help') } }
					>
						<Icon
							name='help-circle'
							type='feather'
							size={26}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							{t('settings.help')}
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	row: {
		//borderBottomWidth: 2,
		//borderColor: BOOTSTRAP_COLOR_DARK,
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	button_text:{
		fontSize: 20,
		marginLeft: 8
	}
});
