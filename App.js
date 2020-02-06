import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./screens/login/LoginScreen";
import DevicesScreen from "./screens/devices/DevicesScreen";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}

const AuthenticationNavigator = createStackNavigator({
	SignIn: LoginScreen
});

const AppNavigator = createSwitchNavigator({
	/*
	 * Rather than being rendered by a screen component, the
	 * AuthenticationNavigator is a screen component
	 */
	Auth: AuthenticationNavigator,
	Home: DevicesScreen,
});

const AppContainer = createAppContainer(AppNavigator);
