import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity
	, ScrollView,
} from "react-native";
import {
	API_LOGIN_URL,
} from "../../api/api_routes_v_1.0.0.0";
import I18n from 'i18n-js';
import {BOOTSTRAP_COLOR_DANGER, BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_SUCCESS} from "../../themes/bootstrap_colors";
import {XEO_BLUE} from "../../constants";


const t = (key) => I18n.t('create_account.' + key);


export default class CreateAccountScreen extends Component {
	// TODO: Finish create account screen. This includes:
	//  functions reorganization,
	//  implement recaptcha,
	// 	test with api requests
	constructor() {
		super();
		this.state = {
			message: '',
			current_input: 1,
			current_input_is_ok: false,
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			confirm_password: '',
		}

	}

	createNewAccount(){
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
			switch (response.status) {
				case 200:
					this.props.navigation.replace('main', {})
					break;
				case 400:
					// pass
					break;
			}
		}).catch((error) => {
			alert(error)
		});
	}

	checkFirstName(first_name) {
		if (first_name === '') {
			this.setState({message: 'Please complete the field', current_input_is_ok: false});
			return;
		}
		if (/\d/.test(first_name)) {
			this.setState({message: "Characters allowed: a-z, A-Z, ', -", current_input_is_ok: false});
			return;
		}
		this.setState({message: 'OK', current_input_is_ok: true});
	}

	checkLastName(last_name) {
		if (last_name === '') {
			this.setState({message: 'Please complete the field', current_input_is_ok: false});
			return;
		}
		if (/\d/.test(last_name)) {
			this.setState({message: "Characters allowed: a-z, A-Z, ', -", current_input_is_ok: false});
			return;
		}
		this.setState({message: 'OK', current_input_is_ok: true});
	}

	checkEmail(email) {
		if (email === '') {
			this.setState({message: 'Please complete the field', current_input_is_ok: false});
			return;
		}
		//TODO: more conditions for email input
		this.setState({message: 'OK', current_input_is_ok: true});
	}

	checkPassword(password) {
		if (password === '') {
			this.setState({message: 'Please complete the field', current_input_is_ok: false});
			return;
		}
		this.setState({message: 'OK', current_input_is_ok: true});
	}

	checkConfirmPassword(confirm_password) {
		if (confirm_password === '') {
			this.setState({message: 'Please complete the field', current_input_is_ok: false});
			return;
		}
		if (this.state.password !== confirm_password) {
			this.setState({message: "Passwords must match", current_input_is_ok: false});
			return;
		}
		this.setState({message: 'OK', current_input_is_ok: true});
	}

	renderFirstNameInput() {
		const {theme} = this.props.screenProps;
		return (
			<View style={styles.inputGroup}>
				<Text style={[styles.hintText, {
					color: theme.textColor
				}]}>
					{t('first_name')}
				</Text>
				<TextInput
					style={[styles.textInput, {
						color: theme.textColor
					}]}
					placeholder={t('first_name')}
					placeholderTextColor={theme.placeholderTextColor}
					autoCapitalize="words"
					autoFocus={true}
					value={this.state.first_name}
					onChangeText={(value) => {
						this.setState({first_name: value});
						this.checkFirstName(value);
					}}
					onSubmitEditing={() => {
						if (this.state.current_input_is_ok)
							this.setState({current_input: 2, message: '', current_input_is_ok: false});
					}}
				/>
				<Text
					style={[styles.input_feedback, this.state.current_input_is_ok ? styles.input_ok : styles.input_warning]}
				>
					{this.state.message}
				</Text>
			</View>
		)
	}

	renderLastNameInput(){
		const {theme} = this.props.screenProps;
		return(
			<View style={styles.inputGroup}>
				<Text style={[styles.hintText, {
					color: theme.textColor
				}]}>
					{t('last_name')}
				</Text>
				<TextInput
					style={[styles.textInput, {
						color: theme.textColor
					}]}
					placeholder={t('last_name')}
					placeholderTextColor={theme.placeholderTextColor}
					autoCapitalize="words"
					autoFocus={true}
					value={this.state.last_name}
					onChangeText={(value) => {
						this.setState({last_name: value});
						this.checkLastName(value);
					}}
					onSubmitEditing={ () => {
						if (this.state.current_input_is_ok)
							this.setState({current_input: 3, message: '', current_input_is_ok: false});
					}}
				/>
				<Text
					style={[styles.input_feedback, this.state.current_input_is_ok ? styles.input_ok : styles.input_warning]}
				>
					{this.state.message}
				</Text>
			</View>
		)
	}

	renderEmailInput(){
		const {theme} = this.props.screenProps;
		return(
			<View style={styles.inputGroup}>
				<Text style={[styles.hintText, {
					color: theme.textColor
				}]}>
					{t('email')}
				</Text>
				<TextInput
					style={[styles.textInput, {
						color: theme.textColor
					}]}
					placeholder={t('email')}
					placeholderTextColor={theme.placeholderTextColor}
					autoFocus={true}
					autoCapitalize="none"
					textContentType="emailAddress"
					value={this.state.email}
					onChangeText={(value) => {
						this.setState({email: value});
						this.checkEmail(value);
					}}
					onSubmitEditing={ () => {
						if (this.state.current_input_is_ok)
							this.setState({current_input: 4, message: '', current_input_is_ok: false});
					}}
				/>
				<Text
					style={[styles.input_feedback, this.state.current_input_is_ok ? styles.input_ok : styles.input_warning]}
				>
					{this.state.message}
				</Text>
			</View>
		)
	}

	renderPasswordInput(){
		const {theme} = this.props.screenProps;
		return(
			<View style={styles.inputGroup}>
				<Text style={[styles.hintText, {
					color: theme.textColor
				}]}>
					{t('password')}
				</Text>
				<TextInput
					style={[styles.textInput, {
						color: theme.textColor
					}]}
					placeholder={t('password')}
					placeholderTextColor={theme.placeholderTextColor}
					autoFocus={true}
					autoCapitalize="none"
					textContentType="newPassword"
					secureTextEntry={true}
					value={this.state.password}
					onChangeText={(value) => {
						this.setState({password: value});
						this.checkPassword(value);
					}}
					onSubmitEditing={ () => {
						if (this.state.current_input_is_ok)
							this.setState({current_input: 5, message: '', current_input_is_ok: false});
					}}
				/>
				<Text
					style={[styles.input_feedback, this.state.current_input_is_ok ? styles.input_ok : styles.input_warning]}
				>
					{this.state.message}
				</Text>
			</View>
		)
	}

	renderConfirmPasswordInput(){
		const {theme} = this.props.screenProps;
		return(
			<View style={styles.inputGroup}>
				<Text style={[styles.hintText, {
					color: theme.textColor
				}]}>
					{t('confirm_password')}
				</Text>
				<TextInput
					style={[styles.textInput, {
						color: theme.textColor
					}]}
					placeholder={t('confirm_password')}
					placeholderTextColor={theme.placeholderTextColor}
					autoFocus={true}
					autoCapitalize="none"
					textContentType="newPassword"
					secureTextEntry={true}
					value={this.state.confirm_password}
					onChangeText={(value) => {
						this.setState({confirm_password: value});
						this.checkConfirmPassword(value);
					}}
					onSubmitEditing={ () => {
						if (this.state.current_input_is_ok)
							this.setState({current_input: 6, message: '', current_input_is_ok: false});
					}}
				/>
				<Text
					style={[styles.input_feedback, this.state.current_input_is_ok ? styles.input_ok : styles.input_warning]}
				>
					{this.state.message}
				</Text>
			</View>
		)
	}

	renderCurrentInput(){
		switch (this.state.current_input) {
			case 1:
				return this.renderFirstNameInput();
			case 2:
				return this.renderLastNameInput();
			case 3:
				return this.renderEmailInput();
			case 4:
				return this.renderPasswordInput();
			case 5:
				return this.renderConfirmPasswordInput();
		}
	}

	render(){
		const {theme} = this.props.screenProps;
		const back_button_visible_and_enabled = this.state.current_input > 1;
		return (
			<ScrollView style={[styles.screen, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				{this.renderCurrentInput()}
				<View
					style={{
						flexDirection: "row"
					}}
				>
					<TouchableOpacity
						style={[styles.button, {
							backgroundColor: theme.secondaryColor,
							opacity: back_button_visible_and_enabled ? 1 : 0
						}]}
						disabled={!back_button_visible_and_enabled}
						onPress={ () => {
							this.setState({
								current_input: this.state.current_input - 1,
								current_input_is_ok: true
							});
						}}
					>
						<Text
							style={styles.button_text}
						>
							Back
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, {
							backgroundColor: theme.primaryColor,
							opacity: this.state.current_input_is_ok ? 1: theme.buttonDisabledOpacity
						}]}
						disabled={!this.state.current_input_is_ok}
						onPress={ () => {
							this.setState({
								current_input: this.state.current_input + 1,
								message: '',
								current_input_is_ok: false
							});
						}}
					>
						<Text
							style={styles.button_text}
						>
							{t('next')}
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	inputGroup:{
		padding: 30,
		top: '8%'
	},
	hintText:{
		paddingVertical: 10,
		fontSize: 20,
	},
	textInput:{
		borderColor: XEO_BLUE,
		borderBottomWidth: 3,
		fontSize: 24,
		padding: 5
	},
	input_feedback:{
		paddingVertical: 15,
		fontSize: 16
	},
	input_warning:{
		color: BOOTSTRAP_COLOR_DANGER
	},
	input_ok:{
		color: BOOTSTRAP_COLOR_SUCCESS
	},
	button:{
		width: '30%',
		marginHorizontal: '10%',
		borderRadius: 8,
		padding: 8,
		marginTop: 5
	},
	button_text:{
		fontSize: 18,
		color: BOOTSTRAP_COLOR_LIGHT,
		alignSelf: 'center'
	}
});

