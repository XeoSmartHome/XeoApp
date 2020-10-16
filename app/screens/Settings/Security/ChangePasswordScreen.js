import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView} from "react-native";
import {Icon} from "react-native-elements";
import {
	API_UPDATE_PASSWORD,
	BOOTSTRAP_COLOR_DANGER,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	XEO_BLUE
} from "../../../constants";
import I18n from 'i18n-js';


const t = (key) => I18n.t('change_password.' + key);


export default class ChangePasswordScreen extends Component{
	constructor() {
		super();
		this.state = {
			current_password: '',
			new_password: '',
			confirm_new_password: '',
			wrong_password: null,
			empty_password: true,
			password_to_weak: null,
			password_dont_match: null,
			password_updated: false
		}
	}

	checkNewPasswords(new_password, confirm_new_password){
		this.setState({
			password_updated: false,
			password_to_weak: new_password.length < 8,
			password_dont_match: new_password !== confirm_new_password
		})
	}

	requestUpdatePassword(){
		fetch(API_UPDATE_PASSWORD, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'current_password': this.state.current_password,
				'new_password': this.state.new_password
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				switch (response.status) {
					case 200:
						this.setState({
							current_password: '',
							new_password: '',
							confirm_new_password: '',
							wrong_password: null,
							empty_password: true,
							password_to_weak: null,
							password_dont_match: null,
							password_updated: true
						})
						break;
					case 400:
						this.setState({
							wrong_password: true
						});
						break;
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	getMessage(){
		if(this.state.wrong_password){
			return t('errors.wrong_password');
		}
		if(this.state.password_to_weak === true){
			return t('errors.password_to_weak');
		}
		if(this.state.password_dont_match === true){
			return t('errors.passwords_dont_match');
		}
		if(this.state.password_updated){
			return t('password_updated')
		}
	}

	render(){
		const {theme} = this.props.screenProps;
		const button_disabled = this.state.wrong_password || this.state.empty_password || this.state.password_to_weak || this.state.password_dont_match;
		return(
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<TextInput
					style={[styles.text_input, {
						color: theme.textColor
					}]}
					value={this.state.current_password}
					onChangeText={ (value) => {
						this.setState({
							current_password: value,
							wrong_password: false,
							empty_password: value === '',
							password_updated: false
						});
					}}
					placeholder={t('current_password')}
					placeholderTextColor={theme.placeholderTextColor}
					secureTextEntry={true}
					autoCapitalize={"none"}
					autoCorrect={false}
				/>

				<TextInput
					style={[styles.text_input, {
						color: theme.textColor
					}]}
					value={this.state.new_password}
					onChangeText={ (value) => {
						this.setState({new_password: value});
						this.checkNewPasswords(value, this.state.confirm_new_password);
					}}
					placeholder={t('new_password')}
					placeholderTextColor={theme.placeholderTextColor}
					secureTextEntry={true}
					autoCapitalize={"none"}
					autoCorrect={false}
				/>

				<TextInput
					style={[styles.text_input, {
						color: theme.textColor
					}]}
					value={this.state.confirm_new_password}
					onChangeText={ (value) => {
						this.setState({confirm_new_password: value});
						this.checkNewPasswords(this.state.new_password, value);
					}}
					placeholder={t('confirm_new_password')}
					placeholderTextColor={theme.placeholderTextColor}
					secureTextEntry={true}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						margin: '5%'
					}}>
					<Text
						style={[styles.warning_text, {
							color: this.state.password_updated ? theme.successColor : theme.dangerColor
						}]}
					>
						{this.getMessage()}
					</Text>
					<TouchableOpacity
						style={[styles.save_button, {
							opacity: button_disabled ? theme.buttonDisabledOpacity : 1
						}]}
						onPress={() => {this.requestUpdatePassword()}}
						disabled={button_disabled}
					>
						<Text style={styles.save_button_text}>
							{ t('save_button') }
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	text_input: {
		fontSize: 20,
		borderWidth: 2,
		borderColor: 'gray',
		borderRadius: 8,
		padding: 8,
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
	},
	save_button:{
		backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
		width: '25%',
		borderRadius: 10,
		padding: 5,
		justifyContent: 'center',
		height: 40
	},
	save_button_text:{
		fontSize: 20,
		color: BOOTSTRAP_COLOR_LIGHT,
		alignSelf: 'center'
	},
	warning_text: {
		fontSize: 16,
		fontWeight: 'bold',
		width: '70%'
	}
});
