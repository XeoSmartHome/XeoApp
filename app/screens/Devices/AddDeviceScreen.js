import React, {Component, useEffect, useState} from "react";
import {
	Button,
	Modal,
	Picker,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	View
} from "react-native";
import {BarCodeScanner} from 'expo-barcode-scanner';
import I18N from 'i18n-js'
import {API} from "../../api/api";
import {translator} from "../../lang/translator";


const t = translator('add_device');


export default class AddDeviceScreen extends Component {
	constructor() {
		super();
		this.state = {
			new_device_name: '',
			new_device_serial: '',
			showQRCodeScanner: false
		};
		this.registerDeviceCallback = this.registerDeviceCallback.bind(this);
	}

	registerDeviceCallback(response) {
		if (response.status === 200) {
			this.props.navigation.goBack();
		}
		if (response.status === 400) {
			switch (response.error) {
				case 'ValueError':
					ToastAndroid.show("value error", ToastAndroid.LONG);
					break;
				case 'DeviceTypeNotFound':
					ToastAndroid.show("Serial invalid", ToastAndroid.LONG);
					break;
			}
		}
	}

	registerDevice() {
		API.devices.registerDevice({
			name: this.state.new_device_name,
			serial: this.state.new_device_serial
		}).then(
			this.registerDeviceCallback
		).catch(
			(error) => {
				console.warn(error);
			}
		);
	}

	onAddDevicePress() {
		this.registerDevice();
	}

	openQRCodeScanner() {
		BarCodeScanner.requestPermissionsAsync().then((status) => {
			if (status.granted)
				this.setState({showQRCodeScanner: true});
		});
	}

	onScanQrCodeCancelButtonPress() {
		this.setState({
			showQRCodeScanner: false
		});
	}

	renderQRCodeScannerModal() {
		const {theme} = this.props.screenProps;
		return (
			<Modal
				animationType="fade"
				transparent={false}
				visible={this.state.showQRCodeScanner}
				onRequestClose={() => {
					this.setState({showQRCodeScanner: false})
				}}
			>
				<View style={{backgroundColor: theme.screenBackgroundColor, flex: 1}}>
					<BarCodeScanner
						onBarCodeScanned={({type, data}) => {
							this.setState({showQRCodeScanner: false, new_device_serial: data})
						}}
						style={{flex: 1}}
					/>

					<TouchableOpacity
						style={{
							backgroundColor: theme.dangerColor,
							padding: 8,
							borderRadius: 10,
							margin: '5%',
							width: '75%',
							alignSelf: "center"
						}}
						onPress={() => {
							this.onScanQrCodeCancelButtonPress()
						}}
					>
						<Text
							style={{color: theme.lightColor, fontSize: 16, alignSelf: "center"}}
						>
							{
								t('close_qr_code_scanner')
							}
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		)
	}

	render() {
		const {theme} = this.props.screenProps;
		const add_device_button_enabled = this.state.new_device_name.length !== 0 && this.state.new_device_serial.length !== 0;
		return (
			<SafeAreaView style={[styles.container, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<Text
					style={[styles.inputHint, {
						color: theme.textColor
					}]}
				>
					{t('name')} <Text style={{fontSize: 16}}>({t('name_info')})</Text>
				</Text>
				<TextInput
					style={[styles.inputText, {
						color: theme.textColor,
						borderColor: theme.textColor
					}]}
					placeholder={t('device_name_placeholder')}
					placeholderTextColor={theme.placeholderTextColor}
					autoCorrect={true}
					autoCapitalize='sentences'
					value={this.state.new_device_name}
					onChangeText={text => this.setState({new_device_name: text})}
				/>
				<Text style={[styles.inputHint, {
					color: theme.textColor,
				}]}>
					{t('serial')} <Text style={{fontSize: 16}}>({t('serial_info')})</Text>
				</Text>
				<TextInput
					style={[styles.inputText, {
						color: theme.textColor,
						borderColor: theme.textColor
					}]}
					placeholder={t('device_serial_placeholder')}
					placeholderTextColor={theme.placeholderTextColor}
					autoCorrect={true}
					autoCapitalize='none'
					value={this.state.new_device_serial}
					onChangeText={text => this.setState({new_device_serial: text})}
				/>
				<View style={{width: '40%', left: 10}}>
					<TouchableOpacity
						style={{backgroundColor: theme.primaryColor, padding: 8, borderRadius: 10}}
						onPress={this.openQRCodeScanner.bind(this)}
					>
						<Text
							style={{color: theme.lightColor, fontSize: 16, alignSelf: "center"}}
						>
							{t('scan_qr_code_button')}
						</Text>
					</TouchableOpacity>
				</View>
				<Text style={{padding: 10, fontSize: 16, color: theme.textColor}}>
					{t('qr_code_info')}
				</Text>
				<View style={{marginTop: '10%'}}>
					<TouchableOpacity
						style={{
							backgroundColor: theme.primaryColor,
							padding: 8,
							borderRadius: 10,
							opacity: add_device_button_enabled ? 1 : theme.buttonDisabledOpacity,
						}}
						disabled={!add_device_button_enabled}
						onPress={() => this.onAddDevicePress()}
					>
						<Text
							style={{color: theme.lightColor, fontSize: 16, alignSelf: "center"}}
						>
							{t('confirm_button')}
						</Text>
					</TouchableOpacity>
				</View>

				{this.renderQRCodeScannerModal()}

			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	inputText: {
		padding: 8,
		margin: 5,
		marginBottom: 20,
		fontSize: 20,
		borderBottomWidth: 2,
	},
	inputHint: {
		fontSize: 22,
		margin: 5
	},
	saveButton: {
		width: '20%',
		margin: 10
	}
});

