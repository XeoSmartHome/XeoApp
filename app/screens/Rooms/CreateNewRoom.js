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
// noinspection ES6CheckImport
import {t} from 'i18n-js'

export default class CreateNewRoom extends Component {
	constructor() {
		super();
		this.state = {
			house_id: -1,
			new_room_name: t('create_new_room.default_name'),
		};
	}

	componentDidMount(){
		this.state.house_id = this.props.navigation.state.params.house_id;
	}

	componentWillUnmount(){
	}

	render(){
		return (
			<SafeAreaView style={{padding: '2%'}}>
				<Text
					style={{alignSelf: 'center', fontSize: 24, padding: 14}}
				>
					{t('create_new_room.confirm_button')}
				</Text>
				<View>
					<TextInput
						style={{borderWidth: 2, borderColor: XEO_BLUE, width: '75%', fontSize: 20, alignSelf: 'center', padding: 6, borderRadius: 6}}
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
					style={{width: '30%', backgroundColor: BOOTSTRAP_COLOR_PRIMARY, padding:8, borderRadius:6, marginRight: '10%', alignSelf: 'flex-end', marginTop: 20}}
					onPress={ () => {
						this.createNewRoom();
					}}
				>
					<Text
						style={{fontSize: 20, color: BOOTSTRAP_COLOR_LIGHT, alignSelf: 'center'}}
					>
						Add
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
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
				if (response.status === 'success') {
					this.props.navigation.navigate('rooms');
				} else {
					alert(response.message);
				}
			}
		).catch((error) => {
			alert(error)
		})
	}

}
