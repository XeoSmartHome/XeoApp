import React from "react";
import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const DEFAULT_ANIMATIONS_VALUE = true;


export default class AnimationsSettingsScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			animations_enable: false
		};
	}

	componentDidMount() {
		this.loadSettings();
	}

	loadSettings() {
		AsyncStorage.getItem('animations_enable').then((animations_enable) => {
			this.setState({
				animations_enable: animations_enable === null ? DEFAULT_ANIMATIONS_VALUE : animations_enable === 'true'
			});
		});
	}

	onAnimationsToggle(value){
		this.setState({
			animations_enable: value
		});
		AsyncStorage.setItem('animations_enable', value.toString());
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: theme.screenBackgroundColor
				}}
			>
				<View style={styles.row}>
					<Text style={[styles.row_text, {
						flex: 5,
						color: theme.textColor
					}]}>
						Animations
					</Text>
					<Switch
						style={{flex: 1}}
						thumbColor="#4267b2"
						trackColor={{false: '#bab9b9', true: '#abcaff' }}
						value={this.state.animations_enable}
						onValueChange={ (value) => {
							this.onAnimationsToggle(value);
						} }
					/>
				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	row: {
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
		flexDirection: 'row'
	},
	row_text:{
		fontSize: 20,
	}
});
