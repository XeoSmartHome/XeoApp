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
	BackHandler, StatusBar
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
import {t} from 'i18n-js'


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
		 const {mode, theme, setTheme} = this.props.screenProps;
		 return(
			 <SafeAreaView style={{
			 	flex: 1,
			 	backgroundColor: theme.screenBackgroundColor
			 }}>
				 <StatusBar hidden={true}/>
				 <ScrollView>
					 <View style={{borderBottomWidth: 2, width: '94%', marginHorizontal: '3%', marginTop: 30, borderColor: theme.textColor}}>
					 </View>
					 {this.state.rooms.map(
						 (room) => (
							 <View
								 key={'room_' + room.id}
								 style={{
								 	borderBottomWidth: 2,
									 width: '94%',
									 alignSelf: 'center',
									 borderColor: theme.textColor
								 }}
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
									 <Text style={{
									 	alignSelf: 'center',
										 fontSize: 20,
										 padding: 10,
										 color: theme.textColor
									 }}>
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
							 {t('dashboard.rooms.add_room')}
						 </Text>
					 </TouchableOpacity>
				 </ScrollView>
			 </SafeAreaView>
		 )
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
