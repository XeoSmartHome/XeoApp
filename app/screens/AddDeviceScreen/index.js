import React, {Component, useEffect, useState} from "react";
import {Button, Modal, Picker, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {API_ADD_DEVICE, API_LOGIN_URL} from "../../constants";
import * as ImagePicker from 'expo-image-picker';


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
			alert(response.message);
			if(response.status === 'success') {
				this.props.navigation.goBack();
			}
		}).catch((error) => {
			alert(error)
		});
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
				<View style={{width: '40%', left: 10}}>
					<Button title="Scan QR Code" onPress={() => {this.setState({showQRCodeScanner: true}) } }/>
				</View>
				<Text style={{padding: 10, fontSize: 16}}>
					Use the phone's camera to scan the qr code of the device.
				</Text>
				<View style={{position: 'absolute', bottom: 40, right: 40, left: 40}}>
					<Button title="Add device"  onPress={ () => {this.requestDeviceAdd()}}/>
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


/*
function A222() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text style={{alignSelf: 'center'}}>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text style={{alignSelf: 'center'}}>No access to camera</Text>;
	}

	return (
		<View
			style={{flex: 1, width: '75%', alignSelf:'center'}}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
		</View>
	);
}*/
