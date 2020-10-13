import React, {Component} from "react";
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {BOOTSTRAP_COLOR_DANGER} from "../../../constants";
import I18n from 'i18n-js'
import AsyncStorage from "@react-native-community/async-storage";


const PIN_LENGTH = 4;

const t = (key) => I18n.t('pin_check.' + key);


export default class PinScreen extends Component {
	constructor() {
		super();
		this.state = {
			pin_enable: null,
			pin: '',
			app_pin: '',
			show_error_message: false,
			error_message: '',
			scope: '',
			new_pin: ''
		}
	}

	componentDidMount() {
		this.setState({
			scope: this.props.navigation.state.params.scope !== undefined ? this.props.navigation.state.params.scope : 'checkPIN'
		});
		this.loadPinFromAppStorage();
	}

	savePinInAppStorage(pin){
		AsyncStorage.setItem('app_pin', pin);
	}

	loadPinFromAppStorage(){
		AsyncStorage.getItem('app_pin').then( (value) => {
			this.setState({app_pin: value});
		});
	}

	handleKeyPress(key){
		if(this.state.pin.length === PIN_LENGTH - 1){
			switch(this.state.scope){
				case 'checkPIN':
					if(this.state.pin + key === this.state.app_pin){
						this.props.navigation.replace(
							this.props.navigation.state.params.next,
							this.props.navigation.state.params.params
						);
					} else {
						this.setState({
							pin: '',
							show_error_message: true,
							error_message: 'pin gresit'
						});
						return;
					}
					break;
				case 'setPIN':
					if(this.state.new_pin.length === 0){
						this.setState({
							new_pin: this.state.pin + key,
							pin: ''
						})
					} else if(this.state.new_pin === this.state.pin + key) {
						this.savePinInAppStorage(this.state.pin + key);
						this.props.navigation.goBack();
					} else {
						this.setState({
							pin: '',
							show_error_message: true,
							error_message: 'repeta pinul te rog'
						});
					}
					break;
			}
		} else {
			this.setState({
				pin: this.state.pin + key,
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
						{ t('title') }
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
