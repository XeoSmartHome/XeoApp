import React, {Component} from "react";
import {
	Image,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Button,
	View,
	ScrollView
} from "react-native";
import {BOOTSTRAP_COLOR_DARK} from "../../../constants";
import WebView from "react-native-webview";


export default class HelpScreen extends Component{
	constructor() {
		super();
		this.state = {
			user:{
				first_name: '',
				last_name: '',
				email: '',
				phone_number: '',
			}
		};
	}

	render(){
		return(
			<ScrollView>

				<TouchableOpacity style={styles.row}>
					<Text style={styles.row_text}>
						Report a bug
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.row}>
					<Text style={styles.row_text}>
						Help center
					</Text>
				</TouchableOpacity>

			</ScrollView>
		)

	}
}


const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	row_text:{
		fontSize: 20,
	}
});
