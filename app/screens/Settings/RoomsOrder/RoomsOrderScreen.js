import React from "react";
import {API_URL} from "../../../api/api_routes_v_1.0.0.0";
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";


export default class RoomsOrderScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			rooms: []
		}
	}


	getFetchRoomsArguments() {
		return new URLSearchParams({
			house_id: 1
		});
	}

	componentDidMount() {
		this.loadRooms();
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

	renderRoom({item, index, drag, isActive}) {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				style={[styles.room_row, {
					backgroundColor: isActive ? theme.secondaryColor : theme.screenBackgroundColor,
					borderBottomColor: theme.secondaryColor
				}]}
				onLongPress={drag}
			>
				<Text
					style={[styles.room_name, {
						color: theme.textColor,
					}]}
				>
					{item.name}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<View style={[styles.container, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<DraggableFlatList
					data={this.state.rooms}
					renderItem={this.renderRoom.bind(this)}
					keyExtractor={(item, index) => `draggable-item-${index}`}
					onDragEnd={({ data }) => this.setState({ rooms: data })}
				/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: '3%'
	},
	room_row: {
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 2,
	},
	room_name: {
		fontSize: 24,
	}
});


