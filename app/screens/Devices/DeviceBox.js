import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {API_DEFAULT_IMAGES_URL, API_DEVICE_IMAGES_URL} from "../../api/api_routes_v_1.0.0.0";
import React from "react";


interface DeviceBoxProps {
	theme: {},
	device: {},
	onPress?: () => {},
	onLongPress?: () => {},
}

const defaultProps: DeviceBoxProps = {
	theme: '',
	device: '',
	onPress: () => {},
	onLongPress: () => {},
};

export const DeviceBox = (props: DeviceBoxProps = defaultProps) => {
	return (
		<TouchableOpacity
			key={props.device['id']}
			onPress={props.onPress}
			onLongPress={props.onLongPress}
			style={[styles.deviceBox, {
				borderColor: props.theme.primaryColor
			}]}>
			<View style={styles.imageView}>
				<Image
					style={styles.deviceImage}
					source={{uri: props.device['image'] !== '' ? API_DEVICE_IMAGES_URL + props.device.image : API_DEFAULT_IMAGES_URL + props.device['default_image']}}
				/>
			</View>

			<View style={styles.nameView}>
				<Text style={[styles.deviceName, {
					color: props.theme.textColor
				}]}>
					{props.device['name'].length < 15 ? props.device['name'] : props.device['name'].substr(0, 14) + '...'}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {},
	deviceBox: {
		height: 170,
		width: '46%',
		marginHorizontal: '2%',
		marginVertical: 10,
		alignSelf: 'center',
		borderWidth: 2,
		borderRadius: 15,
	},
	imageView: {
		flex: 3,
	},
	deviceImage: {
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 30
	},
	nameView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	deviceName: {
		fontSize: 16
	},
});
