import React from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	FlatList,
	TextInput,
	Button,
	LogBox,
} from "react-native";
import {AntDesign, Feather, FontAwesome, MaterialIcons, Octicons} from "@expo/vector-icons";
import {Icon, Input} from "react-native-elements";
import {t} from "i18n-js";
import {API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL, API_LOAD_DEVICES, API_URL} from "../../api/api_routes_v_1.0.0.0";
import {FloatingAction} from "react-native-floating-action";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from "react-native-scrollable-tab-view/ScrollableTabBar";
import {DeviceBox} from "../Devices/DeviceBox";
// !!! REPLACE 'ios' with 'android' !!!
// !!! REMOVE getNode() function !!!


export default class HomeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			house_id: 1,
			rooms: [],
			devices: [],
			creating_room: false,
			new_room_name: null,
			tab_index: 0,

			//fab_open: false
		};
	}

	componentDidMount() {
		LogBox.ignoreLogs(['Encountered two children with the same key']);
		this.loadRooms();
		this.loadDevices();
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadRooms();
				this.loadDevices();
			}
		);
	}


	getFetchRoomsArguments() {
		return new URLSearchParams({
			house_id: 1
		});
	}

	fetchRooms(request_args) {
		const API_GET_HOUSE_ROOMS = API_URL + 'rooms';
		return fetch(`${API_GET_HOUSE_ROOMS}?${request_args}`, {method: 'GET'});
	}

	fetchRoomsCallback(response) {
		return response.json();
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
		this.setState({});
	}

	deleteRoom() {
		this.fetchDeleteRoom(this.getFetchDeleteRoomArguments(this.state.house_id, this.state.new_room_name)).then(this.fetchDeleteRoomCallback).then(this.fetchDeleteRoomSetStateCallback).catch((error) => console.warn(error));
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

	renderAddDeviceBox() {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('add_device');
				}}
				onLongPress={() => {
				}}
				style={[styles.deviceBox, {
					borderColor: theme.primaryColor
				}]}>
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

	renderDeviceBox(device, device_index) {
		if (device === 'null')
			return this.renderAddDeviceBox();
		const {theme} = this.props.screenProps;
		return (
			<DeviceBox
				key={device['id']}
				device={device}
				theme={theme}
				onPress={() => {
					this.props.navigation.navigate('control_device', {device_id: device.id})
				}}
				onLongPress={() => {
					this.props.navigation.navigate('device_settings', {
						device_id: device.id,
						house_id: this.state.house_id,
						room_id: this.state.room_id,
						room_name: this.state.room_name
					})
				}}
			/>
		);
	}

	renderDevices(room, devices) {
		const {theme} = this.props.screenProps;
		//console.warn(room['id'])
		return (
			<FlatList
				numColumns={2}
				data={devices}
				keyExtractor={(item, index) => `room-${room['id']}-device-${item['id']}`}
				renderItem={({item, index}) => this.renderDeviceBox(item, index)}
				contentContainerStyle={{
					paddingBottom: '12%'
				}}
			/>
		)
	}

	getDevicesFromRoom(room) {
		return room['devices_ids'].map((device_id) => this.state.devices.find((device) => device.id === device_id));
	}

	getCurrentRoom() {
		if (this.state.tab_index === 0)
			return null;
		return this.state.rooms[this.state.tab_index - 1];
	}

	onAddDeviceButtonPress(room) {
		this.props.navigation.navigate('add_device_in_room', {
			room: room,
			devices: this.state.devices
		});
	}

	onRemoveDeviceButtonPress(room) {
		this.props.navigation.navigate('remove_device_from_room', {
			room: room,
			devices: this.state.devices
		});
	}

	onOrderDevicesButtonPress(room) {
		this.props.navigation.navigate('order_devices_in_room', {
			room: room,
			devices: this.getDevicesFromRoom(room)
		});
	}

	onFloatingActionPressItem(name) {
		const room = this.getCurrentRoom();
		switch (name) {
			case 'add_device':
				this.onAddDeviceButtonPress(room);
				break;
			case 'remove_device':
				this.onRemoveDeviceButtonPress(room);
				break;
			case 'order_devices':
				this.onOrderDevicesButtonPress(room)
				break;
		}
	}


	renderFloatingActionButton() {
		const {theme} = this.props.screenProps;

		const actions = [
			{
				text: "Add device in room",
				icon: <Feather name="plus" size={24} color={theme.lightColor}/>,
				name: "add_device",
				position: 3,
				color: theme.successColor,
			}, {
				text: "Remove device from room",
				icon: <Octicons name="trashcan" size={24} color={theme.lightColor}/>,
				name: "remove_device",
				position: 2,
				color: theme.dangerColor,
			},
			{
				text: "Order devices",
				icon: <Octicons name="list-unordered" size={24} color={theme.lightColor}/>,
				name: "order_devices",
				position: 1,
				color: theme.warningColor,
			},
		];

		return (
			<FloatingAction
				/*floatingIcon={this.state.fab_open ? <Feather name="x" size={24} color={theme.textColor}/> :
					<MaterialIcons name="edit" size={24} color={theme.textColor}/>}*/
				//onOpen={() => this.setState({fab_open: true})}
				//onClose={() => this.setState({fab_open: false})}
				color={theme.primaryColor}
				actions={actions}
				onPressItem={this.onFloatingActionPressItem.bind(this)}
			/>
		)
	}

	renderRoomTab(room, room_index) {
		const {theme} = this.props.screenProps;
		return (
			<View
				key={`room-${room_index}`}
				tabLabel={room['name']}
				style={room_styles.container}
			>
				{
					this.renderDevices(room, this.getDevicesFromRoom(room))
				}
			</View>
		);
	}

	renderAllDevicesTab() {
		const {theme} = this.props.screenProps;
		return (
			<View
				key={'all-devices'}
				tabLabel={'ALL DEVICES'}
				style={{
					backgroundColor: theme.screenBackgroundColor,
					padding: '3%',
					flex: 1
				}}
			>
				{
					this.renderDevices({id: -1}, this.state.devices.concat(['null']))
				}
			</View>
		)
	}

	renderSettingsTab() {
		const {theme} = this.props.screenProps;

		return (
			<ScrollView
				key={'settings'}
				tabLabel={'SETTINGS'}
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={() => {
							this.props.navigation.navigate('create_room')
						}}
					>
						<MaterialIcons
							name="add-circle-outline"
							size={styles.icon.fontSize}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							Add room
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={() => {
							this.props.navigation.navigate('delete_room')
						}}
					>
						<AntDesign
							name="delete"
							size={styles.icon.fontSize}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							Delete room
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={() => {
							this.props.navigation.navigate('rooms_order')
						}}
					>
						<Octicons
							name="list-unordered"
							size={styles.icon.fontSize}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							Order rooms
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}

	render() {
		const {theme} = this.props.screenProps;

		let tabs = [];
		tabs.push(this.renderAllDevicesTab());
		tabs = tabs.concat(this.state.rooms.map(this.renderRoomTab.bind(this)));
		tabs.push(this.renderSettingsTab());

		return (
			<View
				style={styles.container}
			>
				<ScrollableTabView
					style={{
						backgroundColor: theme.screenBackgroundColor
					}}
					tabBarActiveTextColor={theme.textColor}
					tabBarInactiveTextColor={theme.textColor}
					tabBarUnderlineStyle={{
						backgroundColor: theme.primaryColor
					}}
					tabBarTextStyle={{}}
					prerenderingSiblingsNumber={1}
					initialPage={0}
					renderTabBar={() => <ScrollableTabBar/>}
					onChangeTab={({i}) => this.setState({tab_index: i})}
				>
					{
						tabs
					}
				</ScrollableTabView>
				{
					this.state.tab_index !== 0 && this.state.tab_index !== this.state.rooms.length + 1 &&
					this.renderFloatingActionButton()
				}
			</View>
		)
	}
}


const room_styles = StyleSheet.create({
	container: {
		padding: '3%',
		flex: 1
	}
});


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	deviceBox: {
		height: 170,
		width: '46%',
		marginHorizontal: '2%',
		marginVertical: 10,
		alignSelf: 'center',
		borderWidth: 2,
		borderRadius: 15,
	},
	imageView: {
		flex: 3,
	},
	deviceImage: {
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 30
	},
	nameView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	deviceName: {
		fontSize: 16
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
	},
	row: {
		//borderBottomWidth: 2,
		//borderColor: BOOTSTRAP_COLOR_DARK,
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	button_text: {
		fontSize: 20,
		marginLeft: 8
	},
	icon: {
		fontSize: 26
	}
});
