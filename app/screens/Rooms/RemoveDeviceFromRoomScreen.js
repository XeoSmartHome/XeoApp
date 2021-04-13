import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View, StyleSheet, ToastAndroid, Alert, Modal} from "react-native";
import {DeviceBox} from "../Devices/DeviceBox";
import {API} from "../../api/api";


export default class RemoveDeviceFromRoomScreen extends React.Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: `Remove device from: ${navigation.state.params.room.name === undefined ? '' : navigation.state.params.room.name}`
	});

	constructor() {
		super();
		this.state = {
			house_id: -1,
			room: {},
			devices: [],

			confirm_modal_visible: false
		}
	}

	componentDidMount() {
		this.setState({
			devices: this.props.navigation.state.params.devices,
			room: this.props.navigation.state.params.room
		});
	}

	/**
	 * Triggered when API respond to the request.
	 * @param response
	 */
	removeDeviceFromRoomCallback(response) {
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Device removed from room', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				break;
		}
	}

	/**
	 * Call API to remove a device from a room.
	 * @param {number} device_id
	 */
	removeDeviceFromRoom(device_id) {
		API.house.rooms.removeDevice({
			house_id: this.state.house_id,
			room_id: this.state.room.id,
			device_id: device_id
		}).then(
			this.removeDeviceFromRoomCallback.bind(this)
		).catch((error) => console.warn(error));
	}

	/**
	 * Triggered when the user press on a device.
	 * @param device
	 */
	onDevicePress(device) {
		/*Alert.alert(
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
		);*/
		/*this.setState({
			confirm_modal_visible: true
		});*/
		this.removeDeviceFromRoom(device['id']);
	}

	/**
	 * Close confirm-action-modal.
	 */
	closeModal() {
		this.setState({
			confirm_modal_visible: false
		});
	}

	renderConfirmModal() {
		return (
			<Modal
				visible={this.state.confirm_modal_visible}
				onRequestClose={this.closeModal.bind(this)}
			>

			</Modal>
		)
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
			<View style={{flex: 1}}>
				{this.renderConfirmModal()}
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
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {},
});
