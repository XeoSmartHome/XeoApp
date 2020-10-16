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
	API_DEFAULT_IMAGES_URL,
	API_DEVICE_IMAGES_URL,
	API_LOAD_DEVICES,
	API_URL,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	XEO_BLUE
} from "../../constants";
import I18n from 'i18n-js'


const t = (key) => I18n.t('create_new_room.' + key);


export default class CreateNewRoom extends Component {
	constructor() {
		super();
		this.state = {
			house_id: 0,
			new_room_name: t('default_name'),
		};
	}

	componentDidMount(){
		this.state.house_id = this.props.navigation.state.params.house_id;
	}

	createNewRoom(){
		fetch(API_URL + 'house/' + this.state.house_id + '/add_room', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.new_room_name,
			}),
		}).then(
			(response) => response.json()
		).then((response) => {
			switch (response.status) {
				case 200:
					this.props.navigation.goBack()
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

	render(){
		const {theme} = this.props.screenProps;
		const button_dissabled = this.state.new_room_name === '';
		return (
			<ScrollView
				style={{
					padding: '2%',
					backgroundColor: theme.screenBackgroundColor,
				}}
			>
				<View
					style={{
						marginTop: 50
					}}
				>
					<TextInput
						style={{
							borderWidth: 2,
							borderColor: XEO_BLUE,
							width: '75%',
							fontSize: 20,
							alignSelf: 'center',
							padding: 6,
							borderRadius: 6,
							color: theme.textColor
						}}
						placeholder={t('name_input_placeholder')}
						placeholderTextColor={theme.placeholderTextColor}
						value={this.state.new_room_name}
						onChangeText={ (value) => {
							this.setState({
								new_room_name: value
							});
						}}
						autoFocus={true}
						autoCapitalize='sentences'
					/>
				</View>
				<TouchableOpacity
					style={{
						width: '30%',
						backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
						padding:8,
						borderRadius:6,
						marginRight: '10%',
						alignSelf: 'flex-end',
						marginTop: 20,
						opacity: button_dissabled ? theme.buttonDisabledOpacity : 1
					}}
					disabled={button_dissabled}
					onPress={ () => {
						this.createNewRoom();
					}}
				>
					<Text
						style={{
							fontSize: 20,
							color: BOOTSTRAP_COLOR_LIGHT,
							alignSelf: 'center'
						}}
					>
						{ t('confirm_button') }
					</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}



}
