import React, {Component} from "react";
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import {
	API_LOAD_DEVICES,
	API_URL,
} from "../../constants";
// noinspection ES6CheckImport
import {t} from 'i18n-js';


export default class AddDeviceInRoomScreen extends Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: t('add_device_in_room.navigation.title') + ' ' + (navigation.state.params.room_name === undefined ? '' : navigation.state.params.room_name)
	});

	constructor() {
		super();
		this.state = {
			house_id: 0,
			room_id: 0,
			room_name: '',
			devices: [],
			refreshing: true
		};
		this.loadAllDevices();
	}

	componentDidMount() {
		this.state.house_id = this.props.navigation.state.params.house_id;
		this.state.room_id = this.props.navigation.state.params.room_id;
		this.state.room_name = this.props.navigation.state.params.room_name;
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<ScrollView style={{padding: '2%', flex: 1}}>
				<Text
					style={{alignSelf: 'center', fontSize: 18, padding: 14, textAlign: 'center'}}
				>
					{t('add_device_in_room.hint')} { this.state.room_name }
				</Text>
				<View style={{alignSelf: 'center', borderBottomWidth: 2, width: '90%', marginTop: 10}}/>
				{
					this.state.devices.map( (device) => (
						<TouchableOpacity
							style={{height: 50, alignSelf: 'center', borderBottomWidth: 2, width: '90%'}}
							key={'device_' + device.id}
							onPress={ () => {
								this.addDeviceInRoom(device.id);
							}}
						>
							<Text
								style={{fontSize: 20, alignSelf: 'center', flex: 1, textAlignVertical: 'center'}}
							>
								{device['name']}
							</Text>
						</TouchableOpacity>
					))
				}
			</ScrollView>
		)
	}

	loadAllDevices(){
		fetch(API_LOAD_DEVICES, {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({
					devices: response,
					refreshing: false
				});
			}
		).catch((error) => {
			alert(error)
		})
	}

	addDeviceInRoom(device_id){
		fetch(API_URL + 'house/' + this.state.house_id + '/room/' + this.state.room_id + '/add_device', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: device_id
			}),
		}).then(
			(response) => response.json()
		).then((response) => {
				if (response.status === 'success') {
					this.props.navigation.goBack();
				} else {
					alert(response.message);
				}
			}
		).catch((error) => {
			alert(error)
		})
	}
}


