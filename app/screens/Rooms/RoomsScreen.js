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
	API_URL, BOOTSTRAP_COLOR_DANGER,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	XEO_BLUE
} from "../../constants";

import Modal from "react-native-modal"
import {Icon} from "react-native-elements";


export default class RoomsScreen extends Component {
	 constructor() {
		 super();
		 this.state = {
		 	house_id: 1,
		 	 house_name: '',
			 rooms: [],
			 selected_room_id: -1,
			 devices: [],
			 refreshing: false,
			 options_visible: false
		 };
	 }

	 componentDidMount(){
		 this.loadRooms();
		 this.willFocusSubscription = this.props.navigation.addListener(
			 'willFocus', () => {
			 	this.loadRooms();
			 }
		 );
	 }

	 componentWillUnmount(){
	 }

	 render(){
		 return(
			 <SafeAreaView style={{flex: 1}}>
				 <ScrollView>
					 <View style={{borderBottomWidth: 2, width: '94%', marginHorizontal: '3%', marginTop: 30}}>
					 </View>
					 {this.state.rooms.map(
						 (room) => (
							 <View
								 key={'room_' + room.id}
								 style={{borderBottomWidth: 2, width: '94%', alignSelf: 'center'}}
							 >
								 <TouchableOpacity
									 onPress={ () => {
										 this.props.navigation.navigate('room', {house_id: this.state.house_id, room_id: room.id});
									 }}
									 onLongPress={ () => {
									 	//this.setState({options_visible: true})
										 this.props.navigation.navigate('room_options', {house_id: this.state.house_id, room_id: room.id, room_name: room.name});
									 }}
								 >
									 <Text style={{alignSelf: 'center', fontSize: 20, padding: 10}}>
										 {room.name}
									 </Text>
								 </TouchableOpacity>
							 </View>
						 )
					 )}
					 <TouchableOpacity
						 style={{backgroundColor: BOOTSTRAP_COLOR_PRIMARY, borderRadius: 10, padding:8, width:'30%', alignSelf: 'center', marginVertical: 15}}
						 onPress={()=> {
							 this.props.navigation.navigate('create_new_room', {house_id: this.state.house_id});
						 }}
					 >
						 <Text style={{alignSelf: 'center', fontSize: 14, color: BOOTSTRAP_COLOR_LIGHT}}>
							 ADD ROOM
						 </Text>
					 </TouchableOpacity>
				 </ScrollView>
			 </SafeAreaView>
		 )
	 }

	loadDevices(){
		fetch(API_LOAD_DEVICES, {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({ devices: response, refreshing: false})
			}
		).catch((error) => {
			alert(error)
		})
	}


	 loadRooms(){
		 fetch(API_URL + 'house/' + 1 + '/rooms', {
				 method: 'GET'
			 }
		 ).then(
			 (response) => response.json()
		 ).then((response) => {
		 	if(response['rooms']) {
				this.props.navigation.setParams({
					house_name: response['name']
				});
				this.setState(
					{
						house_name: response['name'],
						rooms: response['rooms']
					}
				);
			}
		 }).catch((error) => {
			 alert(error);
		 })
	 }
}


const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		right: 20,
		bottom: 20,
		backgroundColor: '#4267b2',
		borderRadius: 30,
		elevation: 8
	},
	fabIcon: {
		top: -2,
		fontSize: 50,
		color: 'white'
	},
	optionButton:{
		width: '100%',
		flex: 1
	},
	optionButtonText:{
		alignSelf: 'center',
		fontSize: 20,
		textAlignVertical: 'center',
		flex: 1,
	},
	optionLine:{
		borderWidth: 1
	}
});
