import React, {Component} from "react";
import {
	Button,
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	SafeAreaView,
	Modal,
	Slider,
	TouchableOpacity, Picker
} from "react-native";
import {API_CONTROL_DEVICE, API_LOAD_DEVICE} from "../../constants";


export default class ControlDeviceScreen extends Component{
	static navigationOptions = ({ navigation, screenProps }) => ({
		headerRight:
			<TouchableOpacity onPress={ () => {
				navigation.navigate('device_alarms', {device_id: navigation.state.params.device_id})
			}}>
				<Image
					style={{height: 40, width: 40, marginRight: 15}}
					source={require('../../assets/images/clock_icon.png')}
				/>
			</TouchableOpacity>,
	});

	constructor() {
		super();
		this.state = {
			device_id: 0,
			device_name: '',
			device_serial: '',
			device_image: '',
			device_connected: false,
			device_active: false,
			device_schedule_active: false,
			device_last_connection: '',
			device_actions: [],
			device_actions_types: [],
			modal_visible: false,
			selected_action_type_index: 0,
			action_parameters: []
		};
	}

	componentDidMount() {
		this.loadDevice();
	}

	loadDevice(){
		fetch(API_LOAD_DEVICE + this.props.navigation.state.params.device_id,{
				method: 'GET'
			}
		).then(
			(response) => response.json()
		).then((response) => {
			this.setState({
				device_id: response['id'],
				device_name: response['name'],
				device_serial: response['serial'],
				device_image: response['image'],
				device_connected: response['connected'],
				device_active: response['active'],
				device_schedule_active: response['schedule_active'],
				device_last_connection: response['last_connection'],
				device_actions: response['actions'],
				device_actions_types: response['actions_types'],
			})
		}).catch((error) => {
			alert(error)
		});
	}

	requestExecuteAction(action_type_id: number, parameters: []){
		parameters = parameters ? parameters : [];
		fetch(API_CONTROL_DEVICE, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: this.state.device_id,
				action_type_id: action_type_id,
				parameters: parameters
			})
		}).then(
			(response) => response.json()
		).then(
			(response) => {
				//alert(response.message);
			}
		).catch(
			(error) => {
				alert(error);
			}
		)
	}

	renderParameterInput(parameter_type, index){
		const current_value = this.state.action_parameters[index].value;
		return parameter_type.options.length === 0 ? (
			<View style={{padding: '5%'}}>
				<Text style={{fontSize: 20}}>{parameter_type.name}: {current_value}</Text>
				<Slider
					style={{width: 300, height: 30, borderRadius: 50}}
					minimumValue={parameter_type.min}
					maximumValue={parameter_type.max}
					step={parameter_type.step}
					value={current_value}
					onValueChange={ (value)=> {
						let aux = this.state.action_parameters;
						aux[index].value = value;
						this.setState({action_parameters: aux});
					}}
				/>
			</View>
		) : (
			<View style={{width: '60%',margin: '5%', alignSelf: 'center', borderBottomWidth: 2}}>
				<Text style={{fontSize: 20}}>
					{parameter_type.name}
				</Text>
				<Picker
					mode="dialog"
					selectedValue={current_value}
					style={{}}
					onValueChange={(itemValue, itemIndex) => {
						let aux = this.state.action_parameters;
						aux[index].value = itemValue;
						this.setState({action_parameters: aux});
					}}>
					{
						parameter_type['options'].map((item) =>{
							return(
								<Picker.Item  label={item.label} value={item.value} key={item.id}/>
							);
						})
					}
				</Picker>
			</View>
		)
	}

	renderParametersList(){
		const action_type = this.state.device_actions_types[this.state.selected_action_type_index];
		return(
			<View>
				<FlatList
					data={action_type['parameters_types']}
					renderItem={ ({item, index}) => this.renderParameterInput(item, index) }
					keyExtractor={ (item) => String(item.id) }
				/>
				<View style={{width: '50%', alignSelf: 'center'}}>
					<Button
						title={action_type.name}
						onPress={ () => {
							this.requestExecuteAction(action_type.id, this.state.action_parameters);
							// close modal after action button press
							this.setState({
								modal_visible: false
							});
						} }/>
				</View>
			</View>
		)
	}

	renderParametersModal(){
		return(
			<Modal
				visible={this.state.modal_visible}
				onRequestClose={ () => {
					this.setState({modal_visible: false} );
				} }
				animationType="fade"
			>
				{this.state.modal_visible && this.renderParametersList()}
			</Modal>
		)
	}

	renderActionButton(action_type, index){
		return(
			<View style={styleActions.buttonBox}>
				<Button
					onPress={()=>{
						if (action_type['parameters_types'].length === 0) {
							this.requestExecuteAction(action_type.id);
						} else {
							let parameters = action_type['parameters_types'].map( (item) => (
								{
									value: item.default,
									parameter_type_id: item.id
								})
							);
							this.setState({
								action_parameters: parameters,
								selected_action_type_index: index,
								modal_visible: true
							});
						}
					}}
					title={action_type.name}
				/>
			</View>
		)
	}

	render(){
		return (
			<SafeAreaView style={styles.container}>
				<Text
					style={styles.deviceName}>
					Device: {this.state.device_name}
				</Text>
				<Text
					style={styles.deviceStatus}>
					Status: {this.state.device_connected ? 'connected': 'disconnected'}
				</Text>
				<Text style={styles.deviceLastConnection}>
					(Last sync: {this.state.device_last_connection})
				</Text>
				<View style={styleActions.container}>
					<Text
						style={styleActions.title}>
						Remote control
					</Text>
					<View>
						<FlatList
							numColumns={1}
							data={this.state.device_actions_types}
							renderItem={({ item, index}) => this.renderActionButton(item, index)}
							keyExtractor={item => String(item.id)}
						/>
					</View>
				</View>
				{this.renderParametersModal()}
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

/*<Slider
					maximumTrackTintColor="red"
					minimumTrackTintColor="blue"
					minimumValue={parameter.min}
					maximumValue={parameter.max}
					value={parameter.default}
					step={parameter.step}
					onValueChange={(value) => {this.setState({a: value})} }
				/>*/
/*renderParameterOption(option){
		return(
			<TouchableOpacity
				style={styleActions.optionButton}
			>
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

	renderParameter(parameter){
		return(
			<View>
				<Text style={{alignSelf: 'center', fontSize: 24, margin: 25}}>{parameter.name}</Text>
				{this.renderParameterOptions(parameter['options'])}
			</View>
		)
	}*/
