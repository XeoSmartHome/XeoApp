import createStackNavigator from "react-navigation-stack/src/navigators/createStackNavigator";
import LoginScreen from "../screens/LoginScreen";
import {t} from "i18n-js";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import AddDeviceScreen from "../screens/Devices/AddDeviceScreen";
import DeviceRemoteControlScreen from "../screens/Devices/DeviceRemoteControlScreen";
import DeviceSettingsScreen2 from "../screens/Devices/Settings/DeviceSettings";
import TimedActionsListScreen from "../screens/Devices/TimedActions/TimedActionsListScreen";
import EditTimedActionScreen from "../screens/Devices/TimedActions/EditTimedActionScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import AccountSettingsScreen from "../screens/Settings/Account/AccountSettingsScreen";
import SecurityScreen from "../screens/Settings/Security/SecurityScreen";
import ChangePasswordScreen from "../screens/Settings/Security/ChangePasswordScreen";
import HelpScreen from "../screens/Settings/Help/HelpScreen";
import CreateAccountScreen_v2 from "../screens/AccountManagement/CreateAccountScreen_v2";
import TermsAndConditionsScreen from "../screens/AccountManagement/TermsAndConditionsScreen";
import RoomScreen from "../screens/Rooms/RoomScreen";
import CreateNewRoom from "../screens/Rooms/CreateNewRoom";
import AddDeviceInRoom from "../screens/Rooms/AddDeviceInRoom";
import RenameRoomScreen from "../screens/Rooms/RenameRoom";
import RoomOptionsScreen from "../screens/Rooms/RoomOptionsScreen";
import RoomDeviceOptionsScreen from "../screens/Rooms/RoomDeviceOptionsScreen";
import RoomSharingMainScreen from "../screens/RoomSharing/RoomSharingMainScreen";
import PinSettingsScreen from "../screens/Settings/Security/PinSettingsScreen";
import PinScreen from "../screens/Settings/Security/PinScreen";
import SensorScreen from "../screens/Sensors/SensorScreen";
import NotificationsSettingsScreen from "../screens/Settings/Notifications/NotificationsSettingsScreen";
import LanguageSettingsScreen from "../screens/Settings/Language/LanguageSettingsScreen";
import ThemeSettingsScreen from "../screens/Settings/Theme/ThemeSettingsScreen";
import HelpCenterScreen from "../screens/Settings/Help/HelpCenterScreen";
import ReportABug from "../screens/Settings/Help/ReportABug";
import ActionLinksListScreen from "../screens/Devices/ActionLinks/ActionLinksListScreen";
import CreateActionLink from "../screens/Devices/ActionLinks/CreateActionLink";
import React from "react";
import {BottomNavigator} from "./BottomNavigator";
import RoomsOrderScreen from "../screens/Settings/RoomsOrder/RoomsOrderScreen";


export const StackNavigator = createStackNavigator({
	login: {
		screen: LoginScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('login.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	main: {
		screen: BottomNavigator,
		navigationOptions: ({navigation, screenProps}) => ({
			title: 'XeoApp',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
			headerRight: () => (<TouchableOpacity
				style={{marginRight: 15}}
				onPress={() => navigation.navigate('settings_screen')}
			>
				<Icon name="more-horiz" color={screenProps.theme.headerTextColor} size={40}/>
			</TouchableOpacity>)
		})
	},
	add_device: {
		screen: AddDeviceScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('add_device.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	control_device: {
		//screen: ControlDeviceScreen,
		screen: DeviceRemoteControlScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	device_settings: {
		screen: DeviceSettingsScreen2,
		navigationOptions: ({screenProps}) => ({
			title: t('device_settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	device_alarms: {
		//screen: AlarmsScreen,
		screen: TimedActionsListScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Programmed actions",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	edit_timed_action: {
		screen: EditTimedActionScreen,
		navigationOptions: ({screenProps}) => ({
			//title: t('settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	/*device_edit_alarm:{
		screen: EditAlarmScreen,
		navigationOptions: ({screenProps}) => ({
			title: "",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: 'white',
		})
	},*/
	settings_screen: {
		screen: SettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	}
	,
	account_settings: {
		screen: AccountSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('account_settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	security: {
		screen: SecurityScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('security.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	change_password: {
		screen: ChangePasswordScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('change_password.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	help: {
		screen: HelpScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('help.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	create_account: {
		screen: CreateAccountScreen_v2,
		navigationOptions: ({screenProps}) => ({
			title: t('create_account.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	terms_and_conditions: {
		screen: TermsAndConditionsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('terms_and_conditions.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	room: {
		screen: RoomScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	create_new_room: {
		screen: CreateNewRoom,
		navigationOptions: ({screenProps}) => ({
			title: t('create_new_room.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	add_device_in_room: {
		screen: AddDeviceInRoom,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	rename_room: {
		screen: RenameRoomScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('rename_room.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	room_options: {
		screen: RoomOptionsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('room_options.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	room_device_options: {
		screen: RoomDeviceOptionsScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	room_sharing: {
		screen: RoomSharingMainScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	pin_settings: {
		screen: PinSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('pin_settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	pin: {
		screen: PinScreen,
		navigationOptions: {
			header: () => null
		}
	},
	sensor: {
		screen: SensorScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	notifications_settings: {
		screen: NotificationsSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	language_settings: {
		screen: LanguageSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('language_settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	theme_settings: {
		screen: ThemeSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('theme_settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	help_center: {
		screen: HelpCenterScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('help_center.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	report_a_bug: {
		screen: ReportABug,
		navigationOptions: ({screenProps}) => ({
			title: t('report_a_bug.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	action_links: {
		screen: ActionLinksListScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('action_links_list.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	create_action_link: {
		screen: CreateActionLink,
		navigationOptions: ({screenProps}) => ({
			title: 'Generate action links',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	rooms_order: {
		screen: RoomsOrderScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Rooms order',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	}
}, {initialRouteName: 'login'});
