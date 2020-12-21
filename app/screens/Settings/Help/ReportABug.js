import React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput, TouchableOpacity, View
} from 'react-native'
import {BOOTSTRAP_COLOR_LIGHT, BOOTSTRAP_COLOR_PRIMARY, BOOTSTRAP_COLOR_SECONDARY} from "../../../themes/bootstrap_colors";
import * as ImagePicker from "expo-image-picker";
import I18n from 'i18n-js'


const INPUT_MAX_LENGTH = 500;

export default class ReportABug extends React.Component {
	constructor() {
		super();
		this.state = {
			bug_description: '',
			bug_screenshot_uri : null,
			bug_screenshot_type: null,
			image_name: null
		}
	}

	uploadScreenshot() {
		ImagePicker.launchImageLibraryAsync({
			allowsEditing: false
		}).then( ({cancelled, uri, type}) => {
			if(cancelled)
				return ;

			this.setState({
				bug_screenshot_uri: uri,
				bug_screenshot_type: type,
				image_name: uri.split('/').pop()
			});
		}).catch( (error) => {
			alert(error);
		})
	}

	sendBugReport(){
		/*
			let formData = new FormData();
			formData.append('description', this.state.bug_description);
			formData.append('screenshot', {uri: uri, name: uri.split('/').pop(), type });

			fetch(API_UPDATE_DEVICE_IMAGE, {
				method: 'POST',
				body: formData,
				header: {
					'content-type': 'multipart/form-data',
				}
			}).then( () => {

			}).catch( (error) => {
				alert(error);
			})*/
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={[styles.screen, {
					backgroundColor: theme.screenBackgroundColor
				}]}
			>
				<TextInput
					style={[styles.text_input, {
						color: theme.textColor
					}]}
					multiline={true}
					autoCapitalize='sentences'
					textAlignVertical='top'
					value={this.state.bug_description}
					maxLength={INPUT_MAX_LENGTH}
					placeholder={I18n.t('report_a_bug.input_placeholder')}
					placeholderTextColor={theme.placeholderTextColor}
					onChangeText={ (value) =>
						this.setState({
							bug_description: value
						})
					}
				/>

				<Text
					style={[styles.character_limit, {
						color: theme.textColor
					}]}
				>
					{this.state.bug_description.length}/{INPUT_MAX_LENGTH}
				</Text>

				{
					this.state.image_name !== null &&

					<Text
						style={[styles.image_name, {
							color: theme.textColor
						}]}
					>
						{
							this.state.image_name
						}
					</Text>
				}

				<View style={{
					flexDirection: 'row'
				}}>
					<TouchableOpacity
						style={styles.upload_screenshot_button}
						onPress={ () => this.uploadScreenshot() }
					>
						<Text
							style={styles.upload_button_text}
						>
							{ I18n.t('report_a_bug.upload_screenshot_button') }
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.send_button
						]}
						onPress={ () => {

						}}
					>
						<Text
							style={[
								styles.send_button_text
							]}
						>
							{ I18n.t('report_a_bug.send_button') }
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: '3%'
	},
	text_input: {
		borderWidth: 2,
		borderRadius: 8,
		padding: 10,
		height: 250,
		fontSize: 18,
	},
	character_limit: {
		alignSelf: 'flex-end',
		fontSize: 16,
		padding: 6
	},
	upload_screenshot_button: {
		backgroundColor: BOOTSTRAP_COLOR_SECONDARY,
		padding: 6,
		borderRadius: 8,
		flex: 3,
		marginRight: 5,
		justifyContent: 'center'
	},
	upload_button_text: {
		fontSize: 14,
		color: BOOTSTRAP_COLOR_LIGHT,
		alignSelf: 'center'
	},
	send_button: {
		backgroundColor: BOOTSTRAP_COLOR_PRIMARY,
		padding: 6,
		borderRadius: 8,
		flex: 2,
		marginLeft: 5,
		justifyContent: 'center'
	},
	send_button_text: {
		fontSize: 18,
		color: BOOTSTRAP_COLOR_LIGHT,
		alignSelf: 'center'
	},
	image_name: {
		paddingVertical: 16,
		fontSize: 16
	}
});
