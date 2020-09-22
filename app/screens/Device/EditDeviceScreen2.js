import React, {Component} from "react";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	SafeAreaView,
	ScrollView,
	SectionList,
	ImageBackground,
	Modal,
	Slider,
	TextInput,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {API_UPDATE_DEVICE_IMAGE, BOOTSTRAP_COLOR_DARK} from "../../constants";


export default class DeviceSettingsScreen2 extends Component{
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			device:{
				id: 0,
				name: '',
				serial: '',
				image: '',
				connected: false,
				active: false,
				schedule_active: false,
				last_connection: '',
				actions:[],
				possible_actions: [],
			},
			hide_serial: true
		};
	}

	async loadDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/device/' + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({ device: response})
			}
		).catch((error) => {
			alert(error)
		});
		return ''
	}

	componentDidMount(): void {
		this.loadDevice().then(()=>{
		});
	}

	setDeviceName(){
		fetch('https://dashboard.xeosmarthome.com/api/set_device_name', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.props.navigation.state.params.device_id,
				name: this.state.device.name
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				if(response.status === 'success'){
					alert('Name successfully changed')
				}else {
					alert('Error 223')
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	removeDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/delete_device', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.props.navigation.state.params.device_id,
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				if(response.status === 'success'){
					alert('Device deleted');
					this.props.navigation.goBack();
				}else {
					alert('An error occurred')
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	async changeDeviceImageAsync() {
		// TODO: style change image button
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: false, // higher res on iOS
			aspect: [4, 3],
		});

		if (result.cancelled) {
			return;
		}

		let localUri = result.uri;
		let filename = localUri.split('/').pop();

		let match = /\.(\w+)$/.exec(filename);
		let type = match ? `image/${match[1]}` : `image`;

		let formData = new FormData();
		formData.append('device_id', this.state.device.id);
		formData.append('image', { uri: localUri, name: filename, type });

		fetch(API_UPDATE_DEVICE_IMAGE, {
			method: 'POST',
			body: formData,
			header: {
				'content-type': 'multipart/form-data',
			},
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				if(response.status === 'success'){
					alert('Image updated');
				}else {
					alert(response.message)
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	onShowSerial(){
		this.setState({
			hide_serial: !this.state.hide_serial
		});
	}

	hideString(str){
		let hide = '';
		for(let i=0; i<str.length - 3; i++)
			hide += '*'
		hide += str.substr(str.length-3);
		return hide;
	}

	render(){
		return (
			<ScrollView style={{width: '96%', alignSelf: 'center'}}>

				<View style={{borderBottomWidth: 2, borderBottomColor: BOOTSTRAP_COLOR_DARK, padding: 10, flexDirection: 'row'}}>
					<Text style={{fontSize: 20, flex: 5}}>
						Name: {this.state.device.name}
					</Text>
					<TouchableOpacity
						style={{ alignSelf: 'flex-end', flex: 1, color: BOOTSTRAP_COLOR_DARK}}
					>
						<Text style={{fontSize: 18,}}>Edit</Text>
					</TouchableOpacity>
				</View>

				<View style={{borderBottomWidth: 2, borderBottomColor: BOOTSTRAP_COLOR_DARK, padding: 10, flexDirection: 'row'}}>
					<Text style={{fontSize: 20, flex: 5}}>
						Serial: {this.state.hide_serial ? this.hideString(this.state.device.serial) : this.state.device.serial}
					</Text>
					<TouchableOpacity
						style={{ alignSelf: 'flex-end', flex: 1, color: BOOTSTRAP_COLOR_DARK}}
						onPress={ () => {
							this.onShowSerial();
						}}
					>
						<Text style={{fontSize: 18,}}>
							{this.state.hide_serial ? 'Show' : 'Hide'}
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
});
