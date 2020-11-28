import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {API_LOAD_SENSORS} from "../../constants";
import {ProgressBar} from "react-native-paper";
import {mapValue} from "react-native-chart-kit/dist/Utils";

const t = (key) => I18n.t('.' + key);


export default class SensorsDashboardScreenV2 extends React.Component{
	constructor() {
		super();
		this.state = {
			devices: []
		}
		this.loadSensors();
	}

	loadSensors(){
		fetch(API_LOAD_SENSORS).then(
			(response) => response.json()
		).then( (response) => {
			this.setState({
				devices: response
			});
		}).catch( (error) => {
			alert(error);
		})
	}

	componentDidMount(){
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				//this.loadSensors();
			}
		);
	}

	onSensorPress(sensor){
		/*this.props.navigation.navigate('sensor',
			{
				sensor_id: sensor['id']
			});*/
	}

	renderSensor(sensor, index){
		const {theme} = this.props.screenProps;
		const sensor_value = mapValue(sensor['value'], sensor['min_value'], sensor['max_value'], 0, 1)
		return (
			<TouchableOpacity
				key={'sensor_' + index}
				onPress={ () => this.onSensorPress(sensor) }
			>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 18,
						paddingTop: 8,
						paddingBottom: 4
					}}
				>
					{sensor['name']}: {sensor['value']}{sensor['unit']}
				</Text>
				<ProgressBar
					color={theme.primaryColor}
					style={{
						height: 16,
						//borderWidth: 1,
						borderColor: theme.textColor
					}}
					progress={sensor_value}
				/>
			</TouchableOpacity>
		)
	}

	renderDevice(device, index) {
		const {theme} = this.props.screenProps;
		return (
			<View
				key={'device_' + index}
				style={{
					paddingBottom: 25
				}}
			>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 20,
						borderBottomWidth: 1,
						borderColor: theme.textColor,
						paddingBottom: 6
					}}
				>
					{device['name']}
				</Text>
				{
					device['sensors'].map(this.renderSensor.bind(this))
				}
			</View>
		)
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
				contentContainerStyle={{
					padding: '3%'
				}}
			>
				{
					this.state.devices.map(this.renderDevice.bind(this))
				}
			</ScrollView>
		)
	}
}
