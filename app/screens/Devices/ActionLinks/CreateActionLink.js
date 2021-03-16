import React from "react";
import I18n from 'i18n-js';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {API_GENERATE_ACTION_LINK} from "../../../api/api_routes_v_1.0.0.0";

const t = (key) => I18n.t('action_links_list.' + key);


export default class CreateActionLink extends React.Component {
	constructor() {
		super();
		this.state = {
			device_name: '',
			device_actions_types: [],
			selected_action_type: null,
			parameters: [],
		};
	}

	loadDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/device/' + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({
				device_name: response['name'],
				device_actions_types: response['actions_types'],
			})
		}).catch((error) => {
			alert(error);
		});
	}

	componentDidMount() {
		this.loadDevice();
	}

	renderActionTypePicker(){
		const {theme} = this.props.screenProps;
		return (
			<View
				style={{
					borderWidth: 2,
					borderColor: theme.textColor,
					width: '75%',
					alignSelf: "center",
					borderRadius: 8,
					marginTop: 20
				}}
			>
				<Picker
					selectedValue={this.state.selected_action_type}
					onValueChange={ (value) => {
						this.setState({
							selected_action_type: value
						})
					}}
					style={{
						color: theme.textColor,
					}}
					dropdownIconColor={theme.textColor}
				>
					{
						this.state.device_actions_types.map( (action_type) => (
							<Picker.Item
								label={action_type['name']}
								value={action_type['id']}
							/>
						))
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
					alignSelf: "center",
					width: '80%',
					marginTop: 20
				}}
			>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 18
					}}
				>
					{parameter['name']}
				</Text>
			</View>
		)
	}

	renderParametersInput(){
		const {theme} = this.props.screenProps;

		const action_type = this.state.device_actions_types.find((x) => x['id'] === this.state.selected_action_type);
		if(action_type === undefined)
			return null;

		return (
			<View>
				{
					action_type['parameters_types'].map(this.renderParameterInput.bind(this))
				}
			</View>
		)
	}

	onGenerateLinkButtonPress(){
		fetch(API_GENERATE_ACTION_LINK, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.props.navigation.state.params.device_id,
				action_type_id: this.state.device_actions_types.find((x) => x['id'] === this.state.selected_action_type)['id'],
				parameters: this.state.parameters
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				if(response.status === 200)
					this.props.navigation.goBack();
			}
		).catch(
			(error) => {
				alert(error);
			}
		);
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor,
				}}
			>
				{
					this.renderActionTypePicker()
				}
				{
					this.renderParametersInput()
				}
				<TouchableOpacity
					onPress={this.onGenerateLinkButtonPress.bind(this)}
					style={{
						alignSelf: "center",
						width: '50%',
						backgroundColor: theme.primaryColor,
						padding:6,
						borderRadius: 8,
						marginTop: 25
					}}
				>
					<Text
						style={{
							color: theme.textColor,
							fontSize: 20,
							alignSelf: "center"
						}}
					>
						Generate
					</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}
