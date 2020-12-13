import React from "react";
import Swiper from 'react-native-swiper'
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, TextInput} from "react-native";
import {
	API_DEFAULT_IMAGES_URL,
	API_DEVICE_IMAGES_URL,
	API_LOAD_DEVICES,
	API_URL, BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY
} from "../../constants";
import {AntDesign} from "@expo/vector-icons";
import {Input} from "react-native-elements";


export default class RoomsScreenV4 extends React.Component {
	constructor() {
		super();
		this.state = {
			house_id: 1,
			rooms: [],
			devices: [],
			creating_room: false,
			new_room_name: null,

		};
	}

	componentDidMount() {
		this.loadRooms();
		this.loadDevices();
	}


	getFetchRoomsArguments() {
		return new URLSearchParams({
			house_id: 1
		});
	}

	fetchRooms(request_args) {
		const API_GET_HOUSE_ROOMS = API_URL + 'get_house_rooms';
		return fetch(`${API_GET_HOUSE_ROOMS}?${request_args}`, {method: 'GET'});
	}

	fetchRoomsCallback(response) {
		return response.json()
	}

	fetchRoomsSetState(response) {
		this.setState({
			rooms: response['rooms']
		});
	}

	loadRooms() {
		this.fetchRooms(this.getFetchRoomsArguments()).then(this.fetchRoomsCallback).then(this.fetchRoomsSetState.bind(this)).catch((error) => console.warn(error));
	}


	fetchDevices() {
		return fetch(API_LOAD_DEVICES, {method: 'GET'});
	}

	fetchDevicesCallback(response) {
		return response.json()
	}

	fetchDevicesSetState(response) {
		this.setState({
			devices: response
		});
	}

	loadDevices() {
		this.fetchDevices().then(this.fetchDevicesCallback).then(this.fetchDevicesSetState.bind(this)).catch((error) => console.warn(error));
	}


	getFetchCreateRoomArguments(house_id, room_name) {
		return JSON.stringify({
			house_id: house_id,
			name: room_name
		});

	}

