import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BOOTSTRAP_COLOR_DARK, BOOTSTRAP_COLOR_LIGHT, XEO_BLUE} from "../../constants";
import {Icon} from "react-native-elements";

export default class SettingsScreen extends Component{
	constructor() {
		super();
	}

	render(){
		return(
			<SafeAreaView>
				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('account_settings') } }
					>
						<Icon
							name='account-circle-outline'
							type='material-community'
							size={25}
						/>
						<Text style={styles.button_text}>
							Account
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('account_settings') } }
					>
						<Icon
							name='settings'
							type='feather'
							size={25}
						/>
						<Text style={styles.button_text}>
							App settings
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
									  onPress={ () => { this.props.navigation.navigate('security') } }
					>
						<Icon
							name='security'
							type='material-community'
							size={25}
						/>
						<Text style={styles.button_text}>
							Security
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity style={{flexDirection: 'row'}}
									  onPress={ () => { this.props.navigation.navigate('help') } }
					>
						<Icon
							name='help-circle'
							type='feather'
							size={25}
						/>
						<Text style={styles.button_text}>
							Help
						</Text>
					</TouchableOpacity>
				</View>

			</SafeAreaView>
		)
	}
}


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
		marginLeft: 8
	}
});
