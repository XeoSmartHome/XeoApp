import React from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import {API} from "../../../api/api";
import {translator} from "../../../lang/translator";
import {XeoButton} from "../../../components/XeoButton";


const t = translator('create_new_room');


export default class CreateRoomScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			house_id: -1,
			room_name: ''
		};
		this.onCreateRoomButtonPress = this.onCreateRoomButtonPress.bind(this);
		this.onRoomNameChangeText = this.onRoomNameChangeText.bind(this);
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

	onRoomNameChangeText(value) {
		this.setState({
			room_name: value
		});
	}

	render() {
		const {theme} = this.props.screenProps;
		const styles = Styles(theme);
		const button_disabled = false;

		return (
			<ScrollView
				style={styles.screen}
			>
				<TextInput
					style={styles.text_input}
					placeholder={t('name_input_placeholder')}
					placeholderTextColor={theme.placeholderTextColor}
					value={this.state.room_name}
					onChangeText={this.onRoomNameChangeText}
					autoFocus={true}
					autoCapitalize='sentences'
				/>
				<View
					style={styles.create_room_button}
				>
					<XeoButton
						title={t('confirm_button')}
						colors={{
							text: theme.lightColor,
							background: theme.primaryColor
						}}
						disabled={button_disabled}
						onPress={this.onCreateRoomButtonPress}
					/>
				</View>
			</ScrollView>
		)
	}
}


const Styles = (theme) => ({
	screen: {
		backgroundColor: theme.screenBackgroundColor
	},
	text_input: {
		marginTop: 60,
		borderWidth: 2,
		width: '75%',
		fontSize: 20,
		alignSelf: 'center',
		padding: 6,
		borderRadius: 6,
		borderColor: theme.primaryColor,
		color: theme.textColor
	},
	create_room_button: {
		width: '35%',
		marginRight: '10%',
		alignSelf: 'flex-end',
		marginTop: 20,
	},
});
