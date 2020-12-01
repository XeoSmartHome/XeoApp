import React from "react";
import {BackHandler, ScrollView, Switch, Text, TouchableOpacity, View} from "react-native";
import {API_LOAD_DEVICE} from "../../../constants";
import I18n from "i18n-js";
import CronParser from "../../utils/CronParser";
import {RadioButton} from "react-native-paper";


const t = (key) => I18n.t('device_settings.' + key);


export default class TimedActionsListScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		//title: "Programed actions",
		headerTitle: () => (
			navigation.state.params.multi_select_active &&
			<TouchableOpacity
				onPress={navigation.state.params.onSelectAllPress}
			>
				<Text
					style={{
						color: screenProps.theme.textColor,
						fontSize: 18
					}}
				>
					Select all
				</Text>
			</TouchableOpacity>
		),
		headerRight: () => (
			navigation.state.params.multi_select_active && (
				navigation.state.params.show_delete ?
					<TouchableOpacity
						style={{
							marginRight: 20,
						}}
						onPress={ () => {

						}}
					>
						<Text
							style={{
								color: screenProps.theme.textColor,
								fontSize: 18
							}}
						>
							Delete
						</Text>
					</TouchableOpacity>
					:
					<TouchableOpacity
						style={{
							marginRight: 20,
						}}
						onPress={ navigation.state.params.on_cancel_delete_press}
					>
						<Text
							style={{
								color: screenProps.theme.textColor,
								fontSize: 18
							}}
						>
							Cancel
						</Text>
					</TouchableOpacity>
			)
		)
	});

	constructor() {
		super();
		this.state = {
			timed_actions: [],
			selected_timed_actions: [],
			multi_select_active: false
		};
	}

	loadTimedActions() {
		fetch(API_LOAD_DEVICE + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({
				timed_actions: response['actions'],
				selected_timed_actions: response['actions'].map( () => false)
			})
		}).catch((error) => {
			alert(error)
		});
	}

	/*onHardwareBackPress() {
		console.warn('s');
		if (this.state?.multi_select_active === true) {
			this.setState({
				multi_select_active: false
			});
			return true;
		} else {
			return false;
		}
		//return true;
	}*/

	onCancelDeletePress() {
		this.props.navigation.setParams({
			multi_select_active: false
		});
		this.setState({
			multi_select_active: false
		});
	}

	componentDidMount() {
		this.loadTimedActions();
		this.props.navigation.setParams({
			on_cancel_delete_press: this.onCancelDeletePress.bind(this)
		});
		//BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress.bind(this));
	}

	componentWillUnmount() {
		//BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress.bind(this));
		//console.warn('unmounted')
	}

	onSelectAllPress() {
		let all_selected = true;
		this.state.selected_timed_actions.forEach( (action_selected) => {
			if(action_selected === false)
				all_selected = false;
		});

		this.setState({
			selected_timed_actions: this.state.selected_timed_actions.map( (action_selected) => !all_selected)
		});

		this.props.navigation.setParams({
			show_delete: !all_selected
		})
	}

	onTimedActionPress(action, index) {
		if(this.state.multi_select_active) {
			this.onTimedActionLongPress(action, index);
		}
	}

	onTimedActionLongPress(action, index) {
		let selected_timed_actions = this.state.selected_timed_actions;
		selected_timed_actions[index] = ! selected_timed_actions[index];

		let at_least_one_selected = false;
		selected_timed_actions.forEach((element) => {
			if (element === true)
				at_least_one_selected = true;
		})

		this.setState({
			selected_timed_action: selected_timed_actions,
			multi_select_active: true
		});

		this.props.navigation.setParams({
			multi_select_active: true,
			onSelectAllPress: this.onSelectAllPress.bind(this),
			show_delete: at_least_one_selected
		});
	}

	renderTimedAction(action, index) {
		const {theme} = this.props.screenProps;
		const is_selected = this.state.selected_timed_actions[index];

		const cronParser = new CronParser();
		cronParser.deserializeCron(action.cron);
		const minute = cronParser.minutes[0];
		const hour = cronParser.hours[0];
		const days = cronParser.days_of_week;

		const alarmDaysTextOn = {
			color: theme.textColor,
		};

		const alarmDaysTextOff = {
			color: theme.secondaryColor
		};

		return (
			<View
				key={'timed_action_' + index}
				style={{
					borderBottomWidth: 2,
					borderBottomColor: theme.textColor,
					paddingVertical: 8,
					paddingHorizontal: '3%'
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: "row"
					}}
					onPress={ () => {
						this.onTimedActionPress(action, index)
					}}
					onLongPress={ () => {
						this.onTimedActionLongPress(action, index)
					}}
				>
					{
						this.state.multi_select_active &&
						<View
							style={{
								//flex: 1,
								justifyContent: "center"
							}}
						>
							<RadioButton
								status={ is_selected ? 'checked' : 'unchecked' }
								color={theme.primaryColor}
								uncheckedColor={theme.secondaryColor}
							/>
						</View>
					}
					<View
						style={{
							flex: 3
						}}
					>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 24
							}}
						>
							{hour > 9 ? String(hour) : '0' + String(hour)}
							:
							{minute > 9 ? String(minute) : '0' + String(minute)}
						</Text>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 16
							}}
						>
							{ action['name'] }
						</Text>
					</View>
					<View
						style={{
							flex: 3,
							justifyContent: "center"
						}}
					>
						<Text
							style={{
								fontSize: 16,
								alignSelf: "flex-end"
							}}
						>
							<Text style={days[0] ? alarmDaysTextOn : alarmDaysTextOff}>M </Text>
							<Text style={days[1] ? alarmDaysTextOn : alarmDaysTextOff}>T </Text>
							<Text style={days[2] ? alarmDaysTextOn : alarmDaysTextOff}>W </Text>
							<Text style={days[3] ? alarmDaysTextOn : alarmDaysTextOff}>T </Text>
							<Text style={days[4] ? alarmDaysTextOn : alarmDaysTextOff}>F </Text>
							<Text style={days[5] ? alarmDaysTextOn : alarmDaysTextOff}>S </Text>
							<Text style={days[6] ? alarmDaysTextOn : alarmDaysTextOff}>S</Text>
						</Text>
					</View>
					{
						!this.state.multi_select_active &&
						<View
							style={{
								flex: 1,
								justifyContent: "center"
							}}
						>
							<Switch
								value={ action['active'] }
								onValueChange={ (value) => {
									let actions = this.state.timed_actions;
									actions[index].active = value;
									this.setState({timed_actions: actions});
								} }
								thumbColor="#4267b2"
								trackColor={{false: '#acacac', true: '#abcaff' }}
							/>
						</View>
					}
				</TouchableOpacity>
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
					this.state.timed_actions.map(this.renderTimedAction.bind(this))
				}
			</ScrollView>
		)
	}
}
