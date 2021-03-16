import React from "react";
import I18n from "i18n-js";
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {API_DELETE_ROOM, API_GET_ROOMS, API_URL} from "../../../api/api_routes_v_1.0.0.0";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import {API} from "../../../api/api";


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

	loadRoomsCallback(response) {
		this.setState({
			rooms: response['rooms']
		});
	}

	loadRooms() {
		API.house.rooms.getRooms({
			house_id: -1
		}).then(
			this.loadRoomsCallback.bind(this)
		).catch(
			(error) => console.warn(error)
		);
	}

	deleteRoomCallback(response) {
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
		API.house.rooms.deleteRoom({
			house_id: -1,
			room_id: room_id
		}).then(
			this.deleteRoomCallback.bind(this)
		).catch(
			(error) => console.warn(error)
		);
	}

	/**
	 * Triggered when the user press on a room.
	 * @param room
	 */
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
