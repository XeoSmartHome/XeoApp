import React from "react";
import I18n from "i18n-js";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import {API} from "../../../api/api";


const t = (key) => I18n.t(`create_new_room.${key}`);


export default class CreateRoomScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			house_id: -1,
			room_name: ''
		};
	}

	componentDidMount() {
		//this.state.house_id = this.props.navigation.state.params?.house_id;
	}


	/**
	 * Trigger when API respond to "create room" request.
	 * @param response
	 */
	createRoomCallback(response) {
		switch (response['status']) {
			case 200:
				ToastAndroid.show('Room created', ToastAndroid.SHORT);
				this.props.navigation.goBack();
				break;
			default:
				//console.warn(response['message'])
				break;
		}
	}

	/**
	 * Call API to create a new room
	 * @param {number} house_id
	 * @param {string} room_name
	 */
	createRoom(house_id, room_name) {
		API.house.rooms.createRoom({
			house_id: house_id,
			name: room_name
		}).then(
			this.createRoomCallback.bind(this)
		).catch(
			(error) => console.warn(error)
		);
	}

	/**
	 * Triggered when the user press the create room button.
	 */
	onCreateRoomButtonPress() {
		this.createRoom(this.state.house_id, this.state.room_name);
	}

	render() {
		const {theme} = this.props.screenProps;
		const button_disabled = false;

		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<TextInput
					style={[styles.text_input,{
						borderColor: theme.primaryColor,
						color: theme.textColor
					}]}
					placeholder={t('name_input_placeholder')}
					placeholderTextColor={theme.placeholderTextColor}
					value={this.state.room_name}
					onChangeText={ (value) => {
						this.setState({
							room_name: value
						});
					}}
					autoFocus={true}
					autoCapitalize='sentences'
				/>
				<TouchableOpacity
					style={[styles.create_room_button, {
						backgroundColor: theme.primaryColor,
						opacity: button_disabled ? theme.buttonDisabledOpacity : 1
					}]}
					disabled={button_disabled}
					onPress={this.onCreateRoomButtonPress.bind(this)}
				>
					<Text
						style={[styles.create_room_button_text, {
							color: theme.textColor,
						}]}
					>
						{ t('confirm_button') }
					</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	text_input: {
		marginTop: 60,
		borderWidth: 2,
		width: '75%',
		fontSize: 20,
		alignSelf: 'center',
		padding: 6,
		borderRadius: 6,
	},
	create_room_button: {
		width: '30%',
		padding:8,
		borderRadius:6,
		marginRight: '10%',
		alignSelf: 'flex-end',
		marginTop: 20,
	},
	create_room_button_text:{
		fontSize: 20,
		alignSelf: 'center'
	}
});
