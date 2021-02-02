import React, {Component} from "react";

import {
	View,
	TouchableOpacity,
	Text,
	ScrollView, Modal,
} from "react-native"
import {API_URL, BOOTSTRAP_COLOR_DANGER, menu_style} from "../../constants";
import I18n from 'i18n-js'


const t = (key) => I18n.t('room_options.' + key);


export default class RoomOptionsScreen extends Component{
	constructor() {
		super();
		this.state = {
			delete_room_popup_visible: false
		}
	}

	deleteRoom(){
		const room_id = this.props.navigation.state.params.room_id;
		fetch(API_URL + 'house/' + 1 + '/room/' + room_id + '/delete', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(
			(response) => response.json()
		).then((response) => {
			switch (response.status) {
				case 200:
					this.props.navigation.goBack();
					break;
				case 400:
					// TODO: handle 400
					alert(response.message);
					break;
			}

		}).catch((error) => {
			alert(error)
		})
	}

	onDeleteRoomButtonPress(){
		this.setState({
			delete_room_popup_visible: true
		});
	}

	render(){
		const {theme} = this.props.screenProps;
		return(
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<TouchableOpacity
					style={menu_style.button}
					onPress={ () => {
						this.props.navigation.navigate('rename_room', this.props.navigation.state.params);
					}}
				>
					<Text
						style={[menu_style.button_text, {
							color: theme.textColor
						}]}
					>
						{t('rename')}
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
						style={[menu_style.button_text, {
							color: theme.textColor
						}]}
					>
						{t('access_settings')}
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

				<TouchableOpacity
					style={menu_style.button}
					onPress={this.onDeleteRoomButtonPress.bind(this)}
				>
					<Text
						style={[menu_style.button_text, {color: BOOTSTRAP_COLOR_DANGER}]}
					>
						{t('delete')}
					</Text>
				</TouchableOpacity>

				<View style={menu_style.separator}/>

				<Modal
					visible={this.state.delete_room_popup_visible}
					onRequestClose={ () => {
						this.setState({delete_room_popup_visible: false})
					}}
					transparent={true}
				>
					<View
						style={{
							width: 200,
							backgroundColor: theme.textColor
						}}
					>
						<Text>ok</Text>
					</View>
				</Modal>

			</ScrollView>
		)
	}
}
