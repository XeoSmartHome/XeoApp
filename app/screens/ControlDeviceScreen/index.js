import React, {Component} from "react";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	SafeAreaView,
	ScrollView,
	SectionList, ImageBackground, Modal, Slider,TouchableOpacity
} from "react-native";


export default class ControlDeviceScreen extends Component{
	constructor() {
		super();
		this.state = {
			modalVisible: [],
			device:{
				id: 0,
				name: '',
				serial: '',
				image: '',
				connected: false,
				active: false,
				schedule_active: false,
				last_connection: '',
				actions:[],
				possible_actions: [],
			}
		};
	}

	async loadDevice(){
		fetch('https://dashboard.xeosmarthome.com/api/device/' + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
				this.setState({ device: response})
			}
		).catch((error) => {
			alert(error)
		});
		return ''
	}

	renderParameterOption(option){
		return(
			<TouchableOpacity style={styleActions.optionButton}>
				<Text style={styleActions.optionButtonText}>
					{option['label']}
				</Text>
			</TouchableOpacity>
		)
	}

	renderParameterOptions(options){
		return(
			<View style={styleActions.optionsBox}>
				<FlatList
					numColumns={1}
					data={options}
					renderItem={({ item}) => this.renderParameterOption(item)}
					keyExtractor={(item => {String(item.id)} )}
				/>
			</View>
		)
	}

	/*<Slider
						maximumTrackTintColor="red"
						minimumTrackTintColor="blue"
						minimumValue={parameter.min}
						maximumValue={parameter.max}
						value={parameter.default}
						step={parameter.step}
						onValueChange={(value) => {this.setState({a: value})} }
					/>*/

	renderParameter(parameter){
		return(
			<View>
				<Text style={{alignSelf: 'center', fontSize: 24, margin: 25}}>{parameter.name}</Text>
				{this.renderParameterOptions(parameter['options'])}
			</View>
		)
	}

	renderActionButton(action, index){
		return(
			<View style={styleActions.buttonBox}>
				<Button onPress={()=>{
					let aux = this.state.modalVisible.slice();
					aux[index] = true;
					this.setState({modalVisible: aux})}
					}
						title={action.name}
				/>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible[index]===undefined ? false: this.state.modalVisible[index]}
					onRequestClose={()=>{
						let aux = this.state.modalVisible.slice();
						aux[index] = false;
						this.setState({modalVisible: aux})
					}}>
					<FlatList
						numColumns={1}
						data={action['possible_parameters']}
						renderItem={({ item, index}) => this.renderParameter(item)}
						keyExtractor={item => String(item.id)}
					/>
				</Modal>
			</View>
		)
	}

	componentDidMount() {
		this.loadDevice().then(()=>{
		});
	}

	render(){
		return (
			<SafeAreaView style={styles.container}>
				<Text
					style={styles.deviceName}>
					Device: {this.state.device.name}
				</Text>
				<Text
					style={styles.deviceStatus}>
					Status: {this.state.device.connected ? 'connected': 'disconnected'}
				</Text>
				<Text style={styles.deviceLastConnection}>
					(Last sync: {this.state.device.last_connection})
				</Text>
				<View style={styleActions.container}>
					<Text
						style={styleActions.title}>
						Remote control
					</Text>
					<View>
						<FlatList
							numColumns={1}
							data={this.state.device.possible_actions}
							renderItem={({ item, index}) => this.renderActionButton(item, index)}
							keyExtractor={item => String(item.id)}
						/>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}

const styleActions = StyleSheet.create({
	container:{
	},
	buttonBox:{
		width: '50%',
		margin: 6,
		alignSelf: 'center',
	},
	separator:{
		borderBottomWidth: 2,
		height: 0
	},
	title:{
		fontSize: 24,
		alignSelf: 'center',
		padding: 8
	},
	optionsBox:{
		//backgroundColor: 'gray',
	},
	optionButton:{
		//backgroundColor: 'green',
		alignSelf: 'center',
		justifyContent: 'center',
		width: '75%',
		margin: 5,
		padding: 5,
		borderRadius: 10,
		height: 50,
		borderWidth: 2,
		borderColor: '#4267b2'
	},
	optionButtonText:{
		alignSelf: 'center',
		fontSize: 20
	}
});


const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 10,
		backgroundColor: '#F5F5F5',
	},
	deviceName:{
		//alignSelf: 'center',
		fontSize: 28,
		padding: 10
	},
	deviceStatus:{
		//alignSelf: 'center',
		fontSize: 20,
		padding: 10
	},
	deviceLastConnection:{
		padding: 10
	}
});
