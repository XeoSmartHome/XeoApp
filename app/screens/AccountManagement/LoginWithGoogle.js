import React, {Component} from "react";
import {WebView} from "expo/build/removed.web";


class LoginWithGoogle extends Component {
	render() {
		return (
			<WebView
				source={{uri: 'https://github.com/facebook/react-native'}}
				style={{marginTop: 20}}
			/>
		);
	}
}
