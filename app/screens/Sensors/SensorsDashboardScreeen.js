import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView} from "react-native";
import {Icon} from "react-native-elements";


export default class SensorsDashboardScreen extends Component{
	constructor() {
		super();
		this.state = {
			sensors: []
		}
	}

	render(){
		return(
			<ScrollView>
				<Text>Sensors dashboard</Text>
			</ScrollView>
		)
	}

	loadDashboard(){

	}
}


const styles = StyleSheet.create({

});
