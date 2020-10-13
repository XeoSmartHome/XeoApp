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
	TextInput,
	BackHandler
} from "react-native";
import {
	API_DEFAULT_IMAGES_URL,
	API_DEVICE_IMAGES_URL,
	API_LOAD_DEVICES,
	API_URL,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	XEO_BLUE
} from "../../constants";



export default class RoomScreen extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Room: ' + ( navigation.state.params.room_name === undefined ? '' : navigation.state.params.room_name )
	});

	constructor() {
		super();
		this.state = {
			house_id: 0,
			room_id: 0,
			devices: [],
			refreshing: true
		};
	}

	componentDidMount(){
		this.state.house_id = this.props.navigation.state.params.house_id;
		this.state.room_id = this.props.navigation.state.params.room_id;

		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadDevicesFromRoom();
			}
		);
	}

	componentWillUnmount(){
	}

	DeviceBox(device) {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				onPress={ (event) =>{this.props.navigation.navigate('control_device', {device_id: device.id})}}
				onLongPress={()=>{
					this.props.navigation.navigate('room_device_options', {device_id: device.id, house_id: this.state.house_id, room_id: this.state.room_id, room_name: this.state.room_name})
				}}
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
	}

	render(){
		const {theme} = this.props.screenProps;
		return (
			<SafeAreaView style={[styles.container, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<FlatList
					numColumns={2}
					refreshing={this.state.refreshing}
					data={this.state.devices}
					renderItem={({ item}) => this.DeviceBox(item)}
					keyExtractor={item => String(item.id)}
					onRefresh={()=>{this.loadDevicesFromRoom()}}
				/>
				<TouchableOpacity
					onPress={()=> {
						this.props.navigation.navigate('add_device_in_room', {house_id: this.state.house_id, room_id: this.state.room_id, room_name: this.state.room_name});
					}}
					style={styles.fab}
				>
					<Text style={styles.fabIcon}>+</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}

	loadDevicesFromRoom(){
		fetch(API_URL + 'house/' + 1 + '/room/' + this.state.room_id, {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			if(response.status === 'error'){
				alert(response.message);
				return;
			}
			this.props.navigation.setParams({
				room_name: response['name']
			});
			this.setState({
				room_name: response['name'],
				devices: response['devices'],
				refreshing: false
			});
		}).catch((error) => {
			alert(error);
		})
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
