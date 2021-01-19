import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View, StyleSheet, ToastAndroid, Alert} from "react-native";
import {t} from "i18n-js";
import {
	API_REMOVE_DEVICE_FROM_ROOM
} from "../../api/api_routes_v_1.0.0.0";
import {DeviceBox} from "../Devices/DeviceBox";


export default class RemoveDeviceFromRoomScreen extends React.Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: `Remove device from: ${navigation.state.params.room.name === undefined ? '' : navigation.state.params.room.name}`
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
		const devices = this.props.navigation.state.params.devices.filter((device) => this.props.navigation.state.params.room['devices_ids'].includes(device['id']));

		this.setState({
			devices: devices,
			room: this.props.navigation.state.params.room
		});
	}

	getFetchRemoveDeviceFromRoomArguments(house_id, room_id, device_id) {
		return JSON.stringify({
			house_id: house_id,
			room_id: room_id,
			device_id: device_id
		});
	}

	fetchRemoveDeviceFromRoom(request_args) {
		return fetch(API_REMOVE_DEVICE_FROM_ROOM, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: request_args
		})
	}

	fetchRemoveDeviceFromRoomCallback(response) {
		return response.json();
	}

	fetchRemoveDeviceFromRoomSetStateCallback(response) {
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Device removed from room', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				break;
		}
	}

	removeDeviceFromRoom(device_id) {
		this.fetchRemoveDeviceFromRoom(this.getFetchRemoveDeviceFromRoomArguments(this.state.house_id, this.state.room.id, device_id))
			.then(this.fetchRemoveDeviceFromRoomCallback)
			.then(this.fetchRemoveDeviceFromRoomSetStateCallback.bind(this))
			.catch((error) => console.warn(error));
	}

	onDevicePress(device) {
		Alert.alert(
			`Remove "${device['name']}" from "${this.state.room['name']}"?`,
			'',
			[
				{
					text: 'Cancel',
					onPress: () => {

					},
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => {
						this.removeDeviceFromRoom(device['id']);
					}
				}
			],
			{cancelable: false}
		);
	}

	renderDeviceBox(device, device_index) {
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
				keyExtractor={(item, index) => `
	device
-${item['id']}
`}
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
