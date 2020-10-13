import React, {Component} from "react";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	SafeAreaView,
	Modal,
	Slider,
	TouchableOpacity,
	Picker,
} from "react-native";

import {
	API_CONTROL_DEVICE,
	API_LOAD_DEVICE, BOOTSTRAP_COLOR_DANGER,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_PRIMARY,
	BOOTSTRAP_COLOR_SUCCESS, XEO_BLUE
} from "../../constants";


import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit'
import {element} from "prop-types";

import {socket_io} from "../DashboardScreen/DashboardScreen";


export default class ControlDeviceScreen extends Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Device: ' + ( navigation.state.params.device_name === undefined ? '' : navigation.state.params.device_name ),
		headerRight: () => (
			<TouchableOpacity onPress={ () => {
				navigation.navigate('device_alarms', {device_id: navigation.state.params.device_id})
			}}>
				<Image
					style={{height: 40, width: 40, marginRight: 15}}
					source={require('../../assets/images/clock_icon.png')}
				/>
			</TouchableOpacity>
		)
	});

	constructor() {
		super();
		this.state = {
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
			modal_visible: false,
			selected_action_type_index: 0,
			action_parameters: [],

			device_status_types_list:[],
			device_status_list: []
		};
	}

	componentDidMount() {
		this.loadDevice();
		this.setWebSocketHandler();
	}

	componentWillUnmount(){
		this.removeWebSocketHandler();
	}

	loadDevice(){
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
				device_status_types_list: response['status_types'],
				device_status_list: response['statuses']
			});
			this.props.navigation.setParams({
				device_name: response['name']
			});
		}).catch((error) => {
			alert(error)
		});
	}

	requestExecuteAction(action_type_id: number, parameters: []){
		parameters = parameters ? parameters : [];
		fetch(API_CONTROL_DEVICE, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.state.device_id,
				action_type_id: action_type_id,
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

	renderParameterInput(parameter_type, index){
		const {theme} = this.props.screenProps;
		const current_value = this.state.action_parameters[index].value;
		return parameter_type.options.length === 0 ? (
			<View style={{paddingHorizontal: '10%', paddingVertical: '5%'}}>
				<Text style={{fontSize: 20, color: theme.textColor}}>
					{parameter_type.name}: {current_value} {parameter_type['unit']}
				</Text>
				<Slider
					style={{width: 300, height: 30, borderRadius: 50}}
					thumbTintColor={XEO_BLUE}
					minimumTrackTintColor={theme.textColor}
					maximumTrackTintColor={theme.textColor}
					minimumValue={parameter_type.min}
					maximumValue={parameter_type.max}
					step={parameter_type.step}
					value={current_value}
					onValueChange={ (value)=> {
						let aux = this.state.action_parameters;
						aux[index].value = value;
						this.setState({action_parameters: aux});
					}}
				/>
			</View>
		) : (
			<View style={{paddingHorizontal: '10%', paddingVertical: '5%'}}>
				<Text style={{fontSize: 20}}>
					{parameter_type.name}
				</Text>
				<Picker
					mode="dialog"
					selectedValue={current_value}
					style={{}}
					onValueChange={(itemValue, itemIndex) => {
						let aux = this.state.action_parameters;
						aux[index].value = itemValue;
						this.setState({action_parameters: aux});
					}}>
					{
						parameter_type['options'].map((item) =>{
							return(
								<Picker.Item label={item.label} value={item.value} key={item.id}/>
							);
						})
					}
				</Picker>
			</View>
		)
	}

	renderParametersList(){
		const {theme} = this.props.screenProps;
		const action_type = this.state.device_actions_types[this.state.selected_action_type_index];
		return(
			<View style={{backgroundColor: theme.screenBackgroundColor, flex: 1}}>
				<FlatList
					data={action_type['parameters_types']}
					renderItem={ ({item, index}) => this.renderParameterInput(item, index) }
					keyExtractor={ (item) => String(item.id) }
				/>
				<View style={{width: '50%', alignSelf: 'center'}}>
						<TouchableOpacity
							onPress={ () => {
								this.requestExecuteAction(action_type.id, this.state.action_parameters);
								this.setState({
									modal_visible: false
								});
							}}>
							<Text
								style={{
									backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
									padding: '5%',
									color: BOOTSTRAP_COLOR_LIGHT,
									fontSize: 16,
									textAlign: 'center',
									borderRadius: 10,
								}}
							>
								{action_type.name}
							</Text>
						</TouchableOpacity>
				</View>
			</View>
		)
	}

	renderParametersModal(){
		return(
			<Modal
				visible={this.state.modal_visible}
				onRequestClose={ () => {
					this.setState({modal_visible: false} );
				} }
				animationType="fade"
			>
				{this.state.modal_visible && this.renderParametersList()}
			</Modal>
		)
	}

	renderActionButton(action_type, index){
		return(
			<View style={styleActions.buttonBox}>
				<TouchableOpacity
					onPress={ () => {
					if (action_type['parameters_types'].length === 0) {
						this.requestExecuteAction(action_type.id);
					} else {
						let parameters = action_type['parameters_types'].map( (item) => (
							{
								value: item.default,
								parameter_type_id: item.id
							})
						);
						this.setState({
							action_parameters: parameters,
							selected_action_type_index: index,
							modal_visible: true
						});
					}
				}}
					style={{
					}}
				>
					<Text
						style={{
							backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
							padding: '5%',
							color: BOOTSTRAP_COLOR_LIGHT,
							fontSize: 16,
							textAlign: 'center',
							borderRadius: 10
						}}
					>
						{action_type.name}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	setWebSocketHandler(){
		//console.warn("aaa");
		socket_io.off().on('message', (message) => {

			if(message['device_id'] !== this.state.device_id)
				return;

			let index = this.state.device_status_list.findIndex( element => element['status_type_id'] === message['status_type_id']);

			if (index === -1)
				return;

			let aux = this.state.device_status_list;
			aux[index].value = message['value'];
			this.setState({
				device_status_list: aux
			});
		});

	}

	removeWebSocketHandler(){
		//console.warn("bbb");
	}

	renderStatusView(){
		const {theme} = this.props.screenProps;
		try {
			return (
				<View style={{paddingHorizontal: '5%'}}>
					{
						this.state.device_status_types_list.map(item => {

								let status = this.state.device_status_list.find(element => element['status_type_id'] === item['id']);
								let status_value = "Unknown";

								try {
									status_value = item.options.find(element => element.value === status.value).label;
								} catch (e) {
									status_value = status.value;
								}

								return (
									<Text
										key={'status_' + item.id}
										style={{fontSize: 18, padding: 2, color: theme.textColor}}
									>
										{item['label']}: {status_value}{item.unit}
									</Text>
								)
							}
						)
					}
				</View>
			)
		}catch (e) {
			return (<View/>)
		}
	}

	render(){
		const {theme} = this.props.screenProps;
		return (
			<SafeAreaView style={[styles.container, {
				backgroundColor: theme.screenBackgroundColor
			}]}>
				<Text
					style={[styles.deviceStatus, {
						color: theme.textColor
					}]}>
					Status: <Text style={this.state.device_connected ? styles.deviceStatusConnected : styles.deviceStatusDisconnected}>
						{this.state.device_connected ? 'connected': 'disconnected'}
						</Text>
				</Text>
				<Text style={[styles.deviceLastConnection, {
					color: theme.textColor
				}]}>
					(Last sync: {this.state.device_last_connection})
				</Text>
				{this.renderStatusView()}
				<View style={styleActions.container}>
					<Text
						style={[styleActions.title, {
							color: theme.textColor
						}]}
					>
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
				{this.renderParametersModal()}
			</SafeAreaView>
		)
	}

	loadSensorData(){
		fetch("https://dashboard.xeosmarthome.com/api/device/4/sensor/temperature",{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			let length = response['timestamps'].length, labels = [], data = [];

			for(let i=0; i<100; i++){
				labels.push(response['timestamps'][length - i - 1]);
				data.push(response['values'][length - i - 1]);
			}

			let line = {
				labels: [],
				datasets: [
					{
						data: data,
						strokeWidth: 5, // optional
					}
				]
			};
			this.setState({
				line:line
			})
		}).catch((error) => {
			alert(error)
		});
	}

	renderCharts(){
		if(! this.state.line)
			return (<Text>Loading</Text>)
		return (
			<View>
				<Text>
					Temperature sensor
				</Text>
				<LineChart
					chartConfig={{
						backgroundColor: XEO_BLUE,
						backgroundGradientFrom: XEO_BLUE,
						backgroundGradientTo: "#ffffff",
						decimalPlaces: 1, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 20,
						}
					}}
					style={{
						marginVertical: 10
					}}
					data={this.state.line}
					width={360} // from react-native
					height={220}
					yAxisSuffix={"'C"}
					bezier
					withDots={false}
					yAxisInterval={5}
					withShadow={false}
					segments={5}
				/>
			</View>
		)
	}
}

let line = {
	labels: [0],
	datasets: [
		{
			data: [0],
			strokeWidth: 2, // optional
		}
	],
};

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
	},
	deviceName:{
		//alignSelf: 'center',
		fontSize: 26,
		padding: 10
	},
	deviceStatus:{
		//alignSelf: 'center',
		fontSize: 20,
		padding: 10
	},
	deviceStatusConnected:{
		color: BOOTSTRAP_COLOR_SUCCESS
	},
	deviceStatusDisconnected:{
		color: BOOTSTRAP_COLOR_DANGER
	},
	deviceLastConnection:{
		padding: 10
	}
});
