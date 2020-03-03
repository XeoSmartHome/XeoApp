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
	SectionList, ImageBackground, Modal, Slider, TextInput, TouchableOpacity,
} from "react-native";


export default class DeviceSettingsScreen extends Component{
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
			}
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

	render(){
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.inputHint}>
					Device: {this.state.device.name}
				</Text>
				<TextInput
					style={styles.inputText}
					placeholder="Device name"
					autoCorrect={true}
					autoCapitalize='none'
					value={this.state.device.name}
					onChangeText={text => this.setState({device: {name: text} }) }
				/>

				<View style={styles.saveButton}>
					<Button title="save" onPress={() => {this.setDeviceName()} }/>
				</View>
				<Text style={styles.inputHint}>
					Remove device from account
				</Text>
				<TouchableOpacity
					onPress={ () => {
						this.removeDevice();
					}}
				>
					<Text style={styles.removeButton}>
						Remove
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 10,
		backgroundColor: '#F5F5F5',
	},
	inputText:{
		padding: 8,
		margin: 5,
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
	},
	removeButton:{
		fontSize: 18,
		width: '30%',
		padding: 5,
		margin: 10,
		backgroundColor: '#dc3545',
		color: '#ffffff',
		textAlign: 'center',
		borderRadius: 5
	}
});
