import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	SafeAreaView,
	TouchableOpacity, StatusBar,
} from "react-native";
import {API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL, API_LOAD_DEVICES} from "../../constants";
import io from "socket.io-client";
import {Icon} from "react-native-elements";
// noinspection ES6CheckImport
import {t} from 'i18n-js';

export let socket_io = io('https://xeosmarthome.com', {transports: ['websocket'], timeout: 30000});


export default class DashboardScreen extends Component{
	constructor() {
		super();
		this.state = {
			devices: [],
			refreshing: true
		};
	}

	componentDidMount(){
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadDevices();
			}
		);
	}

	loadDevices(){
		fetch(API_LOAD_DEVICES, {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({ devices: response.concat('add_button'), refreshing: false})
		}
		).catch((error) => {
			alert(error)
		})
	}

	DeviceBox(device) {
		const {mode, theme, setTheme} = this.props.screenProps;
		if(typeof device !== 'string')
			return (
				<TouchableOpacity
					onPress={ () =>{this.props.navigation.navigate('control_device', {device_id: device.id})}}
					onLongPress={()=>{this.props.navigation.navigate('device_settings', {device_id: device.id})}}
					style={styles.deviceBox}>
					<View style={styles.imageView}>
						<Image
							style={styles.deviceImage}
							source={{uri: device.image !== '' ? API_DEVICE_IMAGES_URL + device.image : API_DEFAULT_IMAGES_URL + device['default_image']}}
						/>
					</View>

					<View style={styles.nameView}>
						<Text style={[styles.deviceName, {
							color: theme.textColor
						}]}>
							{ device.name.length < 15 ? device.name : device.name.substr(0, 14) + '...' }
						</Text>
					</View>
				</TouchableOpacity>
			);
		return (
			<TouchableOpacity
				onPress={ () => {this.props.navigation.navigate('add_device');}}
				onLongPress={()=>{}}
				style={styles.deviceBox}>
				<View style={{flex: 1, marginTop: 10}}>
					<Icon
						name="add-circle-outline"
						type='material'
						size={90}
						color={theme.textColor}
					/>
				</View>
				<View style={styles.nameView}>
					<Text style={{
						fontSize: 22,
						color: theme.textColor
					}}>
						{
							t('dashboard.devices.add_device')
						}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}

	render(){
		const {mode, theme, setTheme} = this.props.screenProps;
		return (
			<SafeAreaView style={[styles.container, {backgroundColor: theme.screenBackgroundColor}]}>
				<StatusBar hidden={true}/>
				<FlatList
					style={{paddingHorizontal: 10}}
					numColumns={2}
					refreshing={this.state.refreshing}
					data={this.state.devices}
					renderItem={({ item}) => this.DeviceBox(item)}
					keyExtractor={item => String(item.id)}
					onRefresh={()=>{this.loadDevices()}}
				/>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		//paddingHorizontal: 10,
		paddingTop: 2,
		//backgroundColor: '#F5F5F5'
	},
	deviceBox: {
		height: 170,
		width: '46%',
		marginHorizontal: '2%',
		marginVertical: 10,
		alignSelf: 'center',
		borderWidth: 3,
		borderRadius: 15,
		//backgroundColor: '#c4c7ce',
		borderColor: '#4267b2',
	},
	imageView:{
		flex: 3,
		//backgroundColor: 'blue'
	},
	deviceImage: {
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 30
	},
	nameView:{
		flex: 1,
		//backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center'
	},
	deviceName:{
		fontSize: 18
	},
});
