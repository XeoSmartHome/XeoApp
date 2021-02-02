import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
	ScrollView, StatusBar
} from "react-native";

import * as Google from 'expo-google-app-auth';
import {Icon} from "react-native-elements";
import I18n from 'i18n-js';
import * as Facebook from 'expo-facebook';
import AsyncStorage from "@react-native-community/async-storage";
import {
	API_IS_AUTHENTICATED,
	API_LOGIN_URL,
	API_LOGIN_WITH_FACEBOOK,
	API_LOGIN_WITH_GOOGLE
} from "../../api/api_routes_v_1.0.0.0";
import {
	FACEBOOK_APP_ID,
	GOOGLE_OAUTH_CLIENT_ID_EXPO,
	GOOGLE_OAUTH_CLIENT_ID_STANDALONE,
	XEO_BLUE
} from "../../constants";
import {BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_PRIMARY, BOOTSTRAP_COLOR_SECONDARY} from "../../themes/bootstrap_colors";


const t = (key) => I18n.t('login.' + key);


export default class LoginScreen extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			show_error_message: false,
			error_message: '',
			loading: true
		};
	}

	componentDidMount() {
		this.load_session();
	}

	load_session() {
		/*AsyncStorage.getItem('session_cookie').then(value => {
			//if (value !== '')
				//this.props.navigation.replace('main', {});
		});*/
		fetch(API_IS_AUTHENTICATED).then(
			(response) => response.json()
		).then(
			(response) => {
				if (response['authenticated'] === true) {
					AsyncStorage.getItem('lock_app_with_pin_enable').then((lock_app_with_pin_enable) => {
						if (lock_app_with_pin_enable === 'true') {
							this.props.navigation.replace('pin', {next: 'main', params: {}});
						} else {
							this.props.navigation.replace('main', {});
						}
					});
				} else {
					this.setState({loading: false})
				}
			}
		).catch((error) => {
			alert(error);
			this.setState({loading: false})
		})
	}

	show_error_message(message) {
		this.setState({
			show_error_message: true,
			error_message: message
		});
	}

	hide_error_message() {
		this.setState({
			show_error_message: false
		});
	}

	go_to_main_page() {
		this.props.navigation.replace('main', {});
	}

	login() {
		fetch(API_LOGIN_URL, {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
		}).then(
			(response) => {
				//const cookie = response.headers['map']['set-cookie'].split('=')[1].split(';')[0];
				//this.save_session(cookie);
				//console.warn(response.headers.get('set-cookie'));
				return response.json();
			}
		).then((response) => {
			if (response.status === 200) {
				this.go_to_main_page();
			} else {
				switch (response.error) {
					case 'UserNotFound':
						this.show_error_message(t('errors.user_not_found'));
						break;
					case 'WrongPassword':
						this.show_error_message(t('errors.wrong_password'));
						break;
				}
			}
		}).catch((error) => {
			alert(error)
		});
	}

	/*loginGoogleApi() {
		return Google.logInAsync({
			androidClientId: GOOGLE_OAUTH_CLIENT_ID_EXPO,
			androidStandaloneAppClientId: GOOGLE_OAUTH_CLIENT_ID_STANDALONE,
			redirectUrl: ''
		});
	}

	fetchLoginWithGoogle() {
		return fetch(API_LOGIN_WITH_GOOGLE, {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: idToken
			})
		});
	}

	fetchLoginWithGoogleCallback(response) {
		return response.json();
	}

	loginWithGoogle() {
		this.loginGoogleApi().then(this.fetchLoginWithGoogle()).then(this.fetchLoginWithGoogleCallback).then();
	}*/

	login_with_google() {
		Google.logInAsync({
			androidClientId: GOOGLE_OAUTH_CLIENT_ID_EXPO,
			androidStandaloneAppClientId: GOOGLE_OAUTH_CLIENT_ID_STANDALONE,
			redirectUrl: ''
		}).then(({idToken, type}) => {
			if (type === 'cancel') {
				return;
			}
			fetch(API_LOGIN_WITH_GOOGLE, {
				mode: 'cors',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: idToken
				})
			}).then(
				(response) => response.json()
			).then((response) => {
				if (response.status === 200) {
					this.go_to_main_page();
				}
			}).catch((error) => {
				alert(error);
			})
		}).catch((error) => {
			alert(error);
		});
	}

	/*initializeFacebookAsync(){
		return Facebook.initializeAsync({
			appId: FACEBOOK_APP_ID,
			appName: 'XeoApp'
		});
	}

	logInWithFacebookAsync() {
		return Facebook.logInWithReadPermissionsAsync({
			permissions: ['public_profile', 'email']
		});
	}

	logInWithFacebookCallback({type, token, expires, permissions, declinedPermissions}) {

	}

	fetchLoginWithFacebook() {

	}*/

	/*logInWithFacebook() {
		this.initializeFacebookAsync().then(this.logInWithFacebookAsync).then()
	}*/

	login_with_facebook() {
		Facebook.initializeAsync({
			appId: FACEBOOK_APP_ID, appName: 'XeoApp'
		}).then(() => {
			Facebook.logInWithReadPermissionsAsync(
				{
					permissions: ['public_profile', 'email']
				}
			).then(({type, token, expires, permissions, declinedPermissions}) => {
				fetch(API_LOGIN_WITH_FACEBOOK, {
					mode: 'cors',
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: token
					})
				}).then(
					(response) => response.json()
				).then((response) => {
					if (response.status === 200) {
						this.go_to_main_page();
					}
				}).catch((error) => {
					alert(error);
				})
			}).catch((error) => {
				alert(error)
			});
		}).catch((error) => {
			alert(error);
		});
	}

	create_account() {
		this.props.navigation.navigate('create_account');
	}

	render() {
		const {theme} = this.props.screenProps;
		const login_button_enabled = this.state.email.length !== 0 && this.state.password.length !== 0;

		if (this.state.loading) {
			return (
				<ScrollView
					style={{
						flex: 1,
						backgroundColor: theme.screenBackgroundColor
					}}
				>
					<StatusBar hidden={true}/>
				</ScrollView>
			)
		}

		return (
			<ScrollView contentContainerStyle={[styles.screen, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<StatusBar hidden={true}/>
				<Image
					style={styles.logo}
					source={require("../../assets/images/logo_xeo_no_background.png")}
				/>
				<View style={styles.form}>
					<Text style={[styles.inputHint, {
						color: theme.textColor
					}]}>
						{t('email')}:
					</Text>
					<TextInput
						style={[styles.textInput, {
							color: theme.textColor,
							borderColor: theme.textColor
						}]}
						placeholder={t('email')}
						placeholderTextColor={theme.placeholderTextColor}
						autoCorrect={false}
						autoCapitalize='none'
						value={this.state.email}
						onChangeText={text => this.setState({email: text, show_error_message: false})}
					/>
					<Text style={[styles.inputHint, {
						color: theme.textColor
					}]}>
						{t('password')}:
					</Text>
					<TextInput
						style={[styles.textInput, {
							color: theme.textColor,
							borderColor: theme.textColor
						}]}
						placeholder={t('password')}
						placeholderTextColor={theme.placeholderTextColor}
						autoCorrect={false}
						autoCapitalize='none'
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={text => this.setState({password: text, show_error_message: false})}
					/>

					{
						this.state.show_error_message && (
							<View
								style={{
									marginTop: 20,
								}}
							>
								<Text
									style={{
										color: theme.dangerColor,
										fontSize: 16
									}}
								>
									{this.state.error_message}
								</Text>
							</View>
						)
					}

					<View style={{top: 20}}>
						<TouchableOpacity
							disabled={!login_button_enabled}
							style={[
								styles.button,
								styles.loginButton,
								{
									opacity: login_button_enabled ? 1 : 0.6
								}]}
							onPress={this.login.bind(this)}
						>
							<Text style={styles.buttonText}>
								{I18n.t("login.login")}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.newAccountButton]}
							onPress={this.create_account.bind(this)}
						>
							<Text style={styles.buttonText}>
								{I18n.t("login.create_account")}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, {
								backgroundColor: '#DB4437',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}]}
							onPress={() => {
								this.login_with_google()
							}}
						>
							<Icon
								size={25}
								color={BOOTSTRAP_COLOR_LIGHT}
								name='google'
								type='antdesign'
							/>
							<Text style={[styles.buttonText, {}]}>
								{t('login_with_google')}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, {
								backgroundColor: XEO_BLUE,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}]}
							onPress={() => {
								this.login_with_facebook()
							}}
						>
							<Icon
								size={25}
								color={BOOTSTRAP_COLOR_LIGHT}
								name='facebook'
								type='entypo'
							/>
							<Text style={[styles.buttonText, {}]}>
								{t('login_with_facebook')}
							</Text>
						</TouchableOpacity>

					</View>
				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
	},
	logo: {
		width: 125,
		height: 125,
		margin: 10,
	},
	form: {
		width: '80%',
	},
	inputHint: {
		fontSize: 18,
		top: 10
	},
	textInput: {
		height: 50,
		fontSize: 18,
		borderBottomWidth: 2,
	},
	button: {
		padding: 6,
		marginVertical: 8,
		alignSelf: 'center',
		borderRadius: 8,
		width: '80%',
	},
	buttonText: {
		color: BOOTSTRAP_COLOR_LIGHT,
		fontSize: 18,
		alignSelf: 'center',
		marginHorizontal: 6
	},
	loginButton: {
		backgroundColor: BOOTSTRAP_COLOR_PRIMARY
	},
	newAccountButton: {
		backgroundColor: BOOTSTRAP_COLOR_SECONDARY,
	}
});
