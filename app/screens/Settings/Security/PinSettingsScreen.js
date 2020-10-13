import React, {Component} from "react";
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";


export default class PinSettingsScreen extends Component {
	constructor() {
		super();
		this.state = {
			pin_enable: null
		};
		AsyncStorage.getItem('lock_app_with_pin_enable').then((value) => {
			this.setState({
				pin_enable: value === 'true'
			})
		})
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					flex: 1,
					padding: '3%',
					backgroundColor: theme.screenBackgroundColor
				}}
			>

				<View style={[styles.row, {flexDirection: 'row'} ]}>
					<Text
						style={[styles.button_text, {
							flex: 1,
							color: theme.textColor
						}]}>
						Lock app with PIN
					</Text>
					<Switch
						style={{flex: 1}}
						thumbColor="#4267b2"
						trackColor={{false: '#bab9b9', true: '#abcaff' }}
						value={this.state.pin_enable}
						onValueChange={ (value) => {
							this.setState({pin_enable: value});
							AsyncStorage.setItem('lock_app_with_pin_enable', value ? 'true' : 'false').then();
						} }
					/>
				</View>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => {
						this.props.navigation.navigate('pin', {next: 'pin', params: {scope: 'setPIN', next: 'pin_settings', params: {}}});
					}}>
					<Text
						style={[styles.button_text, {
							color: theme.textColor
						}]}
					>
						Change PIN
					</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
	},
	button_text:{
		fontSize: 20,
	}
});
