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
import {NavigationActions, StackActions} from 'react-navigation';
import I18n from 'i18n-js'
import {API_GET_USER_PROFILE, API_LOGOUT} from "../../../api/api_routes_v_1.0.0.0";
import {apiGetRequest, apiPostRequest} from "../../../api/requests";


const t = (key) => I18n.t('account_settings.' + key);


export default class AccountSettingsScreen extends Component {
	constructor() {
		super();
		this.state = {
			user_first_name: '',
			user_last_name: '',
			user_email: '',
			user_phone_number: ''
		};
	}

	componentDidMount() {
		this.loadUserProfile();
	}

	loadUserProfile() {
		apiGetRequest(API_GET_USER_PROFILE).then((response) => {
			this.setState({
				first_name: response.first_name,
				last_name: response.last_name,
				email: response.email
			});
		});
	}


	signOut() {
		apiPostRequest(API_LOGOUT).then((response) => {
			if (response.status === 200) {
				const resetAction = StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({routeName: 'login'})],
				});
				this.props.navigation.dispatch(resetAction);
			}
		}).catch((error) => {
			console.warn(error);
		});
	}

	onSignOutButtonPress() {
		this.signOut();
	}

	onSwitchAccountButtonPress() {
		this.props.navigation.navigate('');
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
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
						{t('user')}: {this.state.first_name} {this.state.last_name}
					</Text>
				</View>

				<View style={styles.row}>
					<Text
						style={[styles.row_text, {
							color: theme.textColor
						}]}
					>
						{t('email')}: {this.state.email}
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
							onPress={() => this.onSignOutButtonPress()}
						>
							{t('sign_out')}
						</Text>
					</TouchableOpacity>

					{/*<TouchableOpacity
						style={{
							marginVertical: 8
						}}
						onPress={() => this.onSwitchAccountButtonPress()}
					>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 20
							}}
						>
							{t('switch_account')}
						</Text>
					</TouchableOpacity>*/}

				</View>
			</ScrollView>
		)

	}

}


const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
	},
	row_text: {
		fontSize: 20,
	}
});
