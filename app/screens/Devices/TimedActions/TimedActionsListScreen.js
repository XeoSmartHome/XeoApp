import React from "react";
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import I18n from "i18n-js";
import {RadioButton} from "react-native-paper";
import Cron from "../../utils/new_cron_class";
import {API} from "../../../api/api";
import {parseCronFromString} from "../../utils/Cron";


const t = (key) => I18n.t('device_settings.' + key);


export default class TimedActionsListScreen extends React.Component {

	static navigationOptions = ({navigation, screenProps}) => ({
		title: "Programed actions",
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
						onPress={navigation.state.params.on_delete_actions_press}
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
						onPress={navigation.state.params.on_cancel_delete_press}
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

	componentDidMount() {
		this.props.navigation.setParams({
			on_cancel_delete_press: this.onCancelDeletePress.bind(this),
			on_delete_actions_press: this.onDeleteActionsPress.bind(this),
		});
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadTimedActions();
			}
		);
		const c = parseCronFromString("0 30 12 * * *");
		console.log(c);
	}

	componentWillUnmount() {
	}

	getTimeFromCron(cron_string) {
		const cron = new Cron();
		cron.parseCronExpression(cron_string);
		return cron.getHours() * 60 + Number(cron.getMinutes());
	}

	sortActionsByTime(actions) {
		return actions.sort((action_a, action_b) => this.getTimeFromCron(action_a.cron) > this.getTimeFromCron(action_b.cron))
	}

	loadTimedActionsCallback(response){
		let timed_actions = response['timed_actions'];
		this.setState({
			timed_actions: this.sortActionsByTime(timed_actions),
			selected_timed_actions: timed_actions.map(() => false)
		});
	}

	loadTimedActions() {
		API.devices.timed_actions.getTimedActions({
			device_id: this.props.navigation.state.params.device_id
		}).then(
			this.loadTimedActionsCallback.bind(this)
		).catch(
			(error) => {
				console.warn(error);
			}
		);
	}

	onNewTimedActionButtonPress() {
		this.props.navigation.navigate('create_timed_action', {
			device_actions_types: this.props.navigation.state.params.device_actions_types,
			device_id: this.props.navigation.state.params.device_id
		});
	}

	deleteTimedActionsCallback(response) {
		switch (response.status) {
			case 200:
				this.loadTimedActions();
				this.setState({
					multi_select_active: false
				});
				this.props.navigation.setParams({
					multi_select_active: false
				});
				break;
			case 400:
				break;
		}
	}

	deleteTimedActions(actions_ids) {
		API.devices.timed_actions.deleteTimedActions({
			device_id: this.props.navigation.state.params.device_id,
			actions_ids: actions_ids
		}).then(
			this.deleteTimedActionsCallback.bind(this)
		).catch(
			(error) => {
				console.warn(error);
			}
		);
	}

	onDeleteActionsPress() {
		let actions_ids = [];
		this.state.selected_timed_actions.forEach(
			(value, index) => {
				if (value === true) {
					actions_ids.push(this.state.timed_actions[index]['id']);
				}
			});

		this.deleteTimedActions(actions_ids);
	}

	onCancelDeletePress() {
		this.props.navigation.setParams({
			multi_select_active: false
		});
		this.setState({
			multi_select_active: false
		});
	}

	onSelectAllPress() {
		let all_selected = true;
		this.state.selected_timed_actions.forEach((action_selected) => {
			if (action_selected === false)
				all_selected = false;
		});

		this.setState({
			selected_timed_actions: this.state.selected_timed_actions.map((action_selected) => !all_selected)
		});

		this.props.navigation.setParams({
			show_delete: !all_selected
		})
	}

	onTimedActionLongPress(action, index) {
		// Toggle a timed action's select property
		let selected_timed_actions = this.state.selected_timed_actions;
		selected_timed_actions[index] = !selected_timed_actions[index];

		this.setState({
			selected_timed_action: selected_timed_actions, // update state of the timed action
			multi_select_active: true // enable multi select
		});

		let at_least_one_selected = false;
		selected_timed_actions.forEach((element) => {
			if (element === true)
				at_least_one_selected = true;
		})

		this.props.navigation.setParams({
			multi_select_active: true,
			onSelectAllPress: this.onSelectAllPress.bind(this),
			show_delete: at_least_one_selected
		});
	}

	onTimedActionPress(action, index) {
		if (this.state.multi_select_active) {
			this.onTimedActionLongPress(action, index);
		} else {
			this.props.navigation.navigate('edit_timed_action', {
				device_id: this.props.navigation.state.params.device_id,
				action_id: action.id
			});
		}
	}

	renderTimedAction(action, index) {
		const {theme} = this.props.screenProps;
		const is_selected = this.state.selected_timed_actions[index];

		const cronParser = new Cron();

		try {
			cronParser.parseCronExpression(action.cron);
		} catch (e) {

		}

		const minute = cronParser.getMinutes();
		const hour = cronParser.getHours();
		const days = cronParser.getDaysOfWeek();
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
					paddingHorizontal: '3%'
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						paddingVertical: 8,
					}}
					onPress={() => {
						this.onTimedActionPress(action, index)
					}}
					onLongPress={() => {
						this.onTimedActionLongPress(action, index)
					}}
				>
					{
						this.state.multi_select_active &&
						<View
							style={{
								justifyContent: "center"
							}}
						>
							<RadioButton
								status={is_selected ? 'checked' : 'unchecked'}
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
								fontSize: 26
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
							{action['name']}
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
								value={action['active']}
								onValueChange={(value) => {
									let actions = this.state.timed_actions;
									actions[index].active = value;
									this.setState({timed_actions: actions});
								}}
								thumbColor="#4267b2"
								trackColor={{false: '#acacac', true: '#abcaff'}}
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
			<View
				style={{
					flex: 1,
				}}
			>
				<ScrollView
					style={{
						backgroundColor: theme.screenBackgroundColor,
					}}
					contentContainerStyle={{
						padding: '3%',
						paddingBottom: 100
					}}
				>
					{
						this.state.timed_actions.map(this.renderTimedAction.bind(this))
					}
				</ScrollView>
				<TouchableOpacity
					onPress={this.onNewTimedActionButtonPress.bind(this)}
					style={[styles.fab, {
						backgroundColor: theme.primaryColor
					}]}
				>
					<Text
						style={[styles.fabIcon, {
							color: theme.lightColor
						}]}
					>
						+
					</Text>
				</TouchableOpacity>
			</View>

		)
	}
}


const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		right: 20,
		bottom: 20,
		borderRadius: 30,
		elevation: 8
	},
	fabIcon: {
		top: -2,
		fontSize: 50,
	}
});
