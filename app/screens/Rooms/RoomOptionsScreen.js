import React, {Component} from "react";

import {
	View,
	ScreenRect, TouchableOpacity, Text, StyleSheet
} from "react-native"
import {API_URL, BOOTSTRAP_COLOR_DANGER, BOOTSTRAP_COLOR_SECONDARY, menu_style} from "../../constants";
// noinspection ES6CheckImport
import {t} from 'i18n-js'


export default class RoomOptionsScreen extends Component{
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
						{t('room_options.rename')}
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
						{t('room_options.access_settings')}
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
						{t('room_options.delete')}
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
