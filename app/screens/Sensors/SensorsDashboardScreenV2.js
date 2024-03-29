import React from "react";
import {ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {ProgressBar} from "react-native-paper";
import {mapValue} from "react-native-chart-kit/dist/Utils";
import I18n from 'i18n-js';
import {API} from "../../api/api";


const t = (key) => I18n.t('.' + key);


export default class SensorsDashboardScreenV2 extends React.Component {
	constructor() {
		super();
		this.state = {
			devices: []
		}
	}


	loadSensorsCallback(response) {
		this.setState({
			devices: response
		});
	}

	loadSensors() {
		API.sensors.getSensors().then(
			this.loadSensorsCallback.bind(this)
		).catch(
			(error) => console.warn(error)
		)
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
					style={[styles.sensor_name, {
						color: theme.textColor
					}]}
				>
					{sensor['name']}: {sensor['value']}{sensor['unit']}
				</Text>
				<ProgressBar
					color={theme.primaryColor}
					style={[styles.progress_bar]}
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
					style={[styles.device_name, {
						color: theme.textColor,
						borderColor: theme.textColor,
					}]}
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
		fontSize: 20,
		borderBottomWidth: 1,
		paddingBottom: 6
	},
	sensor_name: {
		fontSize: 18,
		paddingTop: 8,
		paddingBottom: 4
	},
	progress_bar: {
		height: 16,
	}
});
