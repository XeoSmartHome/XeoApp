import React, {Component} from "react";
import {
	FlatList,
	Text,
	StyleSheet,
	View,
	Switch,
	TouchableOpacity,
	SafeAreaView,
	Image,
	Picker,
	Modal
} from "react-native";
import {ToggleButton} from "react-native-paper";
import CronParser from "../utils/CronParser";


export default class AlarmsScreen extends Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: "Programed actions",
		headerRight:
			<TouchableOpacity onPress={ () => {
				navigation.navigate('device_edit_alarm', {
					device_id: navigation.state.params.device_id, create_new: true
				})
			}}>
				<Text style={styles.addButton}>+</Text>
			</TouchableOpacity>,
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
			device_actions:[],
			device_actions_types: [],
			add_action_modal_visible: false,
		};
	}

	componentDidMount(): void {
		this.loadDevice().then();
	}

	async loadDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/device/' + this.props.navigation.state.params.device_id,{
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

	RenderAlarm(action, index){
		//TODO: use a cron deserializer to parse device.cron
		//let days = [false, false, false, false, false, false, false];

		let cronParser = new CronParser();
		cronParser.deserializeCron(action.cron);
		let minute = cronParser.minutes[0];
		let hour = cronParser.hours[0];
		let days = cronParser.days_of_week;
		return(
			<TouchableOpacity
				style={styles.alarmItem}
				onPress={ () => {
					this.props.navigation.navigate('device_edit_alarm', {
						action: action, action_type: this.state.device_actions_types.find((obj) => obj.name === action.name)
					})
				} }
			>
				<View style={styles.alarmTimeView}>
					<Text style={styles.alarmTimeText}>
						{hour}:{minute}
					</Text>
					<Text style={styles.alarmActionText}>
						{action['name']}
					</Text>
				</View>
				<View style={styles.alarmDaysView}>
					<Text style={styles.alarmDaysText}>
						<Text style={days[0] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>M </Text>
						<Text style={days[1] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>T </Text>
						<Text style={days[2] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>W </Text>
						<Text style={days[3] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>T </Text>
						<Text style={days[4] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>F </Text>
						<Text style={days[5] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>S </Text>
						<Text style={days[6] ? styles.alarmDaysTextOn : styles.alarmDaysTextOff}>S</Text>
					</Text>
				</View>
				<View style={styles.alarmToggleSwitchView}>
					<Switch
						style={styles.alarmToggleSwitch}
						value={action['active']}
						onValueChange={ (value) => {
							let actions = this.state.device_actions;
							actions[index].active = value;
							this.setState({device_actions: actions});
						} }
						thumbColor="#4267b2"
						trackColor={{false: '#acacac', true: '#abcaff' }}
					/>
				</View>
			</TouchableOpacity>
		)
	}

	render(){
		return(
			<View style={styles.container}>
				<FlatList
					style={styles.flatList}
					numColumns={1}
					data={this.state.device_actions}
					renderItem={ ({item, index}) => this.RenderAlarm(item, index) }
					keyExtractor={ (item) => String(item.id) }
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	flatList:{
		flex: 1,
		marginHorizontal: '2%',
		marginTop: 10,
	},
	alarmItem:{
		height: 80,
		width: '96%',
		margin: 5,
		paddingHorizontal: 5,
		borderColor: '#4267b2',
		borderBottomWidth: 2,
		flexDirection: 'row'
	},
	alarmTimeView:{
		flex: 2,
		padding: 5,
		//justifyContent: 'center'
	},
	alarmTimeText:{
		fontSize: 22,
	},
	alarmActionText:{
		fontSize: 16,
		marginTop: 10
	},
	alarmDaysView:{
		flex: 2,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	alarmDaysText:{
		fontSize: 14,
		//fontWeight: 'bold'
	},
	alarmDaysTextOn:{
		color: '#000000'
	},
	alarmDaysTextOff:{
		color: '#9c9c9c'
	},
	alarmToggleSwitchView:{
		flex: 1,
		alignItems: 'flex-end'
	},
	alarmToggleSwitch:{
		height: '100%',
	},
	addButton:{
		marginRight: 20,
		fontSize: 50,
		color: 'white'
	},
});
