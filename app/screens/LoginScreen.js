import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Button,
	Image,
	TouchableOpacity,
	AsyncStorage
} from "react-native";
import {API_LOGIN_URL, BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_PRIMARY, BOOTSTRAP_COLOR_SECONDARY} from "../constants";


export default class LoginScreen extends Component{
	constructor() {
		super();
		this.state = {
			email: "neco31@yahoo.com",
			password: "12345678",
		};
		/*AsyncStorage.getItem('session_cookie').then(value => {
			if (value !== '')
				this.props.navigation.replace('main', {});
		});*/
	}

	save_session(){

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
				const cookie = response.headers['map']['set-cookie'].split('=')[1].split(';')[0];
				AsyncStorage.setItem('session_cookie', cookie).then();
				return response.json();
			}
		).then(response => {
			if(response.status === 'success') {
				this.props.navigation.replace('main', {});
			}else {
				alert('bad credentials');
			}
		}).catch((error) => {
			alert(error)
		});
	}

	create_account(){
		this.props.navigation.navigate('create_account');
	}

	render(){
		return (
			<View style={styles.screen}>
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
							<Text style={styles.buttonText}>Sign in</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.newAccountButton]}
							onPress={this.create_account.bind(this)}
						>
							<Text style={styles.buttonText}>Create account</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
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
