import React from "react";
import WebView from "react-native-webview";
import {TERMS_AND_CONDITIONS_URL} from "../../constants";


export default class TermsAndConditionsScreen extends React.Component{
	constructor() {
		super();
	}

	render() {
		return(
			<WebView source={{uri: TERMS_AND_CONDITIONS_URL}}/>
		)
	}
}
