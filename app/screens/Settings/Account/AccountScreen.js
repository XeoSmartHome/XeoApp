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


export default class AccountScreen extends Component{
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
		this.loadUserProfile();
	}

	render(){
		return(
			<ScrollView>

				<View style={styles.row}>
					<Text style={styles.row_text}>
						User: {this.state.first_name} {this.state.last_name}
					</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.row_text}>
						Email: {this.state.email}
					</Text>
				</View>

			</ScrollView>
		)

	}

	loadUserProfile(){
		fetch('https://dashboard.xeosmarthome.com/api/user_profile', {
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({ first_name: response.first_name});
				this.setState({ last_name: response.last_name});
				this.setState({ email: response.email});
			}
		).catch((error) => {
			alert(error)
		})
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
