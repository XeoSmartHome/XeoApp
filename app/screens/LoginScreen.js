import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Button,
	Image,
	TouchableOpacity,
	AsyncStorage, SafeAreaView
} from "react-native";
import {
	API_LOGIN_URL, API_LOGIN_WITH_FACEBOOK,
	API_LOGIN_WITH_GOOGLE,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	BOOTSTRAP_COLOR_SECONDARY, FACEBOOK_APP_ID, GOOGLE_OAUTH_CLIENT_ID, XEO_BLUE
} from "../constants";
import * as Google from 'expo-google-app-auth';
import {Icon} from "react-native-elements";
import I18n from 'i18n-js';
import * as Facebook from 'expo-facebook';


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
			if(response.status === 'success') {
				this.go_to_main_page();
			}else {
				alert('bad credentials');
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
			androidClientId: GOOGLE_OAUTH_CLIENT_ID
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
			})
		});
	}

	login_with_facebook(){
		Facebook.initializeAsync(FACEBOOK_APP_ID, 'XeoApp').then( () => {
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
		return (
			<SafeAreaView style={styles.screen}>
				<Image
					style={styles.logo}
					source={require("../assets/images/logo_xeo_no_background.png")}
				/>
				<View style={styles.form}>
					<Text style={styles.inputHint}>Email:</Text>
					<TextInput
						style={styles.textInput}
						placeholder="email"
						autoCorrect={false}
						autoCapitalize='none'
						value={this.state.email}
						onChangeText={text => this.setState({email: text})}
					/>
					<Text style={styles.inputHint}>Password:</Text>
					<TextInput
						style={styles.textInput}
						placeholder="password"
						autoCorrect={false}
						autoCapitalize='none'
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={text => this.setState({password: text})}
					/>
					<View style={{top: 20}}>
						<TouchableOpacity
							style={[styles.button, styles.loginButton]}
							onPress={this.login.bind(this)}
						>
							<Text style={styles.buttonText}>{
								I18n.t("screens.login.sign_in")
							}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.newAccountButton]}
							onPress={this.create_account.bind(this)}
						>
							<Text style={styles.buttonText}>{
								I18n.t("screens.login.create_account")
							}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, {backgroundColor: 'red', flexDirection: 'row', justifyContent: 'center', alignItems:'center'}]}
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
								Login with google
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
								Login with facebook
							</Text>
						</TouchableOpacity>

					</View>
				</View>
			</SafeAreaView>
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
		margin: 10
	},
	form:{
		width: '80%',
	},
	inputHint:{
		fontSize: 20,
		top: 10
	},
	textInput:{
		height: 50,
		fontSize: 18,
		borderBottomWidth: 2,
	},
	button:{
		padding: 8,
		marginVertical: 10,
		alignSelf: 'center',
		borderRadius: 8,
		width: '70%',
	},
	buttonText:{
		color: BOOTSTRAP_COLOR_LIGHT,
		fontSize: 20,
		alignSelf: 'center'
	},
	loginButton:{
		backgroundColor: BOOTSTRAP_COLOR_PRIMARY
	},
	newAccountButton:{
		backgroundColor: BOOTSTRAP_COLOR_SECONDARY,
	}
});
