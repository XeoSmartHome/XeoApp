import React from "react";
import I18n from "i18n-js";
import {Picker, ScrollView, Slider, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {API_GET_DEVICE_TIMED_ACTION, API_UPDATE_ACTION, API_UPDATE_DEVICE_TIMED_ACTION} from "../../../constants";
import CronParser from "../../utils/CronParser";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Icon} from "react-native-elements";

const t = (key) => I18n.t('device_settings.' + key);

const cronParser = new CronParser();


function serializeCron(minute:string, hour:string, day_of_month:string, month: string, day_of_week:string, year:string) {
	return '0 ' + minute + ' ' + hour + ' ' + day_of_month + ' ' + month + ' ' + day_of_week + ' ' + year;
}

export default class EditTimedActionScreen extends React.Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: "Edit timed action",
		headerRight: () => (
			navigation.state.params.header_right
		)
	});

	constructor() {
		super();
		this.state = {
			action_id: null,
			action_name: '',
			action_active: null,
			date: new Date(),
			hour: 0,
			minute: 0,
			week_days: [false, false, false, false, false, false, false],
			parameters: [],
			show_clock_input: false,
		};
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadTimedAction();
			}
		);
		this.loadTimedAction();
		this.props.navigation.setParams({
			header_right: this.renderNavigationRightHeader()
		});
	}

	renderNavigationRightHeader() {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				style={{
					marginRight: 25,
				}}
				onPress={ () => {
					this.saveTimedActionUpdates();
					//console.warn('action updates saved');
					this.props.navigation.goBack();
				}}
			>
				<Text
					style={{
						fontSize: 20,
						color: theme.textColor,
						fontWeight: "bold"
					}}
				>
					SAVE
				</Text>
			</TouchableOpacity>
		)
	}

	loadTimedAction() {
		let request_args = new URLSearchParams({
			device_id: this.props.navigation.state.params.device_id,
			action_id: this.props.navigation.state.params.action_id
		}).toString();

		fetch(API_GET_DEVICE_TIMED_ACTION + '?' + request_args).then(
			(response) => response.json()
		).then(
			(response) => {
				const timed_action = response['timed_action'];
				cronParser.deserializeCron(timed_action['cron'])

				const date = new Date();
				date.setHours(cronParser.hours[0]);
				date.setMinutes(cronParser.minutes[0]);

				this.setState({
					action_id: timed_action['id'],
					action_name: timed_action['name'],
					action_active: timed_action['active'],
					parameters: timed_action['parameters'],
					date: date
				});
			}
		).catch(
			(error) => {
				console.warn(error);
			}
		)
	}

	saveTimedActionUpdates() {
		let parameters = this.state.parameters.map(
			(parameter) => ({
				name: parameter.name,
				value: parameter.value
			})
		);

		const cron = serializeCron(
			this.state.date.getMinutes(),
			this.state.date.getHours(),
			'?',
			'*',
			'*',
			'*');

		fetch(API_UPDATE_DEVICE_TIMED_ACTION, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.props.navigation.state.params.device_id,
				action_id: this.state.action_id,
				cron: cron,
				parameters: parameters
			})
		}).then(
			(response) => response.json()
		).then((response) => {
			this.props.navigation.goBack()
		}).catch((error) => {
			alert(error)
		});
	}

	renderTopSection() {
		const {theme} = this.props.screenProps;
		return (
			<View
				style={{
					flexDirection: "row",
					height: 60,
					borderBottomWidth: 2,
					borderBottomColor: theme.secondaryColor,
				}}
			>
				<Text
					style={{
						color: theme.textColor,
						flex: 2,
					}}
				>
					{

					}
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						flex: 1,
						paddingRight: '3%',
						alignItems: "center",
						justifyContent: "flex-end"
					}}
				>
					<Icon
						name='calendar'
						type='antdesign'
						color={theme.textColor}
						size={26}
					/>
					<Text
						style={{
							fontSize: 22,
							color: theme.textColor
						}}
					> Date
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderTimePicker() {
		return (
			this.state.show_clock_input
			&&
			<DateTimePicker
				timeZoneOffsetInMinutes={0}
				mode="time"
				value={this.state.date}
				is24Hour={true}
				onChange={(event, date) => {
					if(date !== undefined) {
						this.setState({
							date: date,
							show_clock_input: false
						});
					}
				}}
			/>
		)
	}

	onPickTimePress() {
		this.setState({
			show_clock_input: true
		});
	}

	renderTimeInput() {
		const {theme} = this.props.screenProps;
		const hour = this.state.date.getHours();
		const minute = this.state.date.getMinutes();
		return (
			<View
				style={[
					styles.time_input_section, {
						borderBottomColor: theme.secondaryColor
					}
				]}
			>
				<TouchableOpacity
					onPress={ this.onPickTimePress.bind(this) }
				>
					<Text
						style={[
							styles.time_input_text, {
								color: theme.textColor
							}
						]}
					>
						{hour > 9 ? String(hour) : '0' + String(hour)}
						:
						{minute > 9 ? String(minute) : '0' + String(minute)}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	onWeekDayPress(day_index) {
		let week_days = this.state.week_days;
		week_days[day_index] = ! week_days[day_index];

		this.setState({
			week_days: week_days
		});
	}

	renderRepeatDays() {
		const {theme} = this.props.screenProps;
		const week_days_short_names = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
		return (
			<View
				style={{
					paddingVertical: '5%',
					borderBottomWidth: 2,
					borderBottomColor: theme.secondaryColor
				}}
			>
				<Text
					style={{
						fontSize: 22,
						color: theme.textColor,
						marginBottom: '3%'
					}}
				>
					Repeat
				</Text>
				<View
					style={{
						flexDirection: "row",
					}}
				>
					{
						this.state.week_days.map( (day_selected, day_index) =>
							<TouchableOpacity
								key={'week_dey_' + day_index}
								style={{
									width: '14.28%',
									alignItems: "center"
								}}
								onPress={ () => this.onWeekDayPress(day_index) }
							>
								<Text
									style={{
										color: day_selected === true ? theme.textColor : theme.secondaryColor,
										borderRadius: 40,
										borderColor: theme.primaryColor,
										textAlign: 'center',
										textAlignVertical: 'center',
										width: 40,
										height: 40,
										fontSize: 20,
										borderWidth: day_selected === true ? 2 : 0,
										fontWeight: day_selected === true ? 'bold' : 'normal',
									}}
								>
									{
										week_days_short_names[day_index]
									}
								</Text>
							</TouchableOpacity>
						)
					}
				</View>
			</View>
		)
	}

	renderSliderInput(parameter, index) {
		const {theme} = this.props.screenProps;
		return (
			<View>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 20
					}}
				>
					{ parameter.name }: { parameter['value'] } { parameter['unit'] }
				</Text>
				<Slider
					style={{
						height: 50
					}}
					thumbTintColor={theme.primaryColor}
					minimumTrackTintColor={theme.primaryColor}
					value={parameter['value']}
					minimumValue={parameter['min_value']}
					maximumValue={parameter['max_value']}
					step={parameter['step']}
					onValueChange={ (value) => {
						let aux = this.state.parameters;
						aux[index]['value'] = value;
						this.setState( {parameters: aux} );
					} }
				/>
			</View>
		)
	}

	renderPickerInput(parameter, index) {
		const {theme} = this.props.screenProps;
		return (
			<View>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 20
					}}
				>
					{ parameter.name }: { parameter['value'] } { parameter['unit'] }
				</Text>
				<Picker
					mode="dialog"
					selectedValue={parameter['value']}
					style={{
						color: theme.textColor
					}}
					onValueChange={(itemValue, itemIndex) => {
						let aux = this.state.parameters;
						aux[index]['value'] = itemValue;
						this.setState( {parameters: aux} );
					}}>
					{
						parameter['options'].map( (item) =>
							<Picker.Item
								label={item.label}
								value={item.value}
								key={item.id}
							/>
						)
					}
				</Picker>
			</View>
		)
	}

	renderParameterInput(parameter, index){
		const {theme} = this.props.screenProps;
		return (
			<View
				key={'parameter_' + index}
				style={{
					marginVertical: '3%',
					borderBottomWidth: 1,
					borderBottomColor: theme.secondaryColor
				}}
			>
				{
					parameter['options'].length === 0 ?
						this.renderSliderInput(parameter, index)
						:
						this.renderPickerInput(parameter, index)
				}
			</View>
		)
	}

	renderParameters() {
		return (
			<View
				style={{
					//borderWidth: 1,
					marginVertical: '3%'
				}}
			>
				{
					this.state.parameters.map( this.renderParameterInput.bind(this) )
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
				contentContainerStyle={[styles.container]}
			>
				{
					this.renderTopSection()
				}
				{
					this.renderTimeInput()
				}
				{
					this.renderTimePicker()
				}
				{
					this.renderRepeatDays()
				}
				{
					this.renderParameters()
				}
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		padding: '3%'
	},
	time_input_section: {
		borderBottomWidth: 2,
	},
	time_input_text: {
		fontSize: 72,
		alignSelf: 'center'
	}
});
