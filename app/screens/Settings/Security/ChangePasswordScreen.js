import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import {Icon} from "react-native-elements";
import {API_UPDATE_PASSWORD, BOOTSTRAP_COLOR_DANGER, BOOTSTRAP_COLOR_LIGHT, XEO_BLUE} from "../../../constants";

export default class ChangePasswordScreen extends Component{
	constructor() {
		super();
		this.state = {
			current_password: '',
			new_password: '',
			confirm_new_password: '',
		}
	}

	render(){
		return(
			<SafeAreaView>
				<TextInput
					style={styles.text_input}
					value={this.state.current_password}
					onChangeText={ (value) => {
						this.setState({current_password: value})
					}}
					placeholder='Current password'
					secureTextEntry={true}
				/>
				<TextInput
					style={styles.text_input}
					value={this.state.new_password}
					onChangeText={ (value) => {
						this.setState({new_password: value})
					}}
					placeholder='New password'
					secureTextEntry={true}
				/>
				<TextInput
					style={styles.text_input}
					value={this.state.confirm_new_password}
					onChangeText={ (value) => {
						this.setState({confirm_new_password: value})
					}}
					placeholder='New password, again'
					secureTextEntry={true}
				/>
				<TouchableOpacity
					style={styles.save_button}
					onPress={() => {this.requestUpdatePassword()}}
				>
					<Text style={styles.save_button_text}>
						Save
					</Text>
				</TouchableOpacity>
				<Text style={styles.explanation}>

				</Text>
			</SafeAreaView>
		)
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
				if(response.status === 'success'){
					this.props.navigation.goBack();
				}else {
					alert(response.message);
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
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
	explanation: {
		fontSize: 16,
		margin: '5%',
	},
	save_button:{
		backgroundColor: XEO_BLUE,
		width: '20%',
		borderRadius: 10,
		padding: 8,
		alignSelf: 'flex-end',
		marginRight: '10%',
		marginTop: '8%'
	},
	save_button_text:{
		fontSize: 20,
		color: BOOTSTRAP_COLOR_LIGHT,
		alignSelf: 'center'
	},
	warning_text:{
		color: BOOTSTRAP_COLOR_DANGER,
		fontSize: 16
	}
});
