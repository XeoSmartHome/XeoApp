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
	ImageBackground,
	Modal,
	Slider,
	TouchableOpacity
} from "react-native";
import {API_CONTROL_DEVICE, API_LOAD_DEVICE} from "../../constants";


export default class ControlDeviceScreen extends Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		headerRight:
			<TouchableOpacity onPress={ () => {
				navigation.navigate('device_alarms', {device_id: navigation.state.params.device_id})
			}}>
				<Image
					style={{height: 40, width: 40, marginRight: 15}}
					source={require('../../assets/images/clock_icon.png')}
				/>
			</TouchableOpacity>,
	});

	constructor() {
		super();
		this.state = {
			modalVisible: [],
			device_id: 0,
			device_name: '',
			device_serial: '',
			device_image: '',
			device_connected: false,
			device_active: false,
			device_schedule_active: false,
			device_last_connection: '',
			device_actions: [],
			device_actions_types: [],
		};
	}

	componentDidMount() {
		this.loadDevice().then(()=>{
		});
	}

	async loadDevice(){
		fetch(API_LOAD_DEVICE + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({
				device_id: response['id'],
				device_name: response['name'],
				device_serial: response['serial'],
				device_image: response['image'],
				device_connected: response['connected'],
				device_active: response['active'],
				device_schedule_active: response['schedule_active'],
				device_last_connection: response['last_connection'],
				device_actions: response['actions'],
				device_actions_types: response['actions_types'],
			})
		}).catch((error) => {
			alert(error)
		});
		return ''
	}

	sendActionForExecution(action_type_id: number, parameters: []){
		fetch(API_CONTROL_DEVICE, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.state.device_id,
				possible_action_id: action_type_id,
				parameters: parameters
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				//alert(response.message);
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	renderParameterOption(option){
		return(
			<TouchableOpacity
				style={styleActions.optionButton}
			>
				<Text style={styleActions.optionButtonText}>
					{option['label']}
				</Text>
			</TouchableOpacity>
		)
	}

	renderParameterOptions(options){
		return(
			<View style={styleActions.optionsBox}>
				<FlatList
					numColumns={1}
					data={options}
					renderItem={({ item}) => this.renderParameterOption(item)}
					keyExtractor={(item => {String(item.id)} )}
				/>
			</View>
		)
	}

	/*<Slider
						maximumTrackTintColor="red"
						minimumTrackTintColor="blue"
						minimumValue={parameter.min}
						maximumValue={parameter.max}
						value={parameter.default}
						step={parameter.step}
						onValueChange={(value) => {this.setState({a: value})} }
					/>*/

	renderParameter(parameter){
		return(
			<View>
				<Text style={{alignSelf: 'center', fontSize: 24, margin: 25}}>{parameter.name}</Text>
				{this.renderParameterOptions(parameter['options'])}
			</View>
		)
	}

	renderActionButton(action_type, index){
		return(
			<View style={styleActions.buttonBox}>
				<Button
					onPress={()=>{
						let aux = this.state.modalVisible;
						//aux[index] = true;
						this.setState({modalVisible: aux});
						this.sendActionForExecution(action_type.id, [{name: 'socket', value: '1'}]);
					}}
					title={action_type.name}
				/>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible[index]===undefined ? false: this.state.modalVisible[index]}
					onRequestClose={()=>{
						let aux = this.state.modalVisible.slice();
						aux[index] = false;
						this.setState({modalVisible: aux})
					}}>
					<FlatList
						numColumns={1}
						data={action_type['parameters_types']}
						renderItem={({ item, index}) => this.renderParameter(item)}
						keyExtractor={item => String(item.id)}
					/>
				</Modal>
			</View>
		)
	}

	render(){
		return (
			<SafeAreaView style={styles.container}>
				<Text
					style={styles.deviceName}>
					Device: {this.state.device_name}
				</Text>
				<Text
					style={styles.deviceStatus}>
					Status: {this.state.device_connected ? 'connected': 'disconnected'}
				</Text>
				<Text style={styles.deviceLastConnection}>
					(Last sync: {this.state.device_last_connection})
				</Text>
				<View style={styleActions.container}>
					<Text
						style={styleActions.title}>
						Remote control
					</Text>
					<View>
						<FlatList
							numColumns={1}
							data={this.state.device_actions_types}
							renderItem={({ item, index}) => this.renderActionButton(item, index)}
							keyExtractor={item => String(item.id)}
						/>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}

const styleAlarms = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: 'gray',
		marginTop: 20
	}
});

const styleActions = StyleSheet.create({
	container:{
	},
	buttonBox:{
		width: '50%',
		margin: 6,
		alignSelf: 'center',
	},
	separator:{
		borderBottomWidth: 2,
		height: 0
	},
	title:{
		fontSize: 24,
		alignSelf: 'center',
		padding: 8
	},
	optionsBox:{
		//backgroundColor: 'gray',
	},
	optionButton:{
		//backgroundColor: 'green',
		alignSelf: 'center',
		justifyContent: 'center',
		width: '75%',
		margin: 5,
		padding: 5,
		borderRadius: 10,
		height: 50,
		borderWidth: 2,
		borderColor: '#4267b2'
	},
	optionButtonText:{
		alignSelf: 'center',
		fontSize: 20
	}
});


const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingTop: 10,
		backgroundColor: '#F5F5F5',
	},
	deviceName:{
		//alignSelf: 'center',
		fontSize: 28,
		padding: 10
	},
	deviceStatus:{
		//alignSelf: 'center',
		fontSize: 20,
		padding: 10
	},
	deviceLastConnection:{
		padding: 10
	}
});
