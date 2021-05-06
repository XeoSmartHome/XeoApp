import React, {Component} from "react";
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18n-js';


const t = (key) => I18n.t('pin_settings.' + key);


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
		this.setPinToDefaultIfNoPinIsSavedInAppStorage();
	}

	setPinToDefaultIfNoPinIsSavedInAppStorage(){
		AsyncStorage.getItem('app_pin').then((value => {
			if(value === undefined)
				AsyncStorage.setItem('app_pin', '0000');
		}))
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
						{t('lock_app_with_pin')}
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
						this.props.navigation.navigate('pin', {set_pin:true});
					}}>
					<Text
						style={[styles.button_text, {
							color: theme.textColor
						}]}
					>
						{t('change_pin')}
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
