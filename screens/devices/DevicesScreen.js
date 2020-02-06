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
	SectionList
} from 'react-native';

export default class DevicesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {email: '', password: ''};
	}

	drawDevice(device){
		return (
			<View style={{width: '50%', borderWidth: 2, borderRadius: 10}}>
				<Image style={{height: 150 , width: 150}} source={require('../../assets/images/logo_xeo_nobackground.png')}/>
				<Text style={{alignSelf: 'center', fontSize: 24}}>{device.name}</Text>
			</View>
		)
	}

	loadDevices() {
		let response = fetch('https://dashboard.xeosmarthome.com/api/devices', {
				method: 'GET'
			}
		);
		let device = {id: 1, name: 'Feeder', image: ''};
		return (this.drawDevice(device));
	}

	render() {
		return (

			<View style={{}}>
				<Text style={{fontSize: 30, alignSelf: 'center'}}>Your devices</Text>
				{this.loadDevices()}
				{this.loadDevices()}
				{this.loadDevices()}

			</View>
		);
	}
}
