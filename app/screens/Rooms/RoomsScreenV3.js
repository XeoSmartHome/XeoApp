import React from "react";
import {ScrollView, Text} from "react-native";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import ThemeProvider, {ThemeContext} from "../../themes/ThemeProvider";
import DashboardScreen from "../DashboardScreen/DashboardScreen";
import {API_URL} from "../../api/api_routes_v_1.0.0.0";
import {t} from "i18n-js";
import {Icon} from "react-native-elements";


class Asd extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView style={{backgroundColor: theme.screenBackgroundColor}}>
				<Text
					style={{color: theme.textColor}}
				>
					ok
				</Text>
			</ScrollView>
		)
	}
}

export default class DynamicTabComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigator: createMaterialTopTabNavigator({
				mommm: {
					screen: Asd
				}
			}, {
				navigationOptions: {},
				swipeEnabled: true,
				tabBarOptions:{
					scrollEnabled: true,
					tabStyle:{
						backgroundColor: 'black',
						width: 100
					}
				}
			})
		}
	}

	componentDidMount() {
		this.loadRooms();
	}

	loadRooms(){
		fetch(API_URL + 'house/' + 1 + '/rooms', {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			console.warn('api');
			const tabs = {};

			response['rooms'].forEach( (room, index) => {
				tabs[`room_${index}`] = {
					screen: Asd,
					navigationOptions: ({screenProps}) => ({
						tabBarLabel: room['name'],
					}),
				}
			});

			const navigator = createMaterialTopTabNavigator(tabs, {
				navigationOptions: {},
				swipeEnabled: true,
				tabBarOptions:{
					scrollEnabled: true,
					tabStyle:{
						backgroundColor: 'black',
						width: 100
					}
				}
			});

			this.setState({
				navigator: navigator
			})

		}).catch((error) => {
			alert(error);
		});
	}


	render() {
		//console.warn('render rooms');
		const Tabs = createAppContainer(this.state.navigator);
		return (
			<ThemeProvider>
				<ThemeContext.Consumer>
					{
						(props) => (
							<Tabs screenProps={props}/>
						)
					}
				</ThemeContext.Consumer>
			</ThemeProvider>

		);
	}
}
