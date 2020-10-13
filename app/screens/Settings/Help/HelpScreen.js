import React, {Component} from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";


export default class HelpScreen extends Component{
	constructor() {
		super();
	}

	render(){
		const {mode, theme, setTheme} = this.props.screenProps;
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
						Report a bug
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.row}
					onPress={ () => this.props.navigation.navigate('help_center') }
				>
					<Text style={[styles.row_text, {
						color: theme.textColor
					}]}>
						Help center
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
