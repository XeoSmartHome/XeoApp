import React from "react";
import {API_GET_ROOMS, API_UPDATE_ROOMS_ORDER, API_URL} from "../../../api/api_routes_v_1.0.0.0";
import {ScrollView, View, StyleSheet, Text, TouchableOpacity, BackHandler, Alert} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import {apiPostRequest} from "../../../api/requests";


export default class RoomsOrderScreen extends React.Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		headerRight: () => (
			navigation.state.params?.header_right
		)
	});

	constructor() {
		super();
		this.state = {
			rooms: [],
			changed: false
		}
	}

	componentDidMount() {
		this.loadRooms();
		this.props.navigation.setParams({
			header_right: this.renderNavigationRightHeader()
		});
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress.bind(this));
	}

	componentWillUnmount() {
		this.backHandler.remove();
	}

	hardwareBackPress() {
		if (this.state.changed === true) {
			Alert.alert("Hold on!", "Are you sure you want to go back without saving?", [
				{
					text: "Cancel",
					onPress: () => null,
					style: "cancel"
				},
				{ text: "YES", onPress: () => {this.props.navigation.goBack()} }
			]);

		} else {
			this.props.navigation.goBack();
		}
		return true;
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

	apiUpdateRoomsOrder() {
		apiPostRequest(API_UPDATE_ROOMS_ORDER, {
			house_id: 1,
			order: this.state.rooms.map((room) => room.id)
		}).then( (response) => {
			switch (response['status']) {
				case 200:
					ToastAndroid.show('Room order updated', ToastAndroid.SHORT);
					this.props.navigation.goBack();
					break;
				case 400:
					console.warn(response);
					break;
			}
		}).catch( (error) => console.warn(error));
	}


	onSaveButtonPress() {
		//this.saveRoomsOrder();
		this.apiUpdateRoomsOrder();
		this.setState({
			changed: false
		});
	}

	renderNavigationRightHeader() {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				onPress={this.onSaveButtonPress.bind(this)}
			>
				<Text
					style={[styles.header_button_text, {
						color: theme.headerTextColor
					}]}
				>
					SAVE
				</Text>
			</TouchableOpacity>
		)
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
					keyExtractor={(item, index) => `room-${index}`}
					onDragEnd={({data}) => this.setState({rooms: data, changed: true})}
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
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 2,
	},
	room_name: {
		fontSize: 20,
	},
	header_button_text: {
		fontSize: 20,
		marginRight: 20
	}
});


