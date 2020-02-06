import React, { Component } from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	View,
	Button,
	Switch,
	CheckBox,
} from 'react-native';

export default class DevicesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {email: '', password: ''};
	}

	drawDevice(device){
	}

	loadDevices(){
		fetch('https://dashboard.xeosmarthome.com/api/devices', {
			method: 'GET'}
		).then((response) => response.json()
		).then((response) => {
			response = response.map((device) => device.name)
			alert(response);
		}
		).catch((error) => {
			alert(error);
		});

		return <Text>Text</Text>
	}

	render() {
		return (
			<View style={{alignItems: 'center'}}>
				<Text style={{fontSize: 24}}>Devices</Text>
				{this.loadDevices()}
			</View>
		);
	}
}
