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
	Image, Dimensions, Button
} from "react-native";

import {
	LineChart,
} from "react-native-chart-kit";
import {
	API_URL,
	BOOTSTRAP_COLOR_DARK,
	BOOTSTRAP_COLOR_LIGHT,
	BOOTSTRAP_COLOR_SECONDARY,
	XEO_BLUE
} from "../../constants";
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import I18n from 'i18n-js';


const t = (key) => I18n.t('.' + key);


export default class SensorScreen extends Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		title:
			( navigation.state.params.device_name === undefined ? '' : navigation.state.params.device_name )
			+ ' - ' +
			( navigation.state.params.sensor_name === undefined ? '' : navigation.state.params.sensor_name ),
	});

	constructor() {
		super();
		this.state = {
			sensor_name: 'Temperature',
			sensor_value: 23.4,
			sensor_unit: '°C',

		};

	}

	registerForPushNotificationsAsync = async () => {
		let token;
			const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
			}
			/*token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);*/
		Notifications.addListener(notification => {

		})
	}

	sendPushNotification = async (expoPushToken) => {
		/*Notifications.scheduleNotificationAsync({
			content: {
				title: "You've got mail!",
				body: 'Here is the notification body',
				data: { data: 'goes here' },
			},
			trigger: { seconds: 2 },
		}).catch((e)=> console.warn(e));*/
		Notifications.scheduleLocalNotificationAsync({
			title: 'ok',
			body: 'Hello, you forget to secure the app with a PIN, Hello, you forget to secure the app with a PIN, Hello, you forget to secure the app with a PIN',
			data: {ok: 123},
		}, {
		}).catch((e) => alert(e));
	}

	getKey(){
		Notifications.getExpoPushTokenAsync().then( (data) => {
			console.warn(data);
		})
	}

	componentDidMount() {
		this.loadSensorData();
		//this.registerForPushNotificationsAsync().then().catch( (error)=> console.warn(error));
	}

	loadSensorData(){
		fetch(API_URL + 'device/' + this.props.navigation.state.params.device_id + '/sensor/' + this.props.navigation.state.params.sensor_id).then(
			(response) => response.json()
		).then(
			(response) => {
				//alert(response.message)
			}
		).catch(
			(error) => {
				alert(error)
			}
		)
	}

	render() {
		const {theme} = this.props.screenProps;
		return(
			<SafeAreaView
				style={
					[styles.container, {
						backgroundColor: theme.screenBackgroundColor
					}]
				}>
				<Text
					style={
						[styles.title, {
							color: theme.textColor
						}]
					}
				>
					{this.state.sensor_value}
					{this.state.sensor_unit}
				</Text>
				<View style={styles.separator}/>
					<LineChart
						data={{
							labels: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
							datasets: [
								{
									data: [
										Math.random() ,
										Math.random() ,
										Math.random() ,
										Math.random() ,
										Math.random() ,
										Math.random(),
										Math.random() ,
										Math.random() ,
										Math.random() ,
										Math.random() ,
										Math.random() ,
										Math.random()
									]
								}
							]
						}}
						width={Dimensions.get("window").width} // from react-native
						height={300}
						yAxisLabel=""
						yAxisSuffix="V"
						yAxisInterval={1} // optional, defaults to 1
						chartConfig={{
							backgroundColor: "#ffffff",
							backgroundGradientFrom: XEO_BLUE,
							backgroundGradientTo: XEO_BLUE,
							decimalPlaces: 1, // optional, defaults to 2dp
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16
							},
							propsForDots: {
								r: "4",
								strokeWidth: "1",
								stroke: BOOTSTRAP_COLOR_DARK
							}
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16
						}}
					/>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	title:{
		alignSelf: 'center',
		fontSize: 50,
		marginVertical: 10,
	},
	separator: {
		borderBottomWidth: 2,
		borderColor: BOOTSTRAP_COLOR_SECONDARY,
		width: '92%',
		marginHorizontal: '4%'
	}
});