	fetchCreateRoom(request_args) {
		const API_CREATE_ROOM = API_URL + 'create_room';
		return fetch(`${API_CREATE_ROOM}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: request_args
		});
	}

	fetchCreateRoomCallback(response) {
		return response.json();
	}

	fetchCreateRoomSetStateCallback(response) {
		this.loadRooms();
		this.setState({});
	}

	createRoom(house_id, room_name) {
		this.fetchCreateRoom(this.getFetchCreateRoomArguments(house_id, room_name)).then(this.fetchCreateRoomCallback).then(this.fetchCreateRoomSetStateCallback.bind(this)).catch((error) => console.warn(error));
	}


	getFetchDeleteRoomArguments(house_id, room_id) {
		return JSON.stringify({
			house_id: house_id,
			room_id: room_id
		});
	}

	fetchDeleteRoom(request_args) {
		const API_DELETE_ROOM = API_URL + 'delete_room';
		return fetch(`${API_DELETE_ROOM}?${request_args}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.new_room_name,
			})
		})
	}

	fetchDeleteRoomCallback(response) {
		return response.json();
	}

	fetchDeleteRoomSetStateCallback(response) {
		this.setState({

		});
	}

	deleteRoom() {
		this.fetchDeleteRoom(this.getFetchDeleteRoomArguments(this.state.house_id, this.state.new_room_name)).then(this.fetchDeleteRoomCallback).then(this.fetchDeleteRoomSetStateCallback).catch((error) => console.warn(error));
	}

	openCreateRoomInterface() {
		this.setState({
			creating_room: true,
		});
	}

	onNewRoomMameInputChangeText(text) {
		this.setState({
			new_room_name: text
		});
	}

	createRoomButtonPress() {
		this.createRoom(this.state.house_id, this.state.new_room_name);
	}

	renderCrateRoomFields() {
		const {theme} = this.props.screenProps;

		return (
			<View
				style={{
					backgroundColor: theme.screenBackgroundColor,
					flex: 1,
					//justifyContent: "center"
				}}
			>
				<TextInput
					style={[styles.new_room_name_input, {
						borderColor: theme.textColor,
						color: theme.textColor
					}]}
					value={this.state.new_room_name}
					onChangeText={this.onNewRoomMameInputChangeText.bind(this)}
					placeholder={'Room name'}
					placeholderTextColor={theme.secondaryColor}
					autoCapitalize='sentences'
					autoFocus={true}
				/>

				<TouchableOpacity
					style={{
						width: '50%',
						backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
						padding: 8,
						borderRadius: 6,
						//marginRight: '10%',
						alignSelf: 'center',
						marginTop: '10%',
						//opacity: button_dissabled ? theme.buttonDisabledOpacity : 1
					}}
					//disabled={button_dissabled}
					onPress={this.createRoomButtonPress.bind(this)}
				>
					<Text
						style={{
							fontSize: 20,
							color: BOOTSTRAP_COLOR_LIGHT,
							alignSelf: 'center'
						}}
					>
						Create room
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderTabCreateRoom() {
		const {theme} = this.props.screenProps;

		if (this.state.creating_room === true)
			return this.renderCrateRoomFields();

		return (
			<View
				style={{
					backgroundColor: theme.screenBackgroundColor,
					flex: 1,
					justifyContent: "center"
				}}
			>
				<TouchableOpacity
					style={{
						alignSelf: "center",
						alignItems: "center",
						//borderWidth: 1,
						width: '80%'
					}}
					onPress={this.openCreateRoomInterface.bind(this)}
				>
					<AntDesign
						name="pluscircleo"
						size={60}
						color={theme.textColor}
						style={{}}
					/>
					<Text
						style={{
							color: theme.textColor,
							fontSize: 24
						}}
					>
						ADD ROOM
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderAddDeviceInRoomButton(room) {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('add_device_in_room', {
						house_id: this.state.house_id,
						room_id: room.id,
						room_name: room.name
					});
				}}
				style={styles.fab}
			>
				<Text style={styles.fabIcon}>+</Text>
			</TouchableOpacity>
		)
	}

	renderDeviceBox(device, device_index) {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				onPress={(event) => {
					this.props.navigation.navigate('control_device', {device_id: device.id})
				}}
				onLongPress={() => {
					this.props.navigation.navigate('room_device_options', {
						device_id: device.id,
						house_id: this.state.house_id,
						room_id: this.state.room_id,
						room_name: this.state.room_name
					})
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
						{device.name.length < 15 ? device.name : device.name.substr(0, 14) + '...'}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderDevices(room, devices) {
		const {theme} = this.props.screenProps;

		return (
			<FlatList
				numColumns={2}
				//refreshing={this.state.refreshing}
				data={devices}
				renderItem={({item, index}) => this.renderDeviceBox(item, index)}
				keyExtractor={item => `room_${room.name}_device_${item.name}`}
				//onRefresh={()=>{this.loadDevicesFromRoom()}}
				contentContainerStyle={{
					paddingBottom: '12%'
				}}
			/>
		)
	}

	getDevicesFromRoom(room) {
		return room['devices_ids'].map((device_id) => this.state.devices.find((device) => device.id === device_id));
	}

	renderRoom(room, room_index) {
		const {theme} = this.props.screenProps;
		return (
			<View
				key={`room_${room_index}`}
				style={{
					backgroundColor: theme.screenBackgroundColor,
					padding: '3%',
					flex: 1
				}}
			>
				<View
					style={{
						paddingBottom: '3%',
						borderBottomWidth: 2,
						borderBottomColor: theme.textColor
					}}
				>
					<Text
						style={{
							color: theme.textColor,
							fontSize: 22,
							alignSelf: "center",
						}}
					>
						{
							room['name']
						}
					</Text>
				</View>
				{
					this.renderDevices(room, this.getDevicesFromRoom(room))
				}
				{
					this.renderAddDeviceInRoomButton(room)
				}
			</View>
		);
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<Swiper
				style={styles.wrapper}
				showsPagination={true}
				showsButtons={false}
				loop={false}
				activeDotColor={theme.primaryColor}
			>
				{
					//this.state.rooms.map(this.renderRoom.bind(this)).concat(this.renderTabCreateRoom())
					this.renderTabCreateRoom()
				}
			</Swiper>
		)
	}
}


const styles = StyleSheet.create({
	wrapper: {},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB'
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5'
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9'
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	},
	container: {
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
		borderWidth: 2,
		borderRadius: 15,
		//backgroundColor: '#c4c7ce',
		borderColor: '#4267b2',
	},
	imageView: {
		flex: 3,
		//backgroundColor: 'blue'
	},
	deviceImage: {
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 30
	},
	nameView: {
		flex: 1,
		//backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center'
	},
	deviceName: {
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
	},
	new_room_name_input: {
		marginTop: '20%',
		fontSize: 24,
		borderRadius: 8,
		borderWidth: 2,
		padding: 8,
		width: '75%',
		alignSelf: 'center'
	}
})
