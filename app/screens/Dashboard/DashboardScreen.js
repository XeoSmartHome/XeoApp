import React from "react";
import I18n from 'i18n-js';
import {
	View,
	StyleSheet,
	Text,
	FlatList
} from "react-native";
import Swiper from "react-native-swiper";
import DraggableFlatList from "react-native-draggable-flatlist";
import TabNavigationView from "react-navigation-tabs/src/navigators/createBottomTabNavigator";


const t = (key) => I18n.t(`dashboard.${key}`);


export default class DashboardScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			view_mode: 'list',
			screens: [
				{
					id: 1,
					name: "Claudiu's screen",
					shortcuts: [
						{
							id: 3,
							type: 'sensor',
							device_id: 5,
							sensor: {
								value: 20,
								unit: '`C',
								max_value: 80,
								min_value: -50
							}
						},
						{
							id: 33,
							type: 'action',
							device_id: 9
						},
						{
							id: 333,
							type: 'status',
							device_id: 34
						},
					]
				},
				{
					id: 2,
					name: "Claudiu's screen 2",
					shortcuts: [
						{
							id: 4,
						},
					]
				}
			]
		}
	}

	componentDidMount() {

	}

	renderSensorShortcut(sensor) {
		return (
			<Text>
				{sensor['value']}/{sensor['max_value']}
			</Text>
		);
	}

	renderActionShortcut() {

	}

	renderStatusShortcut(status) {

	}

	renderShortcut({item, index}) {
		const {theme} = this.props.screenProps;
		return (
			<View
				style={[styles.shortcut_container, {
					borderColor: theme.secondaryColor
				}]}
			>
				<Text
					style={[styles.shortcut_text, {
						color: theme.textColor
					}]}
				>
					{
						item['type'] === 'sensor' ? this.renderSensorShortcut(item['sensor']) : null
					}
				</Text>
			</View>
		)
	}

	renderScreen(screen, screen_index) {
		const {theme} = this.props.screenProps;

		let columns_number = null;

		switch (this.state.view_mode) {
			case "list":
				columns_number = 1;
				break;
			case 'box':
				columns_number = 2;
				break;
			default:
				columns_number = 1;
				break;
		}

		return undefined;

		return (
			<View
				style={[styles.screen]}
			>
				<View
					style={[styles.screen_title, {
						borderColor: theme.textColor
					}]}
				>
					<Text
						style={[styles.screen_title_text, {
							color: theme.textColor
						}]}
					>
						{
							screen['name']
						}
					</Text>
				</View>
				<FlatList
					//contentContainerStyle={{padding: 10}}
					numColumns={columns_number}
					data={screen['shortcuts']}
					renderItem={this.renderShortcut.bind(this)}
					keyExtractor={(item, index) => `draggable-item-${item['id']}`}
				/>
			</View>
		)
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<Swiper
				showsPagination={true}
				showsButtons={false}
				loop={false}
				activeDotColor={theme.primaryColor}
				style={{
					backgroundColor: theme.screenBackgroundColor,
				}}
			>
				{
					this.state.screens.map(this.renderScreen.bind(this))
				}
			</Swiper>
		);
	}
}


const styles = StyleSheet.create({
	screen: {
		padding: '3%'
	},
	screen_title: {
		borderBottomWidth: 2,
		paddingBottom: 10
	},
	screen_title_text: {
		fontSize: 24,
		alignSelf: 'center',
	},
	shortcut_container: {
		margin: '2%',
		padding: 5,
		borderWidth: 2,
		marginTop: '5%',
		borderRadius: 8,
		flex: 1
	},
	shortcut_text: {
		fontSize: 18,
	}
});
