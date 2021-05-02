import React from "react";
import createStackNavigator from "react-navigation-stack/src/navigators/createStackNavigator";
import LoginScreen from "../screens/Account/LoginScreen";
import {t} from "i18n-js";
import {AsyncStorage, TouchableOpacity} from "react-native";
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
import CreateAccountScreen from "../screens/Account/CreateAccountScreen";
import TermsAndConditionsScreen from "../screens/AccountManagement/TermsAndConditionsScreen";
import PinSettingsScreen from "../screens/Settings/Security/PinSettingsScreen";
import PinScreen from "../screens/Settings/Security/PinScreen";
import NotificationsSettingsScreen from "../screens/Settings/Notifications/NotificationsSettingsScreen";
import LanguageSettingsScreen from "../screens/Settings/Language/LanguageSettingsScreen";
import ThemeSettingsScreen from "../screens/Settings/Theme/ThemeSettingsScreen";
import HelpCenterScreen from "../screens/Settings/Help/HelpCenterScreen";
import ActionLinksListScreen from "../screens/Devices/ActionLinks/ActionLinksListScreen";
import CreateActionLink from "../screens/Devices/ActionLinks/CreateActionLink";
import RoomsOrderScreen from "../screens/Settings/Rooms/RoomsOrderScreen";
import RoomsSettingsScreen from "../screens/Settings/Rooms/RoomsSettingsScreen";
import DeleteRoomScreen from "../screens/Settings/Rooms/DeleteRoomScreen";
import CreateRoomScreen from "../screens/Settings/Rooms/CreateRoomScreen";
import AddDeviceInRoomScreen from "../screens/Rooms/AddDeviceInRoomScreen";
import RemoveDeviceFromRoomScreen from "../screens/Rooms/RemoveDeviceFromRoomScreen";
import OrderDevicesInRoom from "../screens/Rooms/OrderDevicesInRoom";
import {BottomNavigator} from "./BottomNavigator";
import AnimationsSettingsScreen from "../screens/Settings/Animations/AnimationsSettingsScreen";
import CreateTimedAction from "../screens/Devices/TimedActions/CreateTimedAction";


//const animations_enable = await AsyncStorage.getItem('animations_enable');


//export const StackNavigator = (animations_enable) => createStackNavigator({

export const StackNavigator = createStackNavigator({
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
	login: {
		screen: LoginScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('login.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	create_account: {
		screen: CreateAccountScreen,
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
	add_device: {
		screen: AddDeviceScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('add_device.navigation.title'),
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
	control_device: {
		screen: DeviceRemoteControlScreen,
		navigationOptions: ({screenProps}) => ({
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	device_alarms: {
		screen: TimedActionsListScreen,
		navigationOptions: ({screenProps}) => ({
			title: "Programmed actions",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	create_timed_action: {
		screen: CreateTimedAction,
		navigationOptions: ({screenProps}) => ({
			title: "Create timed action",
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	edit_device_timed_action: {
		screen: EditTimedActionScreen,
		navigationOptions: ({screenProps}) => ({
			//title: t('settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	settings_screen: {
		screen: SettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('settings.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
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
	notifications_settings: {
		screen: NotificationsSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('settings.notifications'),
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
	animations_settings: {
		screen: AnimationsSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Animations',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
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
	help_center: {
		screen: HelpCenterScreen,
		navigationOptions: ({screenProps}) => ({
			title: t('help_center.navigation.title'),
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	add_device_in_room: {
		screen: AddDeviceInRoomScreen,
		navigationOptions: ({screenProps}) => ({
			//title: 'Add device in room',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	remove_device_from_room: {
		screen: RemoveDeviceFromRoomScreen,
		navigationOptions: ({screenProps}) => ({
			//title: 'Remove device from room',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
		})
	},
	order_devices_in_room:{
		screen: OrderDevicesInRoom,
		navigationOptions: ({screenProps}) => ({
			//title: 'Remove device from room',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor,
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
	rooms_settings: {
		screen: RoomsSettingsScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Rooms settings',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	create_room:{
		screen: CreateRoomScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Create room',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	delete_room: {
		screen: DeleteRoomScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Delete room',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	},
	rooms_order: {
		screen: RoomsOrderScreen,
		navigationOptions: ({screenProps}) => ({
			title: 'Order rooms',
			headerStyle: {backgroundColor: screenProps.theme.headerBackgroundColor},
			headerTintColor: screenProps.theme.headerTextColor
		})
	}
}, {initialRouteName: 'login', defaultNavigationOptions: {animationEnabled: true}});
