import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ProgressBar} from "react-native-paper";
import {mapValue} from "react-native-chart-kit/dist/Utils";
import {API_LOAD_SENSORS} from "../../api/api_routes_v_1.0.0.0";
import I18n from 'i18n-js';


const t = (key) => I18n.t('.' + key);


export default class SensorsDashboardScreenV2 extends React.Component {
	constructor() {
		super();
		this.state = {
			devices: []
		}
	}


	fetchSensors() {
		return fetch(API_LOAD_SENSORS, {method: 'GET'});
	}

	fetchSensorsCallback(response) {
		return response.json();
	}

	fetchSensorsSetState(response) {
		this.setState({
			devices: response
		});
	}

	loadSensors() {
		this.fetchSensors().then(this.fetchSensorsCallback).then(this.fetchSensorsSetState.bind(this)).catch((error) => console.warn(error));
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadSensors();
			}
		);
		this.loadSensors();
	}

	onSensorPress(sensor) {
		/*this.props.navigation.navigate('sensor',
			{
				sensor_id: sensor['id']
			});*/
	}

	renderSensor(sensor, index) {
		const {theme} = this.props.screenProps;
		const sensor_value = mapValue(sensor['value'], sensor['min_value'], sensor['max_value'], 0, 1)
		return (
			<TouchableOpacity
				key={'sensor_' + index}
				onPress={() => this.onSensorPress(sensor)}
			>
				<Text
					style={styles.sensor_name}
				>
					{sensor['name']}: {sensor['value']}{sensor['unit']}
				</Text>
				<ProgressBar
					color={theme.primaryColor}
					style={styles.progress_bar}
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
				style={styles.device_view}
			>
				<Text
					style={styles.device_name}
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
				contentContainerStyle={styles.scroll_view_content_container}
			>
				{
					this.state.devices.map(this.renderDevice.bind(this))
				}
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	scroll_view_content_container: {
		padding: '3%'
	},
	device_view: {
		paddingBottom: 50
	},
	device_name: {
		color: theme.textColor,
		fontSize: 20,
		borderBottomWidth: 1,
		borderColor: theme.textColor,
		paddingBottom: 6
	},
	sensor_name: {
		color: theme.textColor,
		fontSize: 18,
		paddingTop: 8,
		paddingBottom: 4
	},
	progress_bar: {
		height: 16,
		//borderWidth: 1,
		borderColor: theme.textColor
	}
});
