import React, {Component} from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from '@expo/vector-icons';
// noinspection ES6CheckImport
import  I18n from "i18n-js";
import {API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL} from "../../../api/api_routes_v_1.0.0.0";
import {API} from "../../../api/api";


const t = (key) => I18n.t('device_settings.' + key);


export default class DeviceSettingsScreen2 extends Component{
	constructor() {
		super();
		this.state = {
			device_id: 0,
			device_name: '',
			device_serial: '',
			device_image: '',
			device_default_image: '',
			device_connected: false,
			device_last_connection: '',
			device_active: false,
			device_schedule_active: false,

			hide_serial: true,
			editing_device_name: false,
			new_device_name: '',
			editing_device_name_error: '',
			//image_uploading: false
		};
	}

	componentDidMount(): void {
		this.loadDevice();
	}

	loadDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/device/' + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({
				device_id: response['id'],
				device_name: response['name'],
				device_serial: response['serial'],
				device_image: response['image'],
				device_default_image: response['default_image'],
				device_connected: response['connected'],
				device_last_connection: response['last_connection'],
				device_active: response['active'],
				//device_schedule_active: response['schedule_active'],
			})
		}).catch((error) => {
			alert(error)
		});
	}

	updateDeviceName() {
		//API.devices.
		fetch(API_CHANGE_DEVICE_NAME, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.props.navigation.state.params.device_id,
				name: this.state.new_device_name
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				if(response.status === 200){
					this.setState({
						editing_device_name: false
					});
					this.loadDevice();
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	removeDevice(){
		// TODO: implement device delete
		fetch('https://dashboard.xeosmarthome.com/api/delete_device', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.props.navigation.state.params.device_id,
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				if(response.status === 'success'){
					alert('Devices deleted');
					this.props.navigation.goBack();
				}else {
					alert('An error occurred')
				}
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	updateDeviceImage(){
		ImagePicker.requestCameraRollPermissionsAsync().then();

		ImagePicker.launchImageLibraryAsync({
			aspect: [4, 3],
			allowsMultipleSelection: false,
			mediaTypes: 'Images',
		}).then( ({cancelled, uri}) => {
			if(cancelled)
				return;

			let filename = uri.split('/').pop();
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;

			let formData = new FormData();
			formData.append('device_id', this.state.device_id);
			formData.append('image', { uri: uri, name: filename, type: type});

			/*this.setState({
				image_uploading: true
			});*/
			fetch(API_UPDATE_DEVICE_IMAGE, {
				method: 'POST',
				body: formData,
				header: {
					'content-type': 'multipart/form-data',
				},
			}).then(
				(response) => response.json()
			).then((response) => {
				switch (response.status) {
					case 200:
						this.loadDevice()
						break;
					case 400:
						alert(response.message)
						break;
					}
			}).catch(
				(error) => {
					alert(error);
				}
			)

		}).catch( (error) => {
			alert(error);
		})
	}

	onShowSerial(){
		this.setState({
			hide_serial: !this.state.hide_serial
		});
	}

	hideString(str){
		let hide = '';
		for(let i=0; i<str.length - 3; i++)
			hide += '*'
		hide += str.substr(str.length-3);
		return hide;
	}

	render(){
		const {theme} = this.props.screenProps;
		return (
			<ScrollView style={[styles.screen, {
				backgroundColor: theme.screenBackgroundColor
			}]}>

				<View
					style={[styles.section, {
						borderBottomColor: theme.textColor,
					}]}
				>
					<View style={styles.row}>
						<Text style={[styles.row_text, {
							color: theme.textColor
						}]}>
							{ t('name') }: { this.state.device_name }
						</Text>
						<TouchableOpacity
							style={{
								alignSelf: 'flex-end',
								flex: 2,
								//color: BOOTSTRAP_COLOR_DARK
							}}
							onPress={ () => {
								this.setState({
									editing_device_name: !this.state.editing_device_name,
									new_device_name: this.state.device_name
								})
							}}
						>
							<Text
								style={[styles.row_button, {
									color: theme.textColor
								}]}
							>
								{
									this.state.editing_device_name
										?
										t('cancel_edit_name')
										:
										t('edit_name')
								}
							</Text>
						</TouchableOpacity>
					</View>
					{
						this.state.editing_device_name &&
						<View>
							<TextInput
								style={{
									color: theme.textColor,
									borderBottomWidth: 1,
									borderBottomColor: theme.textColor,
									padding: 4,
									fontSize: 18,
									marginVertical: 10
								}}
								value={this.state.new_device_name}
								onChangeText={ (value) => {
									this.setState({
										new_device_name: value
									});
								}}
								autoFocus={true}
							/>
							<TouchableOpacity
								style={{
									//backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
									padding: 4,
									borderRadius: 8,
									width: '30%',
									alignSelf: 'flex-end',
									opacity: this.state.new_device_name.length === 0 ? 0.5 : 1
								}}
								disabled={this.state.new_device_name.length === 0}
								onPress={ () => {
									this.updateDeviceName();
								}}
							>
								<Text
									style={{
										alignSelf: 'center',
										fontSize: 18,
										//color: BOOTSTRAP_COLOR_LIGHT
									}}
								>
									{ t('confirm_name_editing') }
								</Text>
							</TouchableOpacity>
						</View>
					}
				</View>

				<View
					style={[styles.section, {
						borderBottomColor: theme.textColor,
						flexDirection: 'row'
					}]}
				>
					<Text
						style={[styles.row_text, {
							color: theme.textColor
						}]}
					>
						{ t('serial') }: {
						this.state.hide_serial
							?
							this.hideString(this.state.device_serial)
							:
							this.state.device_serial
						}
					</Text>

					<TouchableOpacity
						style={{
							alignSelf: 'flex-end',
							flex: 2,
							//color: BOOTSTRAP_COLOR_DARK
						}}
						onPress={ () => {
							this.onShowSerial();
						}}
					>
						<Text
							style={[styles.row_button, {
							color: theme.textColor
						}]}
						>
							{this.state.hide_serial ? 'Show' : 'Hide'}
						</Text>
					</TouchableOpacity>
				</View>

				<View
					style={[styles.section, {
						borderBottomColor: theme.textColor,
					}]}
				>
					<Text
						style={{
							fontSize: 20,
							color: theme.textColor
						}}
					>
						{ t('status') }: <Text
							style={{
								color: this.state.device_connected ? 'green' : 'red'
							}}
						>
							{
								this.state.device_connected
									?
									t('connected')
									:
									t('disconnected')
							}
						</Text>
					</Text>
					<Text
						style={{
							color: theme.textColor,
							fontSize: 15
						}}
					>
						Last connection: { this.state.device_last_connection }
					</Text>
				</View>

				<View
					style={[styles.section, {
						borderBottomColor: theme.textColor,
					}]}
				>
					<ImageBackground
						style={{
							alignSelf: "center",
							width: 250,
							height: 250,
							justifyContent: 'flex-end',
						}}
						borderRadius={20}
						source={{
							uri: this.state.device_image !== ''
								?
								API_DEVICE_IMAGES_URL + this.state.device_image
								:
								API_DEFAULT_IMAGES_URL + this.state.device_default_image
						}}
					>
						<TouchableOpacity
							style={{
								//backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
								padding: 10,
								width: 50,
								borderRadius: 20,
								alignSelf: 'flex-end'
							}}
							onPress={ () => this.updateDeviceImage()}
						>
							<Feather name="edit" size={30} color={theme.textColor} />
						</TouchableOpacity>
					</ImageBackground>
				</View>

				<View
					style={{
						padding: 10,
						borderBottomWidth: 2,
						borderColor: theme.textColor
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('action_links', {device_id: this.props.navigation.state.params.device_id});
						}}
					>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 20
							}}
						>
							Action links
						</Text>
						<Text
							style={{
								color: theme.textColor,
								fontSize: 16
							}}
						>
							You can generate Action links (with or without parameters) directly to a specific intent of your action.
						</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						padding: 10
					}}
				>
					<Text
						style={{
							fontSize: 20,
							color: theme.textColor,
						}}
					>
						{ t('logs')}
					</Text>
				</View>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	screen:{
		paddingHorizontal: '3%',
		paddingTop: 10
	},
	section: {
		padding: 10,
		borderBottomWidth: 2
	},
	row: {
		flexDirection: 'row',
	},
	row_text: {
		fontSize: 20,
		flex: 6
	},
	row_button: {
		fontSize: 18,
		alignSelf: 'flex-end'
	}
});
