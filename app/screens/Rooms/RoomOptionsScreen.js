import React, {Component} from "react";

import {
	View,
	ScreenRect, TouchableOpacity, Text, StyleSheet
} from "react-native"
import {API_URL, BOOTSTRAP_COLOR_DANGER, BOOTSTRAP_COLOR_SECONDARY, menu_style} from "../../constants";


export default class RoomOptionsScreen extends Component{
	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Room settings'
	});

	constructor() {
		super();
	}

	componentDidMount(){
	}

	componentWillUnmount(){
	}

	render(){
		return(
			<View>
				<TouchableOpacity
					style={menu_style.button}
					onPress={ () => {
						this.props.navigation.navigate('rename_room', this.props.navigation.state.params);
					}}
				>
					<Text
						style={menu_style.button_text}
					>
						Change name
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

				<TouchableOpacity
					style={menu_style.button}
					onPress={ () => {
						this.props.navigation.navigate('room_sharing', this.props.navigation.state.params);
					}}
				>
					<Text
						style={menu_style.button_text}
					>
						Manage access
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

				<TouchableOpacity
					style={menu_style.button}
					onPress={ () => {
						this.deleteRoom(this.props.navigation.state.params.room_id)
					}}
				>
					<Text
						style={[menu_style.button_text, {color: BOOTSTRAP_COLOR_DANGER}]}
					>
						Delete
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

			</View>
		)
	}

	deleteRoom(room_id){
		fetch(API_URL + 'house/' + 1 + '/room/' + room_id + '/delete', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
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
