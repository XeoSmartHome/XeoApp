import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import DashboardScreen from "./app/screens/DashboardScreen/DashboardScreen";
import ControlDeviceScreen from "./app/screens/Device/ControlDeviceScreen";
import AddDeviceScreen from "./app/screens/Device/AddDeviceScreen";
import AlarmsScreen from "./app/screens/Device/AlarmsScreen";
import EditAlarmScreen from "./app/screens/Device/AlarmsScreen/EditAlarmScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SettingsScreen from "./app/screens/Settings/SettingsScreen";
import UserActivityScreen from "./app/screens/AccountManagement/UserActivityScreen";
import CreateAccount from "./app/screens/CreateAccountScreen";
import {BOOTSTRAP_COLOR_LIGHT, XEO_BLUE} from "./app/constants";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs"
import {Icon} from "react-native-elements";
import RoomSharingMainScreen from "./app/screens/RoomSharing/RoomSharingMainScreen";
import AccountScreen from "./app/screens/Settings/Account/AccountScreen";
import DeviceSettingsScreen2 from "./app/screens/Device/EditDeviceScreen2";
import {AsyncStorage, Button, Text, TouchableOpacity} from "react-native";
import CreateNewRoom from "./app/screens/Rooms/CreateNewRoom";
import AddDeviceInRoom from "./app/screens/Rooms/AddDeviceInRoom";
import RenameRoomScreen from "./app/screens/Rooms/RenameRoom";
import RoomOptionsScreen from "./app/screens/Rooms/RoomOptionsScreen";
import RoomDeviceOptionsScreen from "./app/screens/Rooms/RoomDeviceOptionsScreen";
import RoomScreen from "./app/screens/Rooms/RoomScreen";
import RoomsScreen from "./app/screens/Rooms/RoomsScreen";
import HelpScreen from "./app/screens/Settings/Help/HelpScreen";
import SecurityScreen from "./app/screens/Settings/Security/SecurityScreen";
import ChangePasswordScreen from "./app/screens/Settings/Security/ChangePasswordScreen";
import SensorsDashboardScreen from "./app/screens/Sensors/SensorsDashboardScreeen";
import PinSettingsScreen from "./app/screens/Settings/Security/PinSettingsScreen";
import PinScreen from "./app/screens/Settings/Security/PinScreen";
import SensorScreen from "./app/screens/Sensors/SensorScreen";
import NotificationsSettingsScreen from "./app/screens/Settings/Notifications/NotificationsSettingsScreen";
import DeviceSettingsScreen from "./app/screens/Device/EditDeviceScreen";
import I18n, {t} from 'i18n-js';
import LanguageSettingsScreen from "./app/screens/Settings/Language/LanguageSettingsScreen";
import * as Localization from "expo-localization";


I18n.fallbacks = true;
I18n.translations = {
	'en': require('./app/lang/en.json'),
	'ro': require('./app/lang/ro.json')
};


AsyncStorage.getItem('locale').then( (item) => {
	if(item !== null)
		I18n.locale = item;
	else
		I18n.locale = Localization.locale;
});


const BottomNavigator = createMaterialBottomTabNavigator(
	{
		sensors:{
			screen: SensorsDashboardScreen,
			navigationOptions:{
				tabBarLabel: t('navigation.sensors'),
				tabBarIcon: ({tintColor}) => (
					<Icon name="show-chart" color={tintColor} size={24} />
				)
			}
		},
		dashboard:{
			screen: DashboardScreen,
			navigationOptions:{
				tabBarLabel: t('navigation.devices'),
				tabBarIcon: ({tintColor}) => (
					<Icon name="device-hub" color={tintColor} size={24} />
					// <Icon name="dashboard" color={tintColor} size={24} />
				)
			}
		},
		rooms:{
			screen: RoomsScreen,
			navigationOptions:{
				tabBarLabel: t('navigation.rooms'),
				tabBarIcon: ({tintColor}) => (
					<Icon name="home" color={tintColor} size={24} />
				)
			}
		},
	}, {
		shifting: false,
		initialRouteName: 'rooms',
		order: ['dashboard', 'rooms', 'sensors'],
		barStyleLight:{
			backgroundColor: XEO_BLUE,
			borderTopWidth: 2,
			borderStyle: 'solid',
			borderColor: '#d0cfd0',
			paddingBottom: 5,

		}
	}
);


const NavigationStack = createStackNavigator({
	login: {
		screen: LoginScreen,
		navigationOptions: () => ({
			title: t('navigation.login'),
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	main: {
		screen: BottomNavigator,
		navigationOptions: ({navigation}) => ({
			title: 'XeoApp',
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
			headerRight: <TouchableOpacity
				style={{marginRight: 15}}
				onPress={ () => navigation.navigate('settings_screen')}
			>
				<Icon name="more-horiz" color={BOOTSTRAP_COLOR_LIGHT} size={40} />
			</TouchableOpacity>,
		})
	},
	add_device:{
		screen: AddDeviceScreen,
		navigationOptions: () => ({
			title: "Add new device",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	control_device: {
		screen: ControlDeviceScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	device_settings: {
		screen: DeviceSettingsScreen,
		navigationOptions: () => ({
			title: "Device settings",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	device_alarms: {
		screen: AlarmsScreen,
		navigationOptions: () => ({
			title: "Programmed actions",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	device_edit_alarm:{
		screen: EditAlarmScreen,
		navigationOptions: () => ({
			title: "",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	settings_screen:{
		screen: SettingsScreen,
		navigationOptions: () => ({
			title: 'Settings',
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	}
	,
	account_settings: {
		screen: AccountScreen,
		navigationOptions: () => ({
			title: "Account",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	security: {
		screen: SecurityScreen,
		navigationOptions: () => ({
			title: "Security",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	change_password: {
		screen: ChangePasswordScreen,
		navigationOptions:() => ({
			title: "Change password",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	help: {
		screen: HelpScreen,
		navigationOptions: () => ({
			title: "Help",
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	user_activity:{
		screen: UserActivityScreen,
		navigationOptions: () => ({
			title: 'Activity',
			headerStyle:{backgroundColor: '#4267b2'},
			headerTintColor: 'white',
		})
	},
	create_account:{
		screen: CreateAccount,
		navigationOptions: () => ({
			title: "Create account",
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room: {
		screen: RoomScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	create_new_room: {
		screen: CreateNewRoom,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	add_device_in_room: {
		screen: AddDeviceInRoom,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	rename_room:{
		screen: RenameRoomScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room_options: {
		screen: RoomOptionsScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room_device_options: {
		screen: RoomDeviceOptionsScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room_sharing:{
		screen: RoomSharingMainScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	pin_settings: {
		screen: PinSettingsScreen,
		navigationOptions: () => ({
			title: 'App PIN',
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	pin: {
		screen: PinScreen,
		navigationOptions:{
			header: null
		}
	},
	sensor: {
		screen: SensorScreen,
		navigationOptions:{
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		}
	},
	notifications_settings:{
		screen: NotificationsSettingsScreen,
		navigationOptions: () => ({
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	language_settings:{
		screen: LanguageSettingsScreen,
		navigationOptions: () => ({
			title: 'Language',
			headerStyle:{backgroundColor: XEO_BLUE},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT
		})
	}
});

const Container = createAppContainer(NavigationStack);

export default Container;


