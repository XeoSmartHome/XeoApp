import React, {Component} from "react";
import {
	Image,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Button,
	View,
	ScrollView
} from "react-native";
import {BOOTSTRAP_COLOR_DARK} from "../../../constants";
import { NavigationActions, StackActions } from 'react-navigation';
import I18n from 'i18n-js'


const t = (key) => I18n.t('account_settings.' + key);


export default class AccountSettingsScreen extends Component{
	constructor() {
		super();
		this.state = {
			user_first_name: '',
			user_last_name: '',
			user_email: '',
			user_phone_number: ''
		};
		this.loadUserProfile();
	}

	signOut(){
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'login' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	render(){
		const {theme} = this.props.screenProps;
		return(
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: theme.screenBackgroundColor,
					padding: '3%'
				}}
			>

				<View style={styles.row}>
					<Text
						style={[styles.row_text, {
							color: theme.textColor
						}]}
					>
						{ t('user') }: {this.state.first_name} {this.state.last_name}
					</Text>
				</View>

				<View style={styles.row}>
					<Text
						style={[styles.row_text, {
							color: theme.textColor
						}]}
					>
						{ t('email') }: {this.state.email}
					</Text>
				</View>

				<View
					style={{
						borderTopColor: theme.textColor,
						borderTopWidth: 2,
						paddingTop: 8,
						marginTop: 8,
					}}
				>
					<TouchableOpacity
						style={{
							marginVertical: 8,
						}}
					>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 20
							}}
							onPress={ () => this.signOut() }
						>
							{ t('sign_out') }
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							marginVertical: 8
						}}
						onPress={ () => {} }
					>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 20
							}}
						>
							{ t('switch_account') }
						</Text>
					</TouchableOpacity>

				</View>
			</ScrollView>
		)

	}

	loadUserProfile(){
		fetch('https://dashboard.xeosmarthome.com/api/user_profile', {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({ first_name: response.first_name});
				this.setState({ last_name: response.last_name});
				this.setState({ email: response.email});
			}
		).catch((error) => {
			alert(error)
		})
	}
}


const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
	},
	row_text:{
		fontSize: 20,
	}
});
