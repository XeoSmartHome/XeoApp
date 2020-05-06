import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Button,
	Image,
	TouchableOpacity, SafeAreaView,
} from "react-native";
import {
	BOOTSTRAP_COLOR_DANGER, BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	BOOTSTRAP_COLOR_SECONDARY,
	BOOTSTRAP_COLOR_SUCCESS,
	XEO_BLUE
} from "../constants";


export default class CreateAccount extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			current_input: 1,
			current_input_is_ok: false,
			first_name: '',
			lst_name: '',
			email: '',
			password: '',
			confirm_password: ''
		}

	}

	renderFirstNameInput() {
		return (
			<View style={styles.inputGroup}>
				<Text style={styles.hintText}>
					First name
				</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'First name'}
					autoCapitalize="words"
					autoFocus={true}
					value={this.state.first_name}
					onChangeText={(value) => {
						this.setState({first_name: value});
						if (value === '') {
							this.setState({message: 'Please complete the field', current_input_is_ok: false});
							return;
						}
						if (/\d/.test(value)) {
							this.setState({message: "Characters allowed: a-z, A-Z, ', -", current_input_is_ok: false});
							return;
						}
						this.setState({message: 'OK', current_input_is_ok: true});
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
		return(
			<View style={styles.inputGroup}>
				<Text style={styles.hintText}>
					Last name
				</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Last name'}
					autoCapitalize="words"
					autoFocus={true}
					value={this.state.last_name}
					onChangeText={(value) => {
						this.setState({last_name: value});
						if (value === '') {
							this.setState({message: 'Please complete the field', current_input_is_ok: false});
							return;
						}
						if (/\d/.test(value)) {
							this.setState({message: "Characters allowed: a-z, A-Z, ', -", current_input_is_ok: false});
							return;
						}
						this.setState({message: 'OK', current_input_is_ok: true});
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
		return(
			<View style={styles.inputGroup}>
				<Text style={styles.hintText}>
					Email
				</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Email'}
					autoFocus={true}
					autoCapitalize="none"
					textContentType="emailAddress"
					value={this.state.email}
					onChangeText={(value) => {
						this.setState({email: value});
						if (value === '') {
							this.setState({message: 'Please complete the field', current_input_is_ok: false});
							return;
						}
						//TODO: more conditions for email input
						this.setState({message: 'OK', current_input_is_ok: true});
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
		return(
			<View style={styles.inputGroup}>
				<Text style={styles.hintText}>
					Password
				</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Password'}
					autoFocus={true}
					autoCapitalize="none"
					textContentType="newPassword"
					secureTextEntry={true}
					value={this.state.password}
					onChangeText={(value) => {
						this.setState({password: value});
						if (value === '') {
							this.setState({message: 'Please complete the field', current_input_is_ok: false});
							return;
						}
						this.setState({message: 'OK', current_input_is_ok: true});
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
		return(
			<View style={styles.inputGroup}>
				<Text style={styles.hintText}>
					Confirm password
				</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Confirm password'}
					autoFocus={true}
					autoCapitalize="none"
					textContentType="newPassword"
					secureTextEntry={true}
					value={this.state.confirm_password}
					onChangeText={(value) => {
						this.setState({confirm_password: value});
						if (value === '') {
							this.setState({message: 'Please complete the field', current_input_is_ok: false});
							return;
						}
						if (this.state.password !== value) {
							this.setState({message: "Passwords must match", current_input_is_ok: false});
							return;
						}
						this.setState({message: 'OK', current_input_is_ok: true});
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

	/*renderAlert(){
		return(
			<Text
				style={this.}
			>
				{this.message}
			</Text>
		)
	}*/

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
		return (
			<SafeAreaView style={styles.screen}>
				{this.renderCurrentInput()}
				{ this.state.current_input < 6 &&
				<TouchableOpacity
					style={styles.next_button}
					onPress={ () => {
						if (this.state.current_input_is_ok)
							this.setState({current_input: this.state.current_input + 1, message: '', current_input_is_ok: false});
					}}
				>
					<Text
						style={styles.next_button_text}
					>NEXT</Text>
				</TouchableOpacity>
				}
			</SafeAreaView>
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
		fontSize: 18,
		color: BOOTSTRAP_COLOR_SECONDARY
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
	next_button:{
		left: '60%',
		width: '25%',
		backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
		borderRadius: 8,
		padding: 8,
		marginTop: 5
	},
	next_button_text:{
		fontSize: 18,
		color: BOOTSTRAP_COLOR_LIGHT,
		alignSelf: 'center'
	}
});

