import React from "react";
import I18n from "i18n-js";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";


const t = (key) => I18n.t(`1234.${key}`);


export default class RoomsSettingsScreen extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {theme} = this.props.screenProps;
		return (
			<ScrollView
				style={{
					backgroundColor: theme.screenBackgroundColor
				}}
			>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('create_room') } }
					>
						<MaterialIcons
							name="add-circle-outline"
							size={styles.icon.fontSize}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							Add room
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('delete_room') } }
					>
						<AntDesign
							name="delete"
							size={styles.icon.fontSize}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							Delete room
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={{flexDirection: 'row'}}
						onPress={ () => { this.props.navigation.navigate('rooms_order') } }
					>
						<Octicons
							name="list-unordered"
							size={styles.icon.fontSize}
							color={theme.textColor}
						/>
						<Text style={[styles.button_text, {
							color: theme.textColor
						}]}>
							Order rooms
						</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	row: {
		//borderBottomWidth: 2,
		//borderColor: BOOTSTRAP_COLOR_DARK,
		paddingVertical: '3%',
		paddingHorizontal: '1%',
		width: '94%',
		marginHorizontal: '3%',
	},
	button_text:{
		fontSize: 20,
		marginLeft: 8
	},
	icon:{
		fontSize: 26
	}
});
