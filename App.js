import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import DashboardScreen from "./app/screens/DashboardScreen";
import ControlDeviceScreen from "./app/screens/ControlDeviceScreen";
import DeviceSettingsScreen from "./app/screens/EditDeviceScreen/EditDeviceScreen";
import AccountSettings from "./app/screens/AccountManagement/AccountSettingsScreen";
import AddDeviceScreen from "./app/screens/AddDeviceScreen";
import AlarmsScreen from "./app/screens/AlarmsScreen";
import EditAlarmScreen from "./app/screens/AlarmsScreen/EditAlarmScreen";
import LoginScreen from "./app/screens/LoginScreen";
import AccountOptionsScreen from "./app/screens/AccountManagement/AccountOptionsScreen";
import UserActivityScreen from "./app/screens/AccountManagement/UserActivityScreen";
import CreateAccount from "./app/screens/CreateAccountScreen";
import {BOOTSTRAP_COLOR_LIGHT, XEO_BLUE} from "./app/constants";


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
	},
	account_options:{
		screen: AccountOptionsScreen,
		navigationOptions:{
			title: '',
			headerStyle: {backgroundColor: '#4267b2'},
			headerTintColor: 'white'
		}
	}
	,
	account_settings: {
		screen: AccountSettings,
		navigationOptions:{
			title: "Account settings",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	user_activity:{
		screen: UserActivityScreen,
		navigationOptions:{
			title: 'Activity',
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		}
	},
	create_account:{
		screen: CreateAccount,
		navigationOptions: {
			title: "Create account",
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		}
	}

}
);

const Container = createAppContainer(NavigationStack);

export default Container;
