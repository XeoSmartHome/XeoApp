import React from "react";
import {FlatList, StyleSheet, ToastAndroid} from "react-native";
import {DeviceBox} from "../Devices/DeviceBox";
import {API} from "../../api/api";


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
		this.setState({
			devices: this.props.navigation.state.params.devices,
			room: this.props.navigation.state.params.room
		});
	}

	/**
	 * Triggered when API respond to the the request.
	 * @param response
	 */
	addDeviceInRoomCallback(response) {
		console.warn(response);
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Device added in room', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				break;
		}
	}

	/**
	 * Call API to add a device in a room.
	 * @param {number} device_id
	 */
	addDeviceInRoom(device_id) {
		API.house.rooms.addDevice({
			house_id: this.state.house_id,
			room_id: this.state.room.id,
			device_id: device_id
		}).then(
			this.addDeviceInRoomCallback.bind(this)
		).catch(
			(error) => console.warn(error)
		);

	}

	/**
	 * Triggered when the user press on a device.
	 * @param device
	 */
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
});
