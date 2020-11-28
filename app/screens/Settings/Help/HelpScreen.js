import React, {Component} from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";
import I18n from 'i18n-js';


const t = (key) => I18n.t('help.' + key);


export default class HelpScreen extends Component{
	constructor() {
		super();
	}

	render(){
		const {theme} = this.props.screenProps;
		return(
			<ScrollView style={{
				backgroundColor: theme.screenBackgroundColor
			}}>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => this.props.navigation.navigate('report_a_bug') }
				>
					<Text style={[styles.row_text, {
						color: theme.textColor
					}]}>
						{t('report_a_bug')}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => this.props.navigation.navigate('help_center') }
				>
					<Text style={[styles.row_text, {
						color: theme.textColor
					}]}>
						{t('help_center')}
					</Text>
				</TouchableOpacity>

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
	},
	row_text:{
		fontSize: 20,
	}
});
