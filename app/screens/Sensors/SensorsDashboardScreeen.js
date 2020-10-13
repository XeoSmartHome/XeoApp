import React, {Component} from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
	FlatList,
	StatusBar
} from "react-native";
import {Icon} from "react-native-elements";
import {API_LOAD_SENSORS, BOOTSTRAP_COLOR_SECONDARY, XEO_BLUE} from "../../constants";


export default class SensorsDashboardScreen extends Component{
	constructor() {
		super();
		this.state = {
			devices: []
		}
	}

	componentDidMount() {
		this.loadSensors();
	}

	loadSensors(){
		fetch(API_LOAD_SENSORS).then(
			(response) => response.json()
		).then( (response) => {
			this.setState({
				devices: response
			})
		}).catch( (error) => {
			alert(error);
		})
	}

	renderDeviceBox(device, index){
		const {mode, theme, setTheme} = this.props.screenProps;
		return(
			<View style={styles.device_box}>
				<Text style={[styles.device_name, {
					color: theme.textColor,
					borderColor: theme.textColor
				}]}>
					{device.name}
				</Text>
				<View>
					{
						device.sensors.map((sensor, index) =>
							<TouchableOpacity
								key={'sensor_' + sensor.id}
								onPress={ () => {
									this.props.navigation.navigate('sensor',
										{
											sensor_id: sensor.id,
											sensor_name: sensor.name,
											device_id: device.id,
											device_name: device.name
										})
								}}
							>
								<Text style={[styles.sensor_row_text, {
									color: theme.textColor
								}]}>
									{sensor.name}: {sensor.value}{sensor.unit}
								</Text>
							</TouchableOpacity>
						)
					}
				</View>
			</View>
		)
	}

	render(){
		const {theme} = this.props.screenProps;
		return(
			<SafeAreaView style={{
				backgroundColor: theme.screenBackgroundColor,
				flex: 1
			}}>
				<StatusBar hidden={true}/>
				<FlatList
					data={this.state.devices}
					renderItem={ ({item, index}) => this.renderDeviceBox(item, index) }
					keyExtractor={(item) => 'device_' + item.id}
				/>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	device_box:{
		marginHorizontal: '4%',
		marginVertical: 10,
		paddingHorizontal: 5,
		borderWidth: 2,
		borderRadius: 12,
		borderColor: XEO_BLUE,

		/*shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,*/
	},
	device_name:{
		fontSize: 22,
		borderBottomWidth: 2,
		borderBottomColor: BOOTSTRAP_COLOR_SECONDARY,
		padding: 6
	},
	sensor_row_text:{
		fontSize: 18,
		paddingVertical: 10,
		paddingHorizontal: 6,
	}
});
