import React, {Component} from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
	ScrollView
} from "react-native";
import {NavigationActions, StackActions} from 'react-navigation';
import {API} from "../../../api/api";
import {translator} from "../../../lang/translator";


const t = translator('account_settings');

export default class AccountSettingsScreen extends Component {
	constructor() {
		super();
		this.state = {
			user_first_name: '',
			user_last_name: '',
			user_email: '',
			user_phone_number: ''
		};
		this.onSignOutButtonPress = this.onSignOutButtonPress.bind(this);
	}

	componentDidMount() {
		this.loadUserProfile();
	}

	loadUserProfileCallback(response) {
		this.setState({
			first_name: response.first_name,
			last_name: response.last_name,
			email: response.email
		});
	}

	loadUserProfile() {
		API.account.getUserProfile().then(
			this.loadUserProfileCallback.bind(this)
		).catch(
			(error) => {
				console.warn(error);
			}
		);
	}

	signOutCallback(response) {
		if (response.status === 200) {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({routeName: 'login'})],
			});
			this.props.navigation.dispatch(resetAction);
		}
	}

	signOut() {
		API.account.logout().then(
			this.signOutCallback.bind(this)
		).catch((error) => {
			console.warn(error);
		});
	}

	onSignOutButtonPress() {
		this.signOut();
	}

	render() {
		const {theme} = this.props.screenProps;
		const styles = Styles(theme);
		return (
			<ScrollView
				style={styles.screen}
			>

				<View style={styles.row}>
					<Text
						style={styles.rowText}
					>
						{t('user')}: {this.state.first_name} {this.state.last_name}
					</Text>
				</View>

				<View style={styles.row}>
					<Text
						style={styles.rowText}
					>
						{t('email')}: {this.state.email}
					</Text>
				</View>

				<View
					// TODO: remove inline style
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
							onPress={this.onSignOutButtonPress}
						>
							{t('sign_out')}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)

	}

}


const Styles = (theme) => ({
	screen: {
		flex: 1,
		backgroundColor: theme.screenBackgroundColor,
		padding: '3%'
	},
	row: {
		paddingVertical: '3%',
	},
	rowText: {
		fontSize: 20,
		color: theme.textColor
	}
});