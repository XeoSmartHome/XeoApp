import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text} from "react-native";
import {API_URL} from "../../constants";


export default class RoomSharingMainScreen extends Component{
	constructor() {
		super();
		this.state = {
			users: []
		}
	}

	loadUsersWithAccessInThisRoom(){
		fetch(API_URL + 'house/' + 1 + '/room/' + this.props.navigation.state.params.room_id + '/access_sharing', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(
			(response) => response.json()
		).then((response) => {
				console.warn(response);
			}
		).catch((error) => {
			alert(error)
		})
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<Text
					style={{
						color: theme.textColor
					}}
				>
					ok</Text>
			</ScrollView>
		)
	}
}
