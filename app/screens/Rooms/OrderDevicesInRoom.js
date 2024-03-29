import React from "react";
import {Alert, BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import {API} from "../../api/api";


export default class OrderDevicesInRoom extends React.Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		//title: `Order devices in ${navigation.state.params.room['name']}`,
		title: 'Order devices in room',
		headerRight: () => (
			navigation.state.params?.header_right
		),
	});

	constructor() {
		super();
		this.state = {
			room: {},
			devices: [],
			changed: false,
			house_id: -1
		};
	}

	componentDidMount() {

		this.setState({
			devices: this.props.navigation.state.params.devices,
			room: this.props.navigation.state.params.room,
		});

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
				{
					text: "YES", onPress: () => {
						this.props.navigation.goBack()
					}
				}
			]);

		} else {
			this.props.navigation.goBack();
		}
		return true;
	}

	onSaveButtonPress() {
		this.updateDevicesOrder();
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

	updateDevicesOrderCallback(response) {
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Device order updated', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				break;
		}
	}

	updateDevicesOrder() {
		API.house.rooms.updateDevicesOrder({
			house_id: this.state.house_id,
			room_id: this.state.room.id,
			order: this.state.devices.map((device) => device['id'])
		}).then(
			this.updateDevicesOrderCallback.bind(this)
		).catch(
			(error) => {
				console.warn(error);
			}
		)
	}

	renderDevice({item, index, drag, isActive}) {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				style={[styles.device_row, {
					backgroundColor: isActive ? theme.secondaryColor : theme.screenBackgroundColor,
					borderBottomColor: theme.secondaryColor
				}]}
				onLongPress={drag}
			>
				<Text
					style={[styles.device_name, {
						color: theme.textColor,
					}]}
				>
					{item['name']}
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
					data={this.state.devices}
					renderItem={this.renderDevice.bind(this)}
					keyExtractor={(item, index) => `device-${index}`}
					onDragEnd={({data}) => this.setState({devices: data, changed: true})}
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
	device_row: {
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 2,
	},
	device_name: {
		fontSize: 20,
	},
	header_button_text: {
		fontSize: 20,
		marginRight: 20
	}
});
