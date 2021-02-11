import React, {Component} from "react";
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
// noinspection ES6CheckImport
import {t} from "i18n-js";
import {AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';


const SettingsOption = ({title, icon, onPress, theme}) => {
	return (
		<View style={styles.row}>
			<TouchableOpacity style={{flexDirection: 'row'}}
							  onPress={onPress}
			>
				{icon}
				<Text style={[styles.button_text, {
					color: theme.textColor
				}]}>
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	)
};


export default class SettingsScreen extends Component {

	constructor() {
		super();
	}

	render() {
		const {mode, theme, setTheme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<SettingsOption
					theme={theme}
					title={t('settings.account')}
					icon={<Icon
						name='account-circle-outline'
						type='material-community'
						size={25}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('account_settings')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={'Rooms'}
					icon={<FontAwesome5
						name="home"
						size={25}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('rooms_settings')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={t('settings.notifications')}
					icon={<Icon
						name='notifications-none'
						type='ionicons'
						size={26}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('notifications_settings')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={t('settings.security')}
					icon={<Icon
						name='security'
						type='material-community'
						size={26}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('security')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={t('settings.language')}
					icon={<Icon
						name='language'
						type='ionicons'
						size={26}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('language_settings')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={t('settings.theme')}
					icon={<Ionicons
						name="ios-color-palette"
						size={26}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('theme_settings')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={'Animations'}
					icon={<MaterialCommunityIcons
						name="animation"
						size={26}
						color={theme.textColor}/>}
					onPress={() => {
						this.props.navigation.navigate('animations_settings')
					}}
				/>

				<SettingsOption
					theme={theme}
					title={t('settings.help')}
					icon={<Icon
						name='help-circle'
						type='feather'
						size={26}
						color={theme.textColor}
					/>}
					onPress={() => {
						this.props.navigation.navigate('help')
					}}
				/>

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
	button_text: {
		fontSize: 20,
		marginLeft: 8
	}
});
