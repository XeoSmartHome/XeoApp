import React from "react";
import I18n from 'i18n-js';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {API_LOAD_DEVICES} from "../../constants";


const t = (key) => I18n.t('customizable_dashboard.' + key);


export default class CustomizableDashboardScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			sections: [
				{
					device_id: 3,
					device_name: 'Irrigation controller',
					actions_types: [
						{
							id: 5,
							name: 'Irrigate',
							parameters: [
								{
									name: 'valve'
								}
							]
						}
					]
				},
				{
					device_id: 5,
				},
				{
					device_id: 9,
				}
			]
		}
	}

	componentDidMount() {
		//this.loadDevices();
	}

	loadDevices(){
		fetch('https://dashboard.xeosmarthome.com/api/get_action_type?device_id=2&action_type_id=4', {
			method: 'GET',
			qs: {
				device_id: 3,
				action_type_id: 4
			}
		}).then(
			(response) => alert(response)
		).catch(
			(error) => alert(error)
		)
		/*fetch(API_LOAD_DEVICES, {
				method: 'GET'
		}).then(
			(response) => response.json()
		).then((response) => {
			//console.warn(response);
			//this.setState({ devices: response})
		}).catch((error) => {
			alert(error)
		})*/
	}

	renderSection(section, index){
		const {theme} = this.props.screenProps;
		return (
			<View
				key={'section_' + index}
				style={{
					borderBottomColor: theme.textColor,
					borderBottomWidth: 2,
					marginVertical: 12,
				}}
			>
			</View>
		)
	}

	onCustomizeButtonPress(){
		alert('ok');
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor,
					padding: '3%'
				}}
			>
				{
					this.state.sections.map(this.renderSection.bind(this))
				}
				<TouchableOpacity
					style={{
						width: '50%',
						alignSelf: "center"
					}}
					onPress={this.onCustomizeButtonPress.bind(this)}
				>
					<Text
						style={{
							color: theme.primaryColor,
							alignSelf: "center",
							fontSize: 20,
							fontWeight: "bold"
						}}
					>
						Customize
					</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}
