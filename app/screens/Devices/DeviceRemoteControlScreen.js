import React from "react";
import I18n from 'i18n-js';
import {
	Image,
	ScrollView, Text, TouchableOpacity, View

} from 'react-native';
import {API_CONTROL_DEVICE, API_LOAD_DEVICE, BOOTSTRAP_COLOR_LIGHT} from "../../constants";
import {socket_io} from "../DashboardScreen/DashboardScreen";


const t = (key) => I18n.t('device_remote_control.' + key);


export default class DeviceRemoteControlScreen extends React.Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Devices: ' + ( navigation.state.params.device_name === undefined ? '' : navigation.state.params.device_name ),
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
			device_connected: null,
			device_active: null,
			device_actions_types: [],
			device_statuses: []
		}
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
				//device_serial: response['serial'],
				//device_image: response['image'],
				device_connected: response['connected'],
				device_active: response['active'],
				//device_schedule_active: response['schedule_active'],
				//device_last_connection: response['last_connection'],
				//device_actions: response['actions'],
				device_actions_types: response['actions_types'],
				//device_status_types: response['status_types'],
				//device_status_list: response['statuses']
				device_statuses: response['statuses_2']
			});
			this.props.navigation.setParams({
				device_name: response['name']
			});
		}).catch((error) => {
			alert(error)
		});
	}

	setWebSocketHandler() {
		socket_io.off().on('message', (message) => {
			try {
				if (message['device_id'] !== this.state.device_id)
					return;

				let status_index = this.state.device_statuses.findIndex((status_type) => status_type['id'] === message['status_type_id']);
				let statuses = this.state.device_statuses;
				statuses[status_index]['value'] = message['value'];
				this.setState({
					device_statuses: statuses
				})
			}catch (error) {

			}
		});
	}

	componentDidMount() {
		this.loadDevice();
		this.setWebSocketHandler();
	}

	executeAction(action_type_id: number){
		//parameters = parameters ? parameters : [];
		fetch(API_CONTROL_DEVICE, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.state.device_id,
				action_type_id: action_type_id,
				parameters: []
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

	onActionButtonPress(action_type) {
		if(action_type['parameters_types'].length === 0){
			this.executeAction(action_type['id'])
		} else {
			console.warn(action_type.style)
		}
	}

	renderActionButton(action_type, index) {
		const {theme} = this.props.screenProps;
		return (
			<View key={'device_action_type_' + index}>
				<TouchableOpacity
					style={{
						backgroundColor: theme.primaryColor,
						width: '70%',
						alignSelf: "center",
						marginVertical: 6,
						padding: 6,
						borderRadius: 8,
					}}
					disabled={false}
					onPress={ () => {
						this.onActionButtonPress(action_type);
					}}
				>
					<Text
						style={{
							alignSelf: "center",
							color: BOOTSTRAP_COLOR_LIGHT,
							fontSize: 18
						}}
					>
						{action_type['name']}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderDeviceStatus(status, index){
		const {theme} = this.props.screenProps;
		const option = status['options'].find((option) => option.value === status.value);
		return (
			<Text
				key={'device_status_' + index}
				style={{
					color: theme.textColor,
					fontSize: 18
				}}
			>
				{ status.label }: { option?.label || status.value }{ status.unit }
			</Text>
		)
	}

	renderDeviceStatuses(){
		const {theme} = this.props.screenProps;
		if(this.state.device_statuses.length === 0) {
			return null;
		}
		return (
			<View
				style={{
					//borderTopWidth: 2,
					borderBottomWidth: 2,
					borderColor: theme.textColor,
					paddingVertical: 10,
				}}
			>
				{
					this.state.device_statuses.map(this.renderDeviceStatus.bind(this))
				}
			</View>
		)
	}

	renderDeviceConnectionStatus(){
		const {theme} = this.props.screenProps;
		return (
			<Text
				style={{
					color: theme.textColor,
					fontSize: 20,
					borderBottomWidth: 2,
					borderColor: theme.textColor,
					paddingBottom: 10
				}}
			>
				Status: <Text
					style={{
						color: this.state.device_connected === theme.warningColor ? '#' : this.state.device_connected ? theme.successColor : theme.dangerColor
					}}
				>
					{
						this.state.device_connected === null ? '' : this.state.device_connected ? 'connected' : 'disconnected'
					}
				</Text>
			</Text>
		)
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: theme.screenBackgroundColor,
				}}
				contentContainerStyle={{
					padding: '3%'
				}}
			>
				{
					this.renderDeviceConnectionStatus()
				}
				{
					this.renderDeviceStatuses()
				}
				{
					this.state.device_actions_types.map(this.renderActionButton.bind(this))
				}
			</ScrollView>
		)
	}
}
