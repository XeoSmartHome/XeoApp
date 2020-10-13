import React from "react";
import {ScrollView, Text, StyleSheet} from "react-native";
import {WebView} from 'react-native-webview'


export default class HelpCenterScreen extends React.Component{
	constructor() {
		super();
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<WebView
				source={{uri: 'https://xeosmarthome.com/help'}}
			/>
		)
	}
}


const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
