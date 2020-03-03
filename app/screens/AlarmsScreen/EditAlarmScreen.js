import React, {Component} from "react";
import {
	FlatList,
	Text,
	StyleSheet,
	View,
	Switch,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Slider,
	Alert, Button, Modal
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import CronParser from "../utils/CronParser";


function serializeCron(minute:string, hour:string, day_of_month:string, month: string, day_of_week:string, year:string) {
	return '0 ' + minute + ' ' + hour + ' ' + day_of_month + ' ' + month + ' ' + day_of_week + ' ' + year;
}

let cronParser = new CronParser();

export default class EditAlarmScreen extends Component{
	constructor() {
		super();
		this.state = {
			action_id: 0,
			action_name: '',
			action_cron: '',
			action_active: false,
			parameters: [],
			show_clock_input: false,
			date: new Date(0),
			hour: 0,
			minute: 0,
			repeat_days: [false, false, false, false, false, false, false],
			create_new: false,
			possible_actions: [],
		};

	};

	componentDidMount(){
		if(this.props.navigation.state.params['create_new'] !== undefined) {
			this.setState({create_new: true, device_id: this.props.navigation.state.params['device_id']});
			this.loadDevice();
		} else {
			let action = this.props.navigation.state.params['action'];
			let action_descriptor = this.props.navigation.state.params['action_type'];
			cronParser.deserializeCron(action['cron']);
			this.setState(
				{
					action_id: action['id'],
					action_name: action_descriptor['name'],
					action_active: action['active'],
					parameters: action['parameters'],
					action_uri: action_descriptor['uri'],
					possible_parameters: action_descriptor['parameters_types'],
					hour: cronParser.hours[0],
					minute: cronParser.minutes[0],
					repeat_days: cronParser.days_of_week,
				}
			);
		}
	}

	loadDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/device/' + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({ actions_types: response['actions_types']});
			}
		).catch((error) => {
			alert(error)
		});
	}

	requestActionUpdate(){
		// TODO: finish this ****
		let repeat_days = '';
		for(let i = 0; i < 7; i++)
			repeat_days += this.state.repeat_days[i] ? String(i) + ',' : '';
		if (repeat_days[repeat_days.length-1] === ',')
			repeat_days = repeat_days.substr(0, repeat_days.length-1);

		let cron = serializeCron(
			String(this.state.minute),
			String(this.state.hour),
			'?',
			'*',
			repeat_days,
			'*'
		);
		fetch('https://dashboard.xeosmarthome.com/api/update_action', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action_id: this.state.action_id,
				cron:cron,
			})
		}).then(
			(response) => response.json()
		).then((response) => {
			if(response['status'] === 'success'){
				this.props.navigation.goBack();
			} else {
				alert(response['message']);
			}
		}).catch((error) => {
			alert(error)
		});
	}

	WeekDay(index){
		return(
			<TouchableOpacity
				style={styles.repeatDay}
				onPress={ () => {
					let aux = this.state.repeat_days;
					aux[index] = !aux[index];
					this.setState({repeat_days: aux});
				}}
			>
				<Text
					style={this.state.repeat_days[index]===true ? [styles.repeatDaySelected, styles.repeatDayText] : styles.repeatDayText}
				>
					{weekDays[index]}
				</Text>
			</TouchableOpacity>
		)
	}

	renderParameterInput(possible_parameter, index){
		let parameter = this.state.parameters.find( (obj) => obj.name === possible_parameter['name']);
		return(
			<View>
				<Text style={{fontSize: 20}}>
					{possible_parameter['name']}: {parameter.value}
				</Text>
				<Slider style={styles.slider}
					thumbTintColor="#4267b2"
					minimumTrackTintColor="#abcaff"
					value={parameter['value']}
					minimumValue={possible_parameter['min']}
					maximumValue={possible_parameter['max']}
					step={possible_parameter['step']}
					onValueChange={ (value) => {
						let aux = this.state.parameters;
						aux[index]['value'] = value;
						this.setState( {parameters: aux} );
					} }
				/>
			</View>
		)
	}

	requestAddAction(device_id, action_type_id){
		fetch('https://dashboard.xeosmarthome.com/api/add_action', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: device_id,
				action_type_id: action_type_id
			})
		}).then(
			(response) => response.json()
		).then((response) => {
				alert(response['message'])
			}
		).catch((error) => {
			alert(error)
		});
	}

	renderPossibleActionItem(action_type, index){
		return(
			<TouchableOpacity
				style={{alignSelf: 'center', borderWidth: 3, borderColor: '#4267b2', padding: 10, margin: 10, borderRadius: 10, width: '50%'}}
				onPress={ () => {
					this.requestAddAction(this.state.device_id, action_type.id);
					//this.setState({create_new: false});
					this.props.navigation.goBack();
				}}
			>
				<Text style={{alignSelf: 'center', fontSize: 22}}>{action_type["name"]}</Text>
			</TouchableOpacity>
		)
	}

	renderCreateAction(){
		return(
			<View style={styles.container}>
				<FlatList
					style={{}}
					data={this.state.actions_types}
					renderItem={({item, index}) => this.renderPossibleActionItem(item, index)}
					numColumns={1}
					keyExtractor={ (item) => String(item['id']) }
				/>
			</View>
			//TODO: get a list of possible actions for this device, and render a select method,
			// then make a request to api
			// then set state.create_new to false
		)
	}

	renderEditAction(){
		return(
			<SafeAreaView style={styles.container}>
				<Text style={styles.alarmTitle}>{this.state.action_name}</Text>
				<View style={styles.alarmClockView}>
					<TouchableOpacity
						onPress={ () => {
							this.setState({show_clock_input: true});
						}}
					>
						<Text style={styles.alarmClockText}>
							{this.state.hour > 9 ? String(this.state.hour) : '0' + String(this.state.hour)}
							:
							{this.state.minute > 9 ? String(this.state.minute) : '0' + String(this.state.minute)}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.repeatView}>
					<Text style={styles.repeatTitle}>Repeat</Text>
					<View style={styles.repeatDays}>
						{this.WeekDay(0)}
						{this.WeekDay(1)}
						{this.WeekDay(2)}
						{this.WeekDay(3)}
						{this.WeekDay(4)}
						{this.WeekDay(5)}
						{this.WeekDay(6)}
					</View>
				</View>
				<FlatList
					style={styles.flatList}
					data={this.state.possible_parameters}
					numColumns={1}
					renderItem={ ({item, index}) => this.renderParameterInput(item, index) }
					keyExtractor={ (item) => String(item['id']) }
				/>
				<Button title="save" onPress={() => {
					this.requestActionUpdate();
				}}/>

				{this.state.show_clock_input && (<DateTimePicker
					testID="dateTimePicker"
					timeZoneOffsetInMinutes={0}
					mode="time"
					value={this.state.date}
					is24Hour={true}
					onChange={(event, date) => {
						if(date !== undefined) {
							this.setState({
								hour: date.getHours(),
								minute: date.getMinutes(),
								show_clock_input: false
							});
						}
					}}
				/>)}
			</SafeAreaView>
		)
	}

	render(){
		return this.state.create_new ? this.renderCreateAction() : this.renderEditAction()
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: '2%',
		paddingTop: 10
	},
	alarmTitle:{
		alignSelf: 'center',
		fontSize: 26,
		padding: 10
	},
	alarmClockView:{
		width: '96%',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 10,
		paddingVertical: 10,
		borderColor: '#4267b2',
		borderTopWidth: 2,
		borderBottomWidth: 2
	},
	alarmClockText:{
		fontSize: 70,
	},
	repeatView:{
		borderColor: '#4267b2',
		borderBottomWidth: 2,
		paddingVertical: 10,
		width: '96%',
		alignSelf: 'center'
	},
	repeatTitle:{
		fontSize: 20,
	},
	repeatDays:{
		flexDirection: 'row',
		paddingTop: 10
	},
	repeatDay:{
		width: '14.28%',
		alignItems: 'center',
	},
	repeatDayText:{
		borderRadius: 35,
		borderColor: '#4267b2',
		textAlign: 'center',
		textAlignVertical: 'center',
		width: 35,
		height: 35,
		fontSize: 18,
	},
	repeatDaySelected:{
		borderWidth: 3,
		color: '#4267b2',
		fontWeight: 'bold',
	},
	flatList:{
		padding: 10
	},
	slider:{
		marginVertical: 10
	},
});

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];


/*renderAddActionModal(){
	return(
		<Modal
			animationType="fade"
			transparent={false}
			visible={this.state.add_action_modal_visible}
			onRequestClose={() => {
				this.setState({add_action_modal_visible: false});
			}}>
			<Picker
				selectedValue={this.state.language}
				style={{height: 50, width: 100}}
				onValueChange={(itemValue, itemIndex) => {
					this.requestAddAction(this.state.device.id, itemValue);
					this.setState({language: itemValue, add_action_modal_visible: false});
				}}>
				{
					this.state.device.possible_actions.map( (item) =>
						<Picker.Item label={item['name']} value={item['id']} key={item['name']}/>
					)
				}
			</Picker>
		</Modal>
	)
}*/