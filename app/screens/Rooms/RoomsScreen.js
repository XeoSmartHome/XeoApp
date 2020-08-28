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
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'House: ' + ( navigation.state.params.house_name === undefined ? '' : navigation.state.params.house_name),
		headerRight: <Icon name="more-horiz" color={BOOTSTRAP_COLOR_LIGHT} size={40} />
	});

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
				 </ScrollView>
				 <TouchableOpacity
					 onPress={()=> {
						 this.props.navigation.navigate('create_new_room', {house_id: this.state.house_id});
					 }}
					 style={styles.fab}
				 >
					 <Text style={styles.fabIcon}>+</Text>
				 </TouchableOpacity>
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


/*<Modal
					 visible={this.state.options_visible}
					 onRequestClose={ () => {
						 this.setState({options_visible: false} );
					 } }
					 animationType="fade"
					 contentContainerStyle={{opacity: 1}}
				 >
					 <View style={{alignSelf:'center', width: '60%', height: '25%', backgroundColor: '#fffff', borderRadius: 10, borderWidth: 2,}}>
						 <TouchableOpacity
						  style={styles.optionButton}
						 >
							 <Text
								 style={[styles.optionButtonText, {color: BOOTSTRAP_COLOR_DANGER, textB}]}
							 >
								 Delete
							 </Text>
						 </TouchableOpacity>
						 <View style={styles.optionLine}/>
						 <TouchableOpacity
							 style={styles.optionButton}
						 >
							 <Text
							 style={styles.optionButtonText}
							 >
								 Rename
							 </Text>
						 </TouchableOpacity>
						 <View style={styles.optionLine}/>
						 <TouchableOpacity
							 style={styles.optionButton}
						 >
							 <Text
								 style={styles.optionButtonText}
							 >
								 Cancel
							 </Text>
						 </TouchableOpacity>
					 </View>
				 </Modal>*/
