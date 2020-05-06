import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {XEO_BLUE} from "../../constants";

export default class AccountOptionsScreen extends Component{
	constructor() {
		super();
	}

	render(){
		return(
			<SafeAreaView>
				<TouchableOpacity
					style={styles.button_box}
					onPress={ () => { this.props.navigation.navigate('account_settings') } }
				>
					<Text style={styles.button_text}>
						Account
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button_box}
					onPress={ () => { this.props.navigation.navigate('user_activity') } }
				>
					<Text style={styles.button_text}>
						Activity
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button_box}
					onPress={ () => { } }
				>
					<Text style={styles.button_text}>
						Support
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button_box}
					onPress={ () => { } }
				>
					<Text style={styles.button_text}>
						Sign out
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	button_box:{
		borderBottomWidth: 1,
		borderColor: XEO_BLUE,
		padding: '5%',
		width: '90%',
		left: '5%'
	},
	button_text:{
		fontSize: 24,
		alignSelf: 'center'
	}
});
