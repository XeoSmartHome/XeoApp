import React, {Component} from "react";
import {AsyncStorage, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";


export default class NotificationsSettingsScreen extends Component{
	constructor() {
		super();
		this.state = {
			notifications_enabled: true,
			sound_enabled: true,
			vibration_enabled: true,

		};
		this.loadSettings();
	}

	loadSettings(){

	}

	render() {
		return(
			<SafeAreaView>

				<View style={styles.row}>
					<Text style={[styles.row_text, {flex: 5} ]}>
						Notifications
					</Text>
					<Switch
						style={{flex: 1}}
						thumbColor="#4267b2"
						trackColor={{false: '#bab9b9', true: '#abcaff' }}
						value={this.state.notifications_enabled}
						onValueChange={ (value) => {
							this.setState({
								notifications_enabled: value
							});
						} }
					/>
				</View>

				<View style={styles.row}>
					<Text style={[styles.row_text, {flex: 5} ]}>
						Sound
					</Text>
					<Switch
						style={{flex: 1}}
						thumbColor="#4267b2"
						trackColor={{false: '#bab9b9', true: '#abcaff' }}
						value={this.state.sound_enabled && this.state.notifications_enabled}
						onValueChange={ (value) => {
							this.setState({
								sound_enabled: value
							});
						} }
					/>
				</View>

				<View style={styles.row}>
					<Text style={[styles.row_text, {flex: 5} ]}>
						Vibration
					</Text>
					<Switch
						style={{flex: 1}}
						thumbColor="#4267b2"
						trackColor={{false: '#bab9b9', true: '#abcaff' }}
						value={this.state.vibration_enabled && this.state.notifications_enabled}
						onValueChange={ (value) => {
							this.setState({
								vibration_enabled: value
							});
						} }
					/>
				</View>
			</SafeAreaView>
			)
	}
}

const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
		flexDirection: 'row'
	},
	row_text:{
		fontSize: 20,
	}
});
