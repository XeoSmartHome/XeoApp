import React from "react";
import I18n from 'i18n-js';
import {ScrollView, Text, TouchableOpacity, View, Alert, ToastAndroid, Clipboard} from "react-native";
import {API} from "../../../api/api";

const t = (key) => I18n.t('action_links_list.' + key);


export default class ActionLinksListScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			action_links: [],
			sort_by: ''
		};
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus', () => {
				this.loadActionLinks();
			}
		);
		this.loadActionLinks();
	}

	loadActionLinksCallback(response) {
		this.setState({
			action_links: response['actions_links']
		});
	}

	loadActionLinks() {
		API.devices.action_links.getActionsLinks({
			device_id: this.props.navigation.state.params.device_id
		}).then(
			this.loadActionLinksCallback.bind(this)
		).catch(
			(error) => {
				console.warn(error);
			}
		)
	}

	deleteActionLinkCallback(response) {
		if(response.status === 200){
			this.loadActionLinks();
		}
	}

	deleteActionLink(action_link_id) {
		API.devices.action_links.deleteActionLink({
			device_id: this.props.navigation.state.params.device_id,
			action_link_id: action_link_id
		}).then(
			this.deleteActionLinkCallback.bind(this)
		).catch(
			(error) => {
				console.warn(error);
			}
		);
	}

	onCopyLinkButtonPress(action_link) {
		Clipboard.setString(action_link['url']);
		ToastAndroid.show('Link copied', ToastAndroid.SHORT);
	}

	actionLinkLongPress(action_link){
		Alert.alert(
			'',
			'Delete "' + action_link['name'] + '" action link',
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => this.deleteActionLink(action_link['id'])
				}
			],
			{

			},
		);
	}

	renderActionLink(action_link, index) {
		const {theme} = this.props.screenProps;
		return (
			<TouchableOpacity
				key={'action_link_' + index}
				style={{
					borderBottomWidth: 2,
					borderColor: theme.textColor,
					paddingVertical: 6
				}}
				onLongPress={ () => this.actionLinkLongPress(action_link) }
			>
				<View
					style={{
						flexDirection: "row"
					}}
				>
					<Text
						style={{
							color: theme.textColor,
							fontSize: 18,
							paddingVertical: 2,
							flex: 4
						}}
					>
						{action_link['name']}
					</Text>
					<TouchableOpacity
						style={{
							alignSelf: "flex-end",
						}}
						onPress={ () => this.onCopyLinkButtonPress(action_link)}
					>
						<Text
							style={{
								color: theme.primaryColor,
								fontSize: 18,
								fontWeight: "bold",
								flex: 1
							}}
						>
							{t('copy_link')}
						</Text>
					</TouchableOpacity>
				</View>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 14,
						paddingVertical: 2
					}}
				>
					{t('created_on')}: {action_link['created_on']}
				</Text>
				<Text
					style={{
						color: theme.textColor,
						fontSize: 14,
						paddingVertical: 2
					}}
				>
					{t('last_request')}: {action_link['last_use'] || 'Never'}
				</Text>
			</TouchableOpacity>
		)
	}

	generateNewLinkPress() {
		this.props.navigation.navigate('create_action_link', {device_id: this.props.navigation.state.params.device_id});
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor,
					padding: '3%'
				}}
			>
				{
					this.state.action_links.map(this.renderActionLink.bind(this))
				}
				<TouchableOpacity
					style={{
						alignSelf: "center",
						marginTop: 20,
						paddingBottom: 50
					}}
					onPress={this.generateNewLinkPress.bind(this)}
				>
					<Text
						style={{
							color: theme.primaryColor,
							fontWeight: "bold",
							fontSize: 20
						}}
					>
						{t('generate_new_link')}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}
