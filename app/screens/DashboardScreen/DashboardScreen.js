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
	TouchableOpacity,
	YellowBox
} from "react-native";
import {API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL, API_LOAD_DEVICES, BOOTSTRAP_COLOR_LIGHT} from "../../constants";
import io from "socket.io-client";
import {Icon} from "react-native-elements";

export let socket_io = io('http://xeosmarthome.com', {transports: ['websocket'], timeout: 30000});
//let socket = io('ws://xeosmarthome.com/socket.io');


export default class DashboardScreen extends Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: "My Profile!",
		headerRight:
			<TouchableOpacity onPress={()=>{navigation.navigate('account_options')}}>
				<Image
					style={{height: 40, width: 40, margin: 10}}
					source={require('../../assets/images/user_icon.png')}
				/>
			</TouchableOpacity>,
	});

	constructor() {
		super();
		this.state = {
			devices: ['add_button'],
			refreshing: true
		};
		this.initWebSocket();
	}

	initWebSocket(){
		YellowBox.ignoreWarnings([
			'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
		]);

		//this.socket.connect();
		/*socket_io.on('connect', () => {
			console.warn('connected');
		});

		socket_io.on('message', (message) => {
			console.warn(message);
		});*/
	}

	componentDidMount(){
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadDevices();
			}
		);
	}

	componentWillUnmount() {
		this.socket.close();
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
		if(typeof device !== 'string')
			return (
				<TouchableOpacity
					onPress={ (event) =>{this.props.navigation.navigate('control_device', {device_id: device.id})}}
					onLongPress={()=>{this.props.navigation.navigate('device_settings', {device_id: device.id})}}
					style={styles.deviceBox}>
					<View style={styles.imageView}>
						<Image
							style={styles.deviceImage}
							source={{uri: device.image !== '' ? API_DEVICE_IMAGES_URL + device.image : API_DEFAULT_IMAGES_URL + device['default_image']}}
						/>
					</View>

					<View style={styles.nameView}>
						<Text style={styles.deviceName}>{ device.name.length < 15 ? device.name : device.name.substr(0, 14) + '...' }</Text>
					</View>
				</TouchableOpacity>
			);
		return (
			<TouchableOpacity
				onPress={ () => {this.props.navigation.navigate('add_device');}}
				onLongPress={()=>{}}
				style={styles.deviceBox}>
				<View style={{flex: 1, marginTop: 10}}>
					<Icon name="add-circle-outline" type='material' size={100} />
				</View>
				<View style={styles.nameView}>
					<Text style={{fontSize: 22}}>Add device</Text>
				</View>
			</TouchableOpacity>
		)
	}

	render(){
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
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
		paddingHorizontal: 10,
		paddingTop: 10,
		backgroundColor: '#F5F5F5'
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
