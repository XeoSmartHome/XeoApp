import React from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import {AntDesign, Feather, MaterialIcons, Octicons} from "@expo/vector-icons";
import {Icon} from "react-native-elements";
import {FloatingAction} from "react-native-floating-action";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from "react-native-scrollable-tab-view/ScrollableTabBar";
import {DeviceBox} from "../Devices/DeviceBox";
import {API} from "../../api/api";
import {translator} from "../../lang/translator";
// !!! REPLACE 'ios' with 'android' !!!
// !!! REMOVE getNode() function !!!


const t = translator('home');


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
		};

		this.loadRoomsCallback = this.loadRoomsCallback.bind(this);
		this.loadDevicesCallback = this.loadDevicesCallback.bind(this);
	}

	componentDidMount() {
		this.loadRooms();
		this.loadDevices();
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadRooms();
				this.loadDevices();
			}
		);
	}

	loadRoomsCallback(response) {
		this.setState({
			rooms: response['rooms']
		});
	}

	loadRooms() {
		API.house.rooms.getRooms({
			house_id: this.state.house_id
		}).then(
			this.loadRoomsCallback
		).catch(
			(error) =>
				console.warn(error)
		);
	}

	loadDevicesCallback(response) {
		this.setState({
			devices: response
		});
	}

	loadDevices() {
		API.devices.getDevices().then(
			this.loadDevicesCallback
		).catch(
			(error) =>
				console.warn(error)
		);
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
							t('register_device')
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
			devices: this.state.devices.filter((device) => !room['devices_ids'].includes(device['id']))
		});
	}

	onRemoveDeviceButtonPress(room) {
		this.props.navigation.navigate('remove_device_from_room', {
			room: room,
			devices: this.getDevicesFromRoom(room)
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
				text: t('add_device'),
				icon: <Feather name="plus" size={24} color={theme.lightColor}/>,
				name: "add_device",
				position: 3,
				color: theme.successColor,
			}, {
				text: t('remove_device'),
				icon: <Octicons name="trashcan" size={24} color={theme.lightColor}/>,
				name: "remove_device",
				position: 2,
				color: theme.dangerColor,
			},
			{
				text: t('order_devices'),
				icon: <Octicons name="list-unordered" size={24} color={theme.lightColor}/>,
				name: "order_devices",
				position: 1,
				color: theme.warningColor,
			},
		];

		return (
			<FloatingAction
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
				tabLabel={t('all_devices').toUpperCase()}
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
				tabLabel={t('settings').toUpperCase()}
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
