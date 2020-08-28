import React, {Component} from "react";

import {
	View,
	ScreenRect, TouchableOpacity, Text, StyleSheet
} from "react-native"
import {API_URL, BOOTSTRAP_COLOR_DANGER, BOOTSTRAP_COLOR_SECONDARY, menu_style} from "../../constants";


export default class RoomDeviceOptionsScreen extends Component{
	static navigationOptions = ({navigation, screenProps}) => ({
		title: ''
	});

	constructor() {
		super();
		this.state = {
			device_id: 0,
			house_id: 0,
			room_id: 0
		}
	}

	componentDidMount(){
		this.setState({
			device_id: this.props.navigation.state.params.device_id,
			house_id: this.props.navigation.state.params.house_id,
			room_id: this.props.navigation.state.params.room_id
		});
	}

	componentWillUnmount(){
	}

	render(){
		return(
			<View>
				<TouchableOpacity
					style={menu_style.button}
					onPress={ () => {
						this.props.navigation.navigate('device_settings', {device_id: this.state.device_id} );
					}}
				>
					<Text
						style={menu_style.button_text}
					>
						Device settings
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

				<TouchableOpacity
					style={menu_style.button}
					onPress={ () => {
						this.removeDeviceFromRoom();
					}}
				>
					<Text
						style={[menu_style.button_text, {color: BOOTSTRAP_COLOR_DANGER}]}
					>
						Remove from room
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

			</View>
		)
	}

	removeDeviceFromRoom(room_id){
		fetch(API_URL + 'house/' + this.state.house_id + '/room/' + this.state.room_id + '/remove_device', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.state.device_id
			}),
		}).then(
			(response) => response.json()
		).then((response) => {
				if (response.status === 'success'){
					this.props.navigation.goBack();
				}
			}
		).catch((error) => {
			alert(error)
		})
	}

}
