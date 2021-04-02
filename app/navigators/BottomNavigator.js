import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import SensorsDashboardScreenV2 from "../screens/Sensors/SensorsDashboardScreenV2";
import HomeScreen from "../screens/Home/HomeScreen";
import {Icon} from "react-native-elements";
import {Octicons} from "@expo/vector-icons";
import I18n from 'i18n-js';


const t = (key) => I18n.t(key);


export const BottomNavigator = createBottomTabNavigator(
	{
		home: {
			screen: HomeScreen,
			navigationOptions: ({screenProps}) => ({
				tabBarLabel: 'HOME',
				tabBarIcon: ({tintColor}) => (
					<Icon name="home" color={tintColor} size={24}/>
				)
			})
		},
		sensors: {
			screen: SensorsDashboardScreenV2,
			navigationOptions: ({screenProps}) => ({
				tabBarLabel: t('dashboard.navigation.sensors'),
				tabBarIcon: ({tintColor}) => (
					<Octicons
						name="graph"
						size={24}
						color={tintColor}
					/>
				)
			})
		},
		/*dashboard: {
			screen: DashboardScreen,
			navigationOptions: ({screenProps}) => ({
				tabBarLabel: 'DASHBOARD', //t('dashboard.navigation.devices'),
				tabBarIcon: ({tintColor}) => (
					<MaterialCommunityIcons
						name="view-dashboard"
						size={24}
						color={tintColor}
					/>
				),
			})
		},*/
	},
	{
		defaultNavigationOptions: ({screenProps}) => ({
			tabBarOptions: {
				keyboardHidesTabBar: true,
				activeTintColor: screenProps.theme.headerTextColor,
				inactiveTintColor: '#b3b5b8',
				style: {
					borderWidth: 0,
					backgroundColor: screenProps.theme.headerBackgroundColor,
					paddingBottom: 10,
					height: 60,
				},
			},
		}),
		resetOnBlur: true,
		initialRouteName: 'home',
		order: ['home', /*'dashboard',*/ 'sensors'],
	}
);
