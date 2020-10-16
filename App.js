import React from 'react';
import {createAppContainer } from 'react-navigation';
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
import AccountSettingsScreen from "./app/screens/Settings/Account/AccountSettingsScreen";
import {TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
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
import LanguageSettingsScreen from "./app/screens/Settings/Language/LanguageSettingsScreen";
import * as Localization from "expo-localization";
import createStackNavigator from "react-navigation-stack/src/navigators/createStackNavigator";
import ThemeProvider, {ThemeContext} from "./app/themes/ThemeProvider";
import ThemeSettingsScreen from "./app/screens/Settings/Theme/ThemeSettingsScreen";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DeviceSettingsScreen2 from "./app/screens/Device/Settings/DeviceSettings";
import HelpCenterScreen from "./app/screens/Settings/Help/HelpCenterScreen";
import ReportABug from "./app/screens/Settings/Help/ReportABug";
// noinspection ES6CheckImport
import I18n, {t} from 'i18n-js';


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


const BottomNavigator = createBottomTabNavigator(
	{
		sensors:{
			screen: SensorsDashboardScreen,
			navigationOptions: ({screenProps}) => ({
				tabBarLabel: t('dashboard.navigation.sensors'),
				tabBarIcon: ({tintColor}) => (
					<Icon name="show-chart" color={tintColor} size={24} />
				)
			})
		},
		dashboard:{
			screen: DashboardScreen,
			navigationOptions: ({screenProps}) => ({
				tabBarLabel: t('dashboard.navigation.devices'),
				tabBarIcon: ({tintColor}) => (
					<Icon name="device-hub" color={tintColor} size={24} />
				)
			})
		},
		rooms:{
			screen: RoomsScreen,
			navigationOptions: ({screenProps}) => ({
				tabBarLabel: t('dashboard.navigation.rooms'),
				tabBarIcon: ({tintColor}) => (
					<Icon name="home" color={tintColor} size={24} />
				)
			})
		},
	}, /*{
		shifting: false,
		initialRouteName: 'rooms',
		order: ['dashboard', 'rooms', 'sensors'],
		barStyleLight: {
			backgroundColor: XEO_BLUE,
			borderTopWidth: 2,
			borderStyle: 'solid',
			borderColor: '#d0cfd0',
			paddingBottom: 5,
		},
	}*/
	{
		defaultNavigationOptions: ({ navigation, screenProps }) => ({
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
		initialRouteName: 'rooms',
		order: ['dashboard', 'rooms', 'sensors'],
	}
);


const NavigationStack = createStackNavigator({
	login: {
		screen: LoginScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('login.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	main: {
		screen: BottomNavigator,
		navigationOptions: ({navigation, screenProps}) => ({
			title: 'XeoApp',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
			headerRight: () => (<TouchableOpacity
				style={{marginRight: 15}}
				onPress={ () => navigation.navigate('settings_screen')}
			>
				<Icon name="more-horiz" color={BOOTSTRAP_COLOR_LIGHT} size={40} />
			</TouchableOpacity>)
		})
	},
	add_device:{
		screen: AddDeviceScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Add new device",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	control_device: {
		screen: ControlDeviceScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	device_settings: {
		screen: DeviceSettingsScreen2,
		navigationOptions: ({screenProps}) => ({
			title: "Device settings",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	device_alarms: {
		screen: AlarmsScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Programmed actions",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	device_edit_alarm:{
		screen: EditAlarmScreen,
		navigationOptions: ({screenProps}) => ({
			title: "",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	settings_screen:{
		screen: SettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	}
	,
	account_settings: {
		screen: AccountSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Account",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	security: {
		screen: SecurityScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Security",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	change_password: {
		screen: ChangePasswordScreen,
		navigationOptions:({screenProps}) => ({
			title: t('change_password.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	help: {
		screen: HelpScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Help",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	user_activity:{
		screen: UserActivityScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Activity',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},
	create_account:{
		screen: CreateAccount,
		navigationOptions: ({screenProps}) => ({
			title: "Create account",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room: {
		screen: RoomScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	create_new_room: {
		screen: CreateNewRoom,
		navigationOptions: ({screenProps}) => ({
			title: t('create_new_room.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	add_device_in_room: {
		screen: AddDeviceInRoom,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	rename_room:{
		screen: RenameRoomScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('rename_room.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room_options: {
		screen: RoomOptionsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('room_options.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room_device_options: {
		screen: RoomDeviceOptionsScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	room_sharing:{
		screen: RoomSharingMainScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	pin_settings: {
		screen: PinSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'App PIN',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	pin: {
		screen: PinScreen,
		navigationOptions:{
			header: () => null
		}
	},
	sensor: {
		screen: SensorScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	notifications_settings: {
		screen: NotificationsSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT,
		})
	},
	language_settings: {
		screen: LanguageSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Language',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: BOOTSTRAP_COLOR_LIGHT
		})
	},
	theme_settings: {
		screen: ThemeSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Theme',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	help_center: {
		screen: HelpCenterScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Help center',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	report_a_bug: {
		screen: ReportABug,
		navigationOptions: ({screenProps}) => ({
			title: 'Report a bug',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	}
}, {initialRouteName: 'login'});


const Container = createAppContainer(NavigationStack);


const App = () => (
	<ThemeProvider>
		<ThemeContext.Consumer>
			{
				(props) => (
					<Container screenProps={props} />
				)
			}
		</ThemeContext.Consumer>
	</ThemeProvider>
)


export default App;


