import React, {Component} from "react";
import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Button, View} from "react-native";
import {API} from "../../api/api";


export default class AccountSettings extends Component{
	constructor() {
		super();
		this.state = {
			user:{
				first_name: '',
				last_name:'',
				email:'',
				phone_number:'',
			}
		};
		this.loadUserProfile();
	}

	loadUserProfile(){
		API.account.getUserProfile().then((response) => {
				this.setState({ first_name: response.first_name});
				this.setState({ last_name: response.last_name});
				this.setState({ email: response.email});
			}
		).catch((error) => {
			alert(error)
		});
	}


	saveUserProfile(){
		/*API.account.upda({

		});*/
		fetch('https://dashboard.xeosmarthome.com/api/update_user_profile', {
				method: 'POST',
			body: JSON.stringify({
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
			})
		}
		).then(
			(response) => response.json()
		).then((response) => {
			if(response['status'] === 'success')
				alert('Chances successfully saved');
			else
				alert('Invalid data. Please check input.');
			}
		).catch((error) => {
			alert(error)
		})
	}

	render(){
		return(
			<SafeAreaView style={styles.container}>
				<Text style={styles.inputHint}>First name</Text>
				<TextInput
					style={styles.textInput}
					placeholder="First name"
					autoCorrect={true}
					autoCapitalize='words'
					value={this.state.first_name}
					onChangeText={text => this.setState({first_name: text}) }
				/>
				<Text style={styles.inputHint}>Last name</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Last name"
					autoCorrect={true}
					autoCapitalize='words'
					value={this.state.last_name}
					onChangeText={text => this.setState({last_name: text}) }
				/>
				<Text style={styles.inputHint}>Email</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Email"
					autoCorrect={true}
					autoCapitalize='words'
					value={this.state.email}
					onChangeText={text => this.setState({email: text} ) }
				/>
				<View style={styles.saveButton}>
					<Button title="save" onPress={() => {this.saveUserProfile()} }/>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: '5%',
		backgroundColor: '#F5F5F5'
	},
	textInput:{
		padding: 8,
		marginHorizontal: 10,
		fontSize: 20,
		//backgroundColor: '#c4c7ce',
		borderBottomWidth: 2,
	},
	inputHint:{
		fontSize: 20,
		marginHorizontal: 10,
		marginTop: 15
	},
	saveButton:{
		alignSelf: 'flex-end',
		width: '20%',
		margin: 10
	},
});
