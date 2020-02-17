import React, {Component} from "react";
import {Picker, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class AddDeviceScreen extends Component{
	constructor() {
		super();
		this.state = {
			deviceModels: [],
			new_device_name: '',
			new_device_serial: '',
		};
		this.loadDeviceModels();
	}

	loadDeviceModels(){
		fetch('https://dashboard.xeosmarthome.com/api/device_models', {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({ deviceModels:response})
		}).catch((error) => {
			alert(error)
		})
	}


	renderDeviceModelDropdown(){

	}

	render(){
		return(
			<SafeAreaView style={styles.container}>
				<Text style={styles.inputHint}>
					Name <Text style={{fontSize: 16}}>(Customize your device name)</Text>
				</Text>
				<TextInput
					style={styles.inputText}
					placeholder="Device name"
					autoCorrect={true}
					autoCapitalize='none'
					value={this.state.new_device_name}
					onChangeText={text => this.setState({new_device_name: text}) }
				/>
				<Text style={styles.inputHint}>
					Serial <Text style={{fontSize: 16}}>(Unique id written on device back)</Text>
				</Text>
				<TextInput
					style={styles.inputText}
					placeholder="Device serial"
					autoCorrect={true}
					autoCapitalize='none'
					value={this.state.new_device_serial}
					onChangeText={text => this.setState({new_device_serial: text}) }
				/>

			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 10,
		backgroundColor: '#F5F5F5'
	},
	inputText:{
		padding: 8,
		margin: 5,
		marginBottom: 20,
		fontSize: 20,
		//backgroundColor: '#c4c7ce',
		borderBottomWidth: 2,
	},
	inputHint:{
		fontSize: 22,
		margin: 5
	},
	saveButton:{
		alignSelf: 'flex-end',
		width: '20%',
		margin: 10
	}
});
