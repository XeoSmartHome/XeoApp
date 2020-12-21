import {StyleSheet} from "react-native";
import {BOOTSTRAP_COLOR_SECONDARY} from "./themes/bootstrap_colors";

export const GOOGLE_OAUTH_CLIENT_ID_EXPO = '998191555443-smvquk0pskm7d69sbv6arg9173eh8vhp.apps.googleusercontent.com';
export const GOOGLE_OAUTH_CLIENT_ID_STANDALONE = '998191555443-5ueke76hrlko6h7of29rtva5dao1vgjv.apps.googleusercontent.com';
export const FACEBOOK_APP_ID = '248947746417873';

export const XEO_BLUE = '#4267b2';



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
