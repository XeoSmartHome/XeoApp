import React, {Component} from "react";
import {AsyncStorage, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {string} from "prop-types";


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
		return (
			<SafeAreaView>

				<View style={[styles.row, {flexDirection: 'row'} ]}>
					<Text style={[styles.button_text, {flex: 1} ]}>
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
						this.props.navigation.navigate('pin');
					}}>
					<Text style={styles.button_text}>
						Change PIN
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	button_text:{
		fontSize: 20,
	}
});
