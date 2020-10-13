import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Button,
	Image,
	TouchableOpacity,
	SafeAreaView, ScrollView, StatusBar
} from "react-native";
import {
	API_LOGIN_URL,
	API_LOGIN_WITH_FACEBOOK,
	API_LOGIN_WITH_GOOGLE,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	BOOTSTRAP_COLOR_SECONDARY,
	FACEBOOK_APP_ID,
	GOOGLE_OAUTH_CLIENT_ID_EXPO,
	GOOGLE_OAUTH_CLIENT_ID_STANDALONE,
	XEO_BLUE
} from "../constants";
import * as Google from 'expo-google-app-auth';
import {Icon} from "react-native-elements";
import I18n, {t} from 'i18n-js';
import * as Facebook from 'expo-facebook';
import AsyncStorage from "@react-native-community/async-storage";
import ThemeProvider, {ThemeContext} from "../themes/ThemeProvider";


export default class LoginScreen extends Component{
	constructor() {
		super();
		this.state = {
			email: "neco31@yahoo.com",
			password: "12345678",
		};
		this.load_session();
	}

	load_session(){
		AsyncStorage.getItem('session_cookie').then(value => {
			//if (value !== '')
				//this.props.navigation.replace('main', {});
		});
	}

	save_session(cookie){
		AsyncStorage.setItem('session_cookie', cookie).then();
	}

	login(){
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
				return response.json();
			}
		).then(response => {
			if(response.status === 200) {
				this.go_to_main_page();
			}else {
				switch (response.error) {
					case 'UserNotFound':
						alert('User not found');
						break;
					case 'WrongPassword':
						alert('Wrong password')
						break;
				}
			}
		}).catch((error) => {
			alert(error)
		});
	}

	go_to_main_page(){
		AsyncStorage.getItem('lock_app_with_pin_enable').then((lock_app_with_pin_enable) => {
			if(lock_app_with_pin_enable === 'true') {
				this.props.navigation.replace('pin', {next: 'main', params: {}});
			} else {
				this.props.navigation.replace('main', {});
			}
		});
	}

	login_with_google(){
		Google.logInAsync({
			androidClientId: GOOGLE_OAUTH_CLIENT_ID_EXPO,
			androidStandaloneAppClientId: GOOGLE_OAUTH_CLIENT_ID_STANDALONE,
			redirectUrl: ''
		}).then( ({idToken, type}) => {
			if(type === 'cancel') {
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
			).then( (response) => {
				if(response.status === 'success'){
					this.go_to_main_page();
				}
			}).catch( (error) => {
				alert(error);
			})
		}).catch( (error) => {
			alert(error);
		});
	}

	login_with_facebook(){
		Facebook.initializeAsync({appId: FACEBOOK_APP_ID, appName: 'XeoApp'}).then( () => {
			Facebook.logInWithReadPermissionsAsync(
				{
					permissions: ['public_profile', 'email']
				}
			).then( ({type, token, expires, permissions, declinedPermissions}) => {
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
				).then( (response) => {
					if(response.status === 'success'){
						this.go_to_main_page();
					}
				}).catch( (error) => {
					alert(error);
				})
			}).catch( (error) => {
				alert(error)
			});
		}).catch( (error) => {
			alert(error);
		});
	}

	create_account(){
		this.props.navigation.navigate('create_account');
	}

	render(){
		const {theme} = this.props.screenProps;
		const login_button_enabled = this.state.email.length !== 0 && this.state.password.length !== 0;
		return (
			<ScrollView contentContainerStyle={[styles.screen, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<StatusBar hidden={true}/>
				<Image
					style={styles.logo}
					source={require("../assets/images/logo_xeo_no_background.png")}
				/>
				<View style={styles.form}>
					<Text style={[styles.inputHint, {
						color: theme.textColor
					}]}>
						Email:
					</Text>
					<TextInput
						style={[styles.textInput, {
							color: theme.textColor,
							borderColor: theme.textColor
						}]}
						placeholder="email"
						autoCorrect={false}
						autoCapitalize='none'
						value={this.state.email}
						onChangeText={text => this.setState({email: text})}
					/>
					<Text style={[styles.inputHint, {
						color: theme.textColor
					}]}>
						Password:
					</Text>
					<TextInput
						style={[styles.textInput, {
							color: theme.textColor,
							borderColor: theme.textColor
						}]}
						placeholder="password"
						autoCorrect={false}
						autoCapitalize='none'
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={text => this.setState({password: text})}
					/>
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
							<Text style={styles.buttonText}>{
								I18n.t("login.login")
							}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.newAccountButton]}
							onPress={this.create_account.bind(this)}
						>
							<Text style={styles.buttonText}>{
								I18n.t("login.create_account")
							}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, {backgroundColor: '#DB4437', flexDirection: 'row', justifyContent: 'center', alignItems:'center'}]}
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
								{t('login.login_with_google')}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, {backgroundColor: XEO_BLUE, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}]}
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
								{t('login.login_with_facebook')}
							</Text>
						</TouchableOpacity>

					</View>
				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	screen:{
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
	},
	logo:{
		width: 125,
		height: 125,
		margin: 10,
	},
	form:{
		width: '80%',
	},
	inputHint:{
		fontSize: 18,
		top: 10
	},
	textInput:{
		height: 50,
		fontSize: 18,
		borderBottomWidth: 2,
	},
	button:{
		padding: 6,
		marginVertical: 8,
		alignSelf: 'center',
		borderRadius: 8,
		width: '80%',
	},
	buttonText:{
		color: BOOTSTRAP_COLOR_LIGHT,
		fontSize: 18,
		alignSelf: 'center',
		marginHorizontal: 6
	},
	loginButton:{
		backgroundColor: BOOTSTRAP_COLOR_PRIMARY
	},
	newAccountButton:{
		backgroundColor: BOOTSTRAP_COLOR_SECONDARY,
	}
});
