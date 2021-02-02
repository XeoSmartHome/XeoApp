import React, {Component} from "react";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	SafeAreaView,
	ScrollView,
	SectionList,
	TouchableOpacity,
	TextInput,
	BackHandler
} from "react-native";
import {
	API_LOAD_DEVICES,
	API_URL, BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_PRIMARY, XEO_BLUE,
} from "../../constants";
import I18n from 'i18n-js'


const t = (key) => I18n.t('rename_room.' + key);


export default class RenameRoomScreen extends Component {
	constructor() {
		super();
		this.state = {
			house_id: 0,
			room_id: 0,
			room_name: '',
		};
	}

	componentDidMount() {
		this.setState({
			house_id: this.props.navigation.state.params.house_id,
			room_id: this.props.navigation.state.params.room_id,
			room_name: this.props.navigation.state.params.room_name
		});
	}

	componentWillUnmount() {
	}

	render() {
		const {theme} = this.props.screenProps;
		const button_disabled = this.state.room_name === '';
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<TextInput
					style={{
						alignSelf: 'center',
						borderWidth: 2,
						borderRadius: 8,
						padding: 8,
						borderColor: XEO_BLUE,
						width: '70%',
						fontSize: 20,
						marginTop: 50,
						color: theme.textColor
					}}
					value={this.state.room_name}
					autoFocus={true}
					autoCapitalize='sentences'
					placeholder={t('name_input_placeholder')}
					placeholderTextColor={theme.placeholderTextColor}
					onChangeText={ (value) => {
						this.setState({
							room_name: value
						});
					}}
				/>
				<TouchableOpacity
					style={{
						width: '30%',
						backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
						padding:8,
						borderRadius:6,
						marginRight: '10%',
						alignSelf: 'flex-end',
						marginTop: 20,
						opacity: button_disabled ? theme.buttonDisabledOpacity : 1
					}}
					onPress={ () => {
						this.renameRoom();
					}}
					disabled={button_disabled}
				>
					<Text
						style={{fontSize: 20, color: BOOTSTRAP_COLOR_LIGHT, alignSelf: 'center'}}
					>
						Save
					</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}

	renameRoom(){
		fetch(API_URL + 'house/' + this.state.house_id + '/room/' + this.state.room_id + '/update', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.room_name
			}),
		}).then(
			(response) => response.json()
		).then((response) => {
				switch (response.status) {
					case 200:
						this.props.navigation.goBack();
						break
					case 400:
						// TODO: handle 400
						alert(response.message);
						break;

				}
			}
		).catch((error) => {
			alert(error)
		})
	}

}
