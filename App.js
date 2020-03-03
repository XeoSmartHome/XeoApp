import React, { Component } from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import {Button, Text} from "react-native";
import ControlDeviceScreen from "./app/screens/ControlDeviceScreen";
import DeviceSettingsScreen from "./app/screens/EditDeviceScreen";
import AccountSettings from "./app/screens/AccountSettings";
import AddDeviceScreen from "./app/screens/AddDeviceScreen";
import AlarmsScreen from "./app/screens/AlarmsScreen";
import EditAlarmScreen from "./app/screens/AlarmsScreen/EditAlarmScreen";


const NavigationStack = createStackNavigator({
	login: {
		screen: LoginScreen,
		navigationOptions: {
			title: "Login",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	dashboard: {
		screen: DashboardScreen,
		navigationOptions: {
			title: "Dashboard",
			headerLeft: null,
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	add_device:{
		screen: AddDeviceScreen,
		navigationOptions:{
			title: "Add new device",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	control_device: {
		screen: ControlDeviceScreen,
		navigationOptions:{
			title: "Device",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	device_settings:{
		screen: DeviceSettingsScreen,
		navigationOptions:{
			title: "Device settings",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	account_settings:{
		screen: AccountSettings,
		navigationOptions:{
			title: "Account settings",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	device_alarms:{
		screen: AlarmsScreen,
		navigationOptions:{
			title: "Programmed actions",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	device_edit_alarm:{
		screen: EditAlarmScreen,
		navigationOptions:{
			title: "",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	}

}
);

const Container = createAppContainer(NavigationStack);

export default Container;
