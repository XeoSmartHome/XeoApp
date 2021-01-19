import React from "react";
import I18n from "i18n-js";
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {API_DELETE_ROOM, API_GET_ROOMS, API_URL} from "../../../api/api_routes_v_1.0.0.0";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";


const t = (key) => I18n.t(`1234.${key}`);


export default class DeleteRoomScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			rooms: []
		};
	}

	componentDidMount() {
		this.loadRooms();
	}


	getFetchRoomsArguments() {
		return new URLSearchParams({
			house_id: 1
		});
	}

	fetchRooms(request_args) {
		return fetch(`${API_GET_ROOMS}?${request_args}`, {method: 'GET'});
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


	getFetchDeleteRoomArguments(room_id) {
		return JSON.stringify({
			house_id: 1,
			room_id: room_id
		});
	}


	fetchDeleteRoom(request_args) {
		return fetch(API_DELETE_ROOM, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: request_args
		});
	}

	fetchDeleteRoomCallback(response) {
		return response.json();
	}


	fetchDeleteRoomSetStateCallback(response) {
		//console.warn(response);
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Room deleted', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				console.warn(response['message'])
				break;
		}
	}

	delete_room(room_id) {
		this.fetchDeleteRoom(this.getFetchDeleteRoomArguments(room_id)).then(this.fetchDeleteRoomCallback).then(this.fetchDeleteRoomSetStateCallback.bind(this)).catch((error) => console.warn(error));
	}

	onRoomPress(room) {
		this.delete_room(room['id'])
	}

	renderRoom(room, room_index) {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				key={`room-${room_index}`}
				style={[styles.room_row, {
					borderBottomColor: theme.secondaryColor
				}]}
				onPress={() => this.onRoomPress(room)}
			>
				<Text
					style={[styles.room_name, {
						color: theme.textColor,
					}]}
				>
					{room['name']}
				</Text>
			</TouchableOpacity>
		);
	}

	renderRooms() {
		return this.state.rooms.map(this.renderRoom.bind(this));
	}

	render() {
		const {theme} = this.props.screenProps;

		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
				contentContainerStyle={styles.container}
			>
				{
					this.renderRooms()
				}
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		padding: '3%',
	},
	room_row: {
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 2,
	},
	room_name: {
		fontSize: 20,
	}
});
