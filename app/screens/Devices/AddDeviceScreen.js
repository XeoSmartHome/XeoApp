import React, {Component, useEffect, useState} from "react";
import {Button, Modal, Picker, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {API_ADD_DEVICE, API_LOGIN_URL, BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_PRIMARY, XEO_BLUE} from "../../constants";
import I18N from 'i18n-js'


const t = (key) => I18N.t('add_device.' + key);


export default class AddDeviceScreen extends Component{
	constructor() {
		super();
		this.state = {
			new_device_name: '',
			new_device_serial: '',
			showQRCodeScanner: false
		};
	}

	requestDeviceAdd(){
		fetch(API_ADD_DEVICE, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.new_device_name,
				serial: this.state.new_device_serial,
			}),
		}).then(
			(response) => response.json()
		).then(response => {
			if(response.status === 200) {
				this.props.navigation.goBack();
			}
			if(response.status === 400){
				switch (response.error) {
					case 'ValueError':
						alert('value error')
						break;
					case 'DeviceTypeNotFound':
						alert('Serial invalid')
						break;
				}
			}
		}).catch((error) => {
			alert(error)
		});
	}

	openQRCodeScanner(){
		BarCodeScanner.requestPermissionsAsync().then( (status) => {
			if(status.granted)
				this.setState({showQRCodeScanner: true});
		});
	}

	render(){
		const {theme} = this.props.screenProps;
		const add_device_button_enabled = this.state.new_device_name.length !== 0 && this.state.new_device_serial.length !== 0;
		return(
			<SafeAreaView style={[styles.container, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<Text style={[styles.inputHint, {
					color: theme.textColor
				}]}>
					{ t('name') } <Text style={{fontSize: 16}}>({t('name_info')})</Text>
				</Text>
				<TextInput
					style={[styles.inputText,{
						color: theme.textColor
					}]}
					placeholder="Device name"
					placeholderTextColor={theme.placeholderTextColor}
					autoCorrect={true}
					autoCapitalize='sentences'
					value={this.state.new_device_name}
					onChangeText={text => this.setState({new_device_name: text}) }
				/>
				<Text style={[styles.inputHint, {
					color: theme.textColor
				}]}>
					{t('serial')} <Text style={{fontSize: 16}}>({t('serial_info')})</Text>
				</Text>
				<TextInput
					style={[styles.inputText, {
						color: theme.textColor
					}]}
					placeholder="Device serial"
					placeholderTextColor={theme.placeholderTextColor}
					autoCorrect={true}
					autoCapitalize='none'
					value={this.state.new_device_serial}
					onChangeText={text => this.setState({new_device_serial: text}) }
				/>
				<View style={{width: '40%', left: 10}}>
					<TouchableOpacity
						style={{backgroundColor: BOOTSTRAP_COLOR_PRIMARY, padding: 8, borderRadius: 10}}
						onPress={this.openQRCodeScanner.bind(this)}
					>
						<Text
							style={{color: BOOTSTRAP_COLOR_LIGHT, fontSize: 16, alignSelf: "center"}}
						>
							{t('scan_qr_code_button')}
						</Text>
					</TouchableOpacity>
				</View>
				<Text style={{padding: 10, fontSize: 16, color: theme.textColor}}>
					{t('qr_code_info')}
				</Text>
				<View style={{position: 'absolute', bottom: 40, right: 40, left: 40}}>
					<TouchableOpacity
						style={{
							backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
							padding: 8,
							borderRadius: 10,
							opacity: add_device_button_enabled ? 1 : theme.buttonDisabledOpacity,
						}}
						disabled={!add_device_button_enabled}
						onPress={ () => {this.requestDeviceAdd()}}
					>
						<Text
							style={{color: BOOTSTRAP_COLOR_LIGHT, fontSize: 16, alignSelf: "center"}}
						>
							{t('confirm_button')}
						</Text>
					</TouchableOpacity>
				</View>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.showQRCodeScanner}
					onRequestClose={()=>{
						this.setState({showQRCodeScanner: false})
					}}
				>
					<View style={{flex:1, width: '70%', alignSelf:'center'}}>
						<BarCodeScanner
							onBarCodeScanned={({ type, data })=>{
								this.setState({showQRCodeScanner: false, new_device_serial: data})
							}}
							style={StyleSheet.absoluteFillObject}
						/>
					</View>
				</Modal>

			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 10,
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

