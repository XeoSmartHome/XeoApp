import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View, StyleSheet, ToastAndroid} from "react-native";
import {Icon} from "react-native-elements";
import {t} from "i18n-js";
import {API_ADD_DEVICE_IN_ROOM, API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL} from "../../api/api_routes_v_1.0.0.0";
import {DeviceBox} from "../Devices/DeviceBox";


export default class AddDeviceInRoomScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `Add device in: ${ navigation.state.params.room.name === undefined ? '' : navigation.state.params.room.name}`
	});

	constructor() {
		super();
		this.state = {
			house_id: -1,
			room: {},
			devices: []
		}
	}

	componentDidMount() {
		const devices = this.props.navigation.state.params.devices.filter((device) => !this.props.navigation.state.params.room['devices_ids'].includes(device['id']));

		this.setState({
			devices: devices,
			room: this.props.navigation.state.params.room
		});
	}

	getFetchAddDeviceInRoomArguments(house_id, room_id, device_id) {
		return JSON.stringify({
			house_id: house_id,
			room_id: room_id,
			device_id: device_id
		});
	}

	fetchAddDeviceInRoom(request_args) {
		return fetch(API_ADD_DEVICE_IN_ROOM, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: request_args
		})
	}

	fetchAddDeviceInRoomCallback(response) {
		return response.json();
	}

	fetchAddDeviceInRoomSetStateCallback(response) {
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Device added in room', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				break;
		}
	}

	addDeviceInRoom(device_id) {
		this.fetchAddDeviceInRoom(this.getFetchAddDeviceInRoomArguments(this.state.house_id, this.state.room.id, device_id))
			.then(this.fetchAddDeviceInRoomCallback)
				.then(this.fetchAddDeviceInRoomSetStateCallback.bind(this))
					.catch((error) => console.warn(error));
	}

	onDevicePress(device) {
		this.addDeviceInRoom(device['id']);
	}

	renderDeviceBox(device, device_index) {
		if (device === 'null')
			return this.renderAddDeviceBox();
		const {theme} = this.props.screenProps;
		return (
			<DeviceBox
				device={device}
				theme={theme}
				onPress={() => this.onDevicePress(device)}
			/>
		);
	}

	render() {
		const {theme} = this.props.screenProps;

		return (
			<FlatList
				style={{
					backgroundColor: theme.screenBackgroundColor,
					padding: '3%'
				}}
				numColumns={2}
				data={this.state.devices}
				keyExtractor={(item, index) => `device-${item['id']}`}
				renderItem={({item, index}) => this.renderDeviceBox(item, index)}
				contentContainerStyle={{
					paddingBottom: '12%'
				}}
			/>

		);
	}
}


const styles = StyleSheet.create({
	container: {},
});
