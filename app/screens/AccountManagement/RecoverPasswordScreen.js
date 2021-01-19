import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text
} from 'react-native';

export default class RecoverPasswordScreen extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {

	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				contentContainerStyle={{
					backgroundColor: theme.backgroundColor
				}}
			>
				<Text>
					Recover password
				</Text>

			</ScrollView>
		)
	}

};


const style = StyleSheet.create({
	content_container: {

	}
});
