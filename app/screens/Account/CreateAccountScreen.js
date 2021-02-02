import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import I18n from "i18n-js";
import CheckBox from "@react-native-community/checkbox";
import {API_CREATE_ACCOUNT} from "../../api/api_routes_v_1.0.0.0";


const t = (key) => I18n.t('create_account.' + key);


export default class CreateAccountScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			first_name: '',
			first_name_is_valid: false,
			first_name_error_message: '',

			last_name: '',
			last_name_is_valid: false,
			last_name_error_message: '',

			email: '',
			email_is_valid: false,
			email_error_message: '',

			password: '',
			password_is_valid: false,
			password_error_message: '',

			confirm_password: '',
			confirm_password_is_valid: false,
			confirm_password_error_message: '',

			terms_and_conditions_checked: false,

			loading: false
		}
	}

	createAccount(){
		this.setState({
			loading: true
		});
		fetch(API_CREATE_ACCOUNT, {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				first_name: this.state.first_name,
				last_name: this.state.last_name,
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
			this.setState({
				loading: false
			});
			switch (response.status){
				case 200:
					this.props.navigation.replace('main', {});
					break;
				case 400:
					alert(response.message);
			}
		}).catch((error) => {
			alert(error)
		});
	}

	checkFirstName(first_name){
		if(first_name === ''){
			this.setState({
				first_name_is_valid: false,
				first_name_error_message: t('errors.empty_field')
			});
			return;
		}
		this.setState({
			first_name_is_valid: true,
			first_name_error_message: ''
		});
	}

	checkLastName(last_name){
		if(last_name === ''){
			this.setState({
				last_name_is_valid: false,
				last_name_error_message: t('errors.empty_field')
			});
			return;
		}
		this.setState({
			last_name_is_valid: true,
			last_name_error_message: ''
		});
	}

	checkEmail(email){
		if(email === ''){
			this.setState({
				email_is_valid: false,
				email_error_message: t('errors.invalid_email')
			});
			return;
		}
		this.setState({
			email_is_valid: true,
			email_error_message: ''
		});
	}

	checkPassword(password){
		if(password.length < 8){
			this.setState({
				password_is_valid: false,
				password_error_message: t('errors.weak_password')
			});
			return;
		}
		this.setState({
			password_is_valid: true,
			password_error_message: ''
		});
	}

	checkConfirmPassword(confirm_password){
		if(confirm_password !== this.state.password){
			this.setState({
				confirm_password_error_message: t('errors.not_matching_passwords')
			});
			return;
		}
		this.setState({
			confirm_password_is_valid: true,
			confirm_password_error_message: ''
		});
	}

	renderErrorMessage(message){
		const {theme} = this.props.screenProps;
		return (
			message !== '' &&
			<Text
				style={{
					color: theme.dangerColor,
					fontSize: 16,
					marginTop: '3%'
				}}
			>
				{message}
			</Text>
		)
	}

	render() {
		const {theme} = this.props.screenProps;
		const create_account_button_enabled = this.state.first_name_is_valid && this.state.last_name_is_valid &&
			this.state.email_is_valid && this.state.password_is_valid && this.state.confirm_password_is_valid &&
			this.state.terms_and_conditions_checked && !this.state.loading;
		return(
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor,
					flex: 1
				}}
			>

				<View
					style={styles.paragraph}
				>
					<Text
						style={[styles.paragraph_text, {
							color: theme.textColor
						}]}
					>
						{t('first_name')}
					</Text>
					<TextInput
						style={[styles.text_input, {
							color: theme.textColor,
							borderBottomColor: theme.textColor
						}]}
						autoCorrect={true}
						autoCapitalize='words'
						placeholder={t('first_name')}
						placeholderTextColor={theme.placeholderTextColor}
						value={this.state.first_name}
						onChangeText={ (text) => {
							this.setState({
								first_name: text
							});
							this.checkFirstName(text);
						}}
					/>
					{
						this.renderErrorMessage(this.state.first_name_error_message)
					}
				</View>

				<View
					style={styles.paragraph}
				>
					<Text
						style={[styles.paragraph_text, {
							color: theme.textColor
						}]}
					>
						{t('last_name')}
					</Text>
					<TextInput
						style={[styles.text_input, {
							color: theme.textColor,
							borderBottomColor: theme.textColor
						}]}
						autoCorrect={true}
						autoCapitalize='words'
						placeholder={t('last_name')}
						placeholderTextColor={theme.placeholderTextColor}
						value={this.state.last_name}
						onChangeText={ (text) => {
							this.setState({
								last_name: text
							});
							this.checkLastName(text);
						}}
					/>
					{
						this.renderErrorMessage(this.state.last_name_error_message)
					}
				</View>

				<View
					style={styles.paragraph}
				>
					<Text
						style={[styles.paragraph_text, {
							color: theme.textColor
						}]}
					>
						{t('email')}
					</Text>
					<TextInput
						style={[styles.text_input, {
							color: theme.textColor,
							borderBottomColor: theme.textColor
						}]}
						autoCorrect={false}
						autoCapitalize='none'
						keyboardType='email-address'
						placeholder={t('email')}
						placeholderTextColor={theme.placeholderTextColor}
						value={this.state.email}
						onChangeText={ (text) => {
							this.setState({
								email: text
							});
							this.checkEmail(text);
						}}
					/>
					{
						this.renderErrorMessage(this.state.email_error_message)
					}
				</View>

				<View
					style={styles.paragraph}
				>
					<Text
						style={[styles.paragraph_text, {
							color: theme.textColor
						}]}
					>
						{t('password')}
					</Text>
					<TextInput
						style={[styles.text_input, {
							color: theme.textColor,
							borderBottomColor: theme.textColor
						}]}
						autoCorrect={true}
						autoCapitalize='none'
						secureTextEntry={true}
						placeholder={t('password')}
						placeholderTextColor={theme.placeholderTextColor}
						value={this.state.password}
						onChangeText={ (text) => {
							this.setState({
								password: text
							});
							this.checkPassword(text);
						}}
					/>
					{
						this.renderErrorMessage(this.state.password_error_message)
					}
				</View>

				<View
					style={styles.paragraph}
				>
					<Text
						style={[styles.paragraph_text, {
							color: theme.textColor
						}]}
					>
						{t('confirm_password')}
					</Text>
					<TextInput
						style={[styles.text_input, {
							color: theme.textColor,
							borderBottomColor: theme.textColor
						}]}
						autoCorrect={true}
						autoCapitalize='none'
						secureTextEntry={true}
						placeholder={t('confirm_password')}
						placeholderTextColor={theme.placeholderTextColor}
						value={this.state.confirm_password}
						onChangeText={ (text) => {
							this.setState({
								confirm_password: text
							});
							this.checkConfirmPassword(text);
						}}
					/>
					{
						this.renderErrorMessage(this.state.confirm_password_error_message)
					}
				</View>

				<View
					style={styles.paragraph}
				>
					<View style={{flexDirection: "row"}}>
						<CheckBox
							style={{flex: 1}}
							value={this.state.terms_and_conditions_checked}
							onValueChange={ (value) => {
								this.setState({
									terms_and_conditions_checked: value
								});
							}}
							tintColors={{true: theme.primaryColor, false: theme.textColor}}
						/>
						<Text
							style={[styles.paragraph_text, {
								textAlignVertical: "center",
								color: theme.textColor,
								flex: 8
							}]}
						>
							{t('agreement')}
							<TouchableOpacity
								onPress={ () => {
									this.props.navigation.navigate('terms_and_conditions', {});
								}}
							>
								<Text
									style={[styles.paragraph_text, {
										color: theme.primaryColor
									}]}
								>
									{t('terms_and_conditions')}
								</Text>
							</TouchableOpacity>
						</Text>
					</View>
				</View>

				<View
					style={[styles.paragraph, {
						marginBottom: "30%"
					}]}
				>
					<TouchableOpacity
						style={{
							alignSelf: "center",
							backgroundColor: theme.primaryColor,
							paddingVertical: 8,
							paddingHorizontal: 32,
							borderRadius: 8,
							opacity: create_account_button_enabled ? 1: theme.buttonDisabledOpacity
						}}
						disabled={!create_account_button_enabled}
						onPress={ () => this.createAccount() }
					>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 18,
							}}
						>
							{t('create_account')}
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	paragraph:{
		marginHorizontal: '10%',
		marginTop: '8%',
	},
	paragraph_text:{
		fontSize: 18,
	},
	text_input:{
		fontSize: 20,
		padding: 6,
		borderBottomWidth: 2,
	}
});
