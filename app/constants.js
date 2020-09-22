import {StyleSheet} from "react-native";

export const GOOGLE_OAUTH_CLIENT_ID = '998191555443-5ueke76hrlko6h7of29rtva5dao1vgjv.apps.googleusercontent.com';
export const FACEBOOK_APP_ID = '248947746417873';

export const API_URL = 'https://dashboard.xeosmarthome.com/api/';
export const API_STATUS_URL = API_URL + 'status';
export const API_LOGIN_URL = API_URL + 'login';
export const API_LOAD_DEVICES = API_URL + 'devices';
export const API_ADD_DEVICE = API_URL + 'add_device';
export const API_DELETE_DEVICE = API_URL + 'delete_device';
export const API_CHANGE_DEVICE_NAME = API_URL + 'change_device_name';
export const API_LOAD_DEVICE = API_URL + 'device/';
export const API_CONTROL_DEVICE = API_URL + 'control_device';
export const API_DEVICE_IMAGES_URL = 'https://dashboard.xeosmarthome.com/device_images/';
export const API_DEFAULT_IMAGES_URL = 'https://dashboard.xeosmarthome.com/static/default_device_images/';
export const API_ADD_ACTION = API_URL + 'add_action';
export const API_UPDATE_ACTION = API_URL + 'update_action';
export const API_DELETE_ACTION = API_URL + 'delete_action';
export const API_UPDATE_DEVICE_IMAGE = API_URL + 'update_device_image';
export const API_UPDATE_PASSWORD = API_URL + 'update_password';
export const API_LOAD_SENSORS = API_URL + 'sensors';
export const API_LOGIN_WITH_GOOGLE = API_URL + 'login_with_google';
export const API_LOGIN_WITH_FACEBOOK = API_URL + 'login_with_facebook'

export const XEO_BLUE = '#4267b2';
export const BOOTSTRAP_COLOR_PRIMARY = '#0275d8';
export const BOOTSTRAP_COLOR_SECONDARY = '#6c757d';
export const BOOTSTRAP_COLOR_SUCCESS = '#28a745';
export const BOOTSTRAP_COLOR_WARNING = '#ffc107';
export const BOOTSTRAP_COLOR_DANGER = '#dc3545';
export const BOOTSTRAP_COLOR_LIGHT = '#f8f9fa';
export const BOOTSTRAP_COLOR_DARK = '#343a40';


export const menu_style = StyleSheet.create({
	button:{
		alignSelf: 'center',
		width: '100%',
		padding: 14,
	},
	button_text:{
		alignSelf: 'center',
		fontSize: 18
	},
	separator:{
		alignSelf: 'center',
		width: '94%',
		borderBottomWidth: 2,
		borderBottomColor: BOOTSTRAP_COLOR_SECONDARY
	}
});
