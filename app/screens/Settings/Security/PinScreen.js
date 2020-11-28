import React, {Component} from "react";
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {BOOTSTRAP_COLOR_DANGER} from "../../../constants";
import I18n from 'i18n-js'
import AsyncStorage from "@react-native-community/async-storage";


const PIN_LENGTH = 4;
const DEFAULT_PIN = '0000';

const t = (key) => I18n.t('pin_check.' + key);


export default class PinScreen extends Component {
	constructor() {
		super();
		this.state = {
			pin: '',
			app_pin: '',
			show_error_message: false,
			error_message: '',
			setting_pin: false,
			verification_passed: false,
			new_pin_set: false,
			new_pin: '',
			title: t('title.enter_pin')
		}
	}

	componentDidMount() {
		this.setState({
			setting_pin: this.props.navigation.state.params.set_pin === true
		});
		this.loadPinFromAppStorage();
	}

	savePinInAppStorage(pin){
		AsyncStorage.setItem('app_pin', pin);
	}

	loadPinFromAppStorage(){
		AsyncStorage.getItem('app_pin').then( (value) => {
			this.setState({app_pin: value || DEFAULT_PIN});
		});
	}

	handleKeyPress(key){
		let current_pin = this.state.pin + key;

		if(current_pin.length === PIN_LENGTH){
			if(this.state.setting_pin){
				// User is in setting pin mode
				if(this.state.verification_passed){
					// User passed pin verification
					if(this.state.new_pin_set){
						// User entered new pin, now he must confirm it
						if(current_pin === this.state.new_pin){
							// If new pin match with confirm pin save pin in Storage and navigate back
							this.savePinInAppStorage(current_pin);
							this.props.navigation.goBack();
						} else {
							// If new pin don't match with confirm pin show an error message
							this.setState({
								pin: '',
								show_error_message: true,
								error_message: t('error.pin_not_matching')
							});
						}
					} else {
						// User is setting new pin
						this.setState({
							pin: '',
							new_pin: current_pin,
							new_pin_set: true,
							title: t('title.confirm_new_pin')
						})
					}

				} else {
					// User not passed pin verification
					if(current_pin === this.state.app_pin){
						// If pin is correct go to next step (new pin input)
						this.setState({
							pin: '',
							verification_passed: true,
							title: t('title.enter_new_pin')
						});
					} else {
						// If pin is in incorrect show an error message
						this.setState({
							pin: '',
							show_error_message: true,
							error_message: t('error.wrong_pin')
						});
					}
				}

			} else {
				// User is not is setting pin mode
				if(current_pin === this.state.app_pin){
					// If entered pin is correct navigate to next screen
					this.props.navigation.replace(
						this.props.navigation.state.params.next,
						this.props.navigation.state.params.params
					);
				} else {
					// If entered pin is incorrect show an error message
					this.setState({
						pin: '',
						show_error_message: true,
						error_message: t('error.wrong_pin')
					});
				}

			}
		} else {
			this.setState({
				pin: current_pin,
				show_error_message: false
			});
		}
	}

	handleDeleteButton(){
		this.setState({
			pin: this.state.pin.substr(0, this.state.pin.length-1)
		});
	}

	render() {
		const {theme} = this.props.screenProps;
		return(
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: theme.screenBackgroundColor
				}}
			>

				<View>
					<Text style={[styles.title, {
						color: theme.textColor
					}]}>
						{ this.state.title }
					</Text>
					<View style={styles.dot_row}>
						{
							[1, 2, 3, 4].map((item, index) =>
								<View style={styles.circle} key={'circle' + index}>
									{
										this.state.pin.length <= index ?
											(
												<Icon
													name='circle-thin'
													type='font-awesome'
													color={theme.textColor}
													size={20}
												/>
											) : (
												<Icon
													//style={styles.circle}
													name='circle'
													type='font-awesome'
													color={theme.textColor}
													size={20}
												/>
											)
									}
								</View>
							)
						}
					</View>
					<View style={styles.error_message}>
						<Text style={[styles.error_message_text, {opacity: this.state.show_error_message ? 1 : 0} ]}>
							{ this.state.error_message }
						</Text>
					</View>
				</View>

				{this.renderNumpad()}

			</SafeAreaView>
		)
	}

	renderNumpad(){
		const {theme} = this.props.screenProps;
		const style_numpad_key_text = [styles.numpad_key_text, {
			color: theme.textColor
		}];
		return(
			<View>
				<StatusBar hidden={true}/>
				<View style={styles.numpad_row}>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(1)}
					>
						<Text style={style_numpad_key_text}>
							1
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(2)}
					>
						<Text style={style_numpad_key_text}>
							2
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(3)}
					>
						<Text style={style_numpad_key_text}>
							3
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.numpad_row}>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(4)}
					>
						<Text style={style_numpad_key_text}>
							4
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(5)}
					>
						<Text style={style_numpad_key_text}>
							5
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(6)}
					>
						<Text style={style_numpad_key_text}>
							6
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.numpad_row}>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(7)}
					>
						<Text style={style_numpad_key_text}>
							7
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(8)}
					>
						<Text style={style_numpad_key_text}>
							8
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(9)}
					>
						<Text style={style_numpad_key_text}>
							9
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.numpad_row}>
					<View
						style={styles.numpad_key}
					>
					</View>
					<TouchableOpacity
						style={styles.numpad_key}
						onPress={() => this.handleKeyPress(0)}
					>
						<Text style={style_numpad_key_text}>
							0
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.numpad_key, {justifyContent:'center'} ]}
						onPress={() => this.handleDeleteButton()}
					>
						<Icon
							name='delete'
							type='feather'
							color={theme.textColor}
							size={styles.numpad_key_text.fontSize}
						/>
					</TouchableOpacity>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	numpad_row: {
		flexDirection: 'row'
	},
	numpad_key: {
		flex: 1
	},
	numpad_key_text: {
		fontSize: 40,
		alignSelf: 'center',
		padding: 10
	},
	title: {
		fontSize: 26,
		alignSelf: 'center',
		marginTop: '35%',
	},
	dot_row: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginVertical: '5%'
	},
	error_message:{
		alignSelf: 'center',
		margin: '2%',
		height: '10%',
		justifyContent: 'center'
	},
	error_message_text:{
		fontSize: 16,
		color: BOOTSTRAP_COLOR_DANGER
	},
	circle:{
		paddingHorizontal: 10
	}

});
