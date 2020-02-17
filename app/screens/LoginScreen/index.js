import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Button,
	Image, KeyboardAvoidingView
} from "react-native";


export default class LoginScreen extends Component{
	constructor() {
		super();
		this.state = {
			email: "neco31@yahoo.com",
			password: "12345678",
		}
	}

	login(){
		fetch('https://dashboard.xeosmarthome.com/api/login', {
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
			(response) => response.json()
		).then(response => {
			if(response.status === 'success') {
				this.props.navigation.navigate('dashboard')
			}else {
				alert('bad credentials')
			}
		}).catch((error) => {
			alert(error)
		});
	}

	render(){
		return (
			<View style={styles.screen}>
				<Image
					style={styles.logo}
					source={require("../../assets/images/logo_xeo_no_background.png")}
				/>
				<Text style={styles.title}>XeoSmartHome</Text>
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
					<View style={styles.loginButton}>
						<Button
							title="login"
							onPress={() => this.login()}
						/>
					</View>
					<View style={styles.newAccountButton}>
						<Button title="create new account" color="gray" onPress={() => alert("not implemented yet")}/>
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
		backgroundColor: '#F5F5F5'
	},
	logo:{
		width: 125,
		height: 125,
		margin: 10
	},
	title:{
		fontSize: 26,
		margin: 5
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
		borderBottomWidth: 2
	},
	loginButton:{
		margin: 5,
		width: '40%',
		alignSelf: 'center',
		padding: 10
	},
	newAccountButton:{
		alignSelf: 'center',
		width: '50%',
		padding: 10
	}
});
