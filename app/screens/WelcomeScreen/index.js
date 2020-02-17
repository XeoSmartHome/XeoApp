import React, {Component} from "react";
import {Button, Text, View} from "react-native";


export default class WelcomeScreen extends Component{
	render(){
		return (
			<View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
				<Text style={{margin: 10, fontSize: 24, color: "blue"}}>Hello, Maria!</Text>
				<Button title="Go to login" onPress={() => this.props.navigation.navigate('login')}/>
				<Button title="Go to dashboard" onPress={() => this.props.navigation.navigate('dashboard')}/>
			</View>
		)
	}
}
