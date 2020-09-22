import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";

export default class SecurityScreen extends Component{
	constructor() {
		super();
	}

	render(){
		return(
			<SafeAreaView>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => { this.props.navigation.navigate('change_password') } }
				>
					<Text style={styles.button_text}>
						Change password
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => { this.props.navigation.navigate('pin_settings') } }
				>
					<Text style={styles.button_text}>
						App PIN
					</Text>
				</TouchableOpacity>

			</SafeAreaView>
		)
	}
}
/*<TouchableOpacity
					style={styles.row}
					onPress={ () => { alert('Comming soon') } }
				>
					<Text style={styles.button_text}>
						Two factor authentication
					</Text>
				</TouchableOpacity>*/

const styles = StyleSheet.create({
	row: {
		//borderBottomWidth: 2,
		//borderColor: BOOTSTRAP_COLOR_DARK,
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	button_text:{
		fontSize: 20,
	}
});
