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
} from "react-native";
import {API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL, API_LOAD_DEVICES} from "../../constants";
import io from "socket.io-client";


//const socket = io("ws://xeosmarthome.com/socket.io");

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
			devices: [],
			refreshing: true
		};
		this.startWebSocket().then(()=>{});
	}

	async startWebSocket(){
		/*socket.on("chat message", msg => {
			console.warn(msg);
		});*/
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
			this.setState({ devices: response, refreshing: false})
		}
		).catch((error) => {
			alert(error)
		})
	}

	DeviceBox(device) {
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
					<Text style={styles.deviceName}>{device.name}</Text>
				</View>
			</TouchableOpacity>
		);
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
				{this.AddDeviceButton()}
			</SafeAreaView>
		)
	}

	AddDeviceButton(){
		return (
			<TouchableOpacity
				onPress={()=> {
					this.props.navigation.navigate('add_device');
				}}
				style={styles.fab}
			>
				<Text style={styles.fabIcon}>+</Text>
			</TouchableOpacity>
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
		fontSize: 20
	},
	fab: {
		position: 'absolute',
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		right: 20,
		bottom: 20,
		backgroundColor: '#4267b2',
		borderRadius: 30,
		elevation: 8
	},
	fabIcon: {
		top: -2,
		fontSize: 50,
		color: 'white'
	}
});
