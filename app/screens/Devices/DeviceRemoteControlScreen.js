import React from "react";
import I18n from 'i18n-js';
import {
    Image,
    Modal,
    ScrollView, Slider,
    Text,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import io from "socket.io-client";
import {Picker} from "@react-native-picker/picker";
import {API} from "../../api/api";


const t = (key) => I18n.t('device_remote_control.' + key);
//let socket_io = io('https://xeosmarthome.com', {transports: ['websocket'], timeout: 30000});


const ActionButton = ({theme, action_type, onPress}) => {
    return (
        <TouchableOpacity
            style={[actions_style.touchable_opacity, {
                backgroundColor: theme.primaryColor,
            }]}
            disabled={false}
            onPress={onPress}
        >
            <Text
                style={[actions_style.text, {
                    color: theme.lightColor,
                }]}
            >
                {action_type['name']}
            </Text>
        </TouchableOpacity>
    )
}

const actions_style = StyleSheet.create({
    touchable_opacity: {
        width: '70%',
        alignSelf: "center",
        marginTop: 20,
        padding: 6,
        borderRadius: 8,
    },
    text: {
        alignSelf: "center",
        fontSize: 18
    }
});


export default class DeviceRemoteControlScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.device_name === undefined ? '' : navigation.state.params.device_name,
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                navigation.navigate('device_alarms', {device_id: navigation.state.params.device_id})
            }}>
                <MaterialCommunityIcons name="clock-outline" size={40} color={screenProps.theme.textColor}
                                        style={{marginHorizontal: 10}}/>
            </TouchableOpacity>
        )
    });

    constructor() {
        super();
        this.state = {
            device_id: 0,
            device_name: '',
            device_connected: null,
            device_active: null,
            device_actions_types: [],
            device_statuses: [],

            modal_visible: false,
            selected_action_type_id: -1,

            action_parameters: []
        }
    }

    componentDidMount() {
        this.loadDevice();
        //this.setWebSocketHandler();
    }

    loadDeviceCallback(response) {
        const {device} = response;
        //console.warn(device);
        this.setState({
            device_id: device['id'],
            device_name: device['name'],
            device_connected: device['connected'],
            device_actions_types: device['actions_types'],
            device_statuses: device['statuses']
        });
        this.props.navigation.setParams({
            device_name: device['name']
        });
    }

    loadDevice() {
        API.devices.getDevice({
            id: this.props.navigation.state.params.device_id
        }).then(
            this.loadDeviceCallback.bind(this)
        ).catch(
            (error) =>
                console.warn(error)
        );
    }

    setWebSocketHandler() {
        socket_io.off().on('message', (message) => {
            try {
                if (message['device_id'] !== this.state.device_id)
                    return;

                let status_index = this.state.device_statuses.findIndex((status_type) => status_type['id'] === message['status_type_id']);
                let statuses = this.state.device_statuses;
                statuses[status_index]['value'] = message['value'];
                this.setState({
                    device_statuses: statuses
                })
            } catch (error) {

            }
        });
    }

    executeActionCallback(response) {
        if (response.status === 200)
            ToastAndroid.show('Action sent', ToastAndroid.SHORT);
    }

    executeAction(action_type_id: number, parameters = []) {
        API.devices.callAction({
            device_id: this.state.device_id,
            action_type_id: action_type_id,
            parameters: parameters
        }).then(
            this.executeActionCallback.bind(this)
        ).catch(
            (error) => console.warn(error)
        );
    }

    onActionButtonPress(action_type) {
        if (action_type['parameters_types'].length === 0) {
            this.executeAction(action_type['id'])
        } else {
            let parameters = action_type['parameters_types'].map((item) => (
                {
                    value: item.default,
                    parameter_type_id: item.id
                })
            );
            this.setState({
                modal_visible: true,
                selected_action_type_id: action_type['id'],
                action_parameters: parameters
            });
        }
    }

    renderActionButton(action_type, index) {
        const {theme} = this.props.screenProps;
        return (
            <View key={'device_action_type_' + index}>
                <ActionButton
                    theme={theme}
                    action_type={action_type}
                    onPress={() => {
                        this.onActionButtonPress(action_type);
                    }}
                />
            </View>
        )
    }

    renderDeviceStatus(status, index) {
        const {theme} = this.props.screenProps;
        const option = status['options'].find((option) => option.value === status.value);
        return (
            <Text
                key={'device_status_' + index}
                style={{
                    color: theme.textColor,
                    fontSize: 18
                }}
            >
                {status.label}: {option?.label || status.value}{status.unit}
            </Text>
        )
    }

    renderDeviceStatuses() {
        const {theme} = this.props.screenProps;
        if (this.state.device_statuses.length === 0) {
            return null;
        }
        return (
            <View
                style={{
                    borderBottomWidth: 2,
                    borderColor: theme.textColor,
                    paddingVertical: 10,
                }}
            >
                {
                    this.state.device_statuses.map(this.renderDeviceStatus.bind(this))
                }
            </View>
        )
    }

    renderDeviceConnectionStatus() {
        const {theme} = this.props.screenProps;
        return (
            <Text
                style={{
                    color: theme.textColor,
                    fontSize: 20,
                    borderBottomWidth: 2,
                    borderColor: theme.textColor,
                    paddingBottom: 10
                }}
            >
                Status: <Text
                style={{
                    color: this.state.device_connected === theme.warningColor ? '#' : this.state.device_connected ? theme.successColor : theme.dangerColor
                }}
            >
                {
                    this.state.device_connected === null ? '' : this.state.device_connected ? 'connected' : 'disconnected'
                }
            </Text>
            </Text>
        )
    }

    renderParameterInput(parameter_type, index) {
        const {theme} = this.props.screenProps;
        const slider_or_picker = parameter_type['options'].length === 0 ? 'slider' : 'picker';
        const current_value = this.state.action_parameters[index].value;
        return (
            <View
                key={'parameter_input_' + index}
                style={{
                    marginBottom: '10%',
                }}
            >
                {
                    slider_or_picker === 'slider' ? (
                        <View>
                            <Text
                                style={{
                                    color: theme.textColor,
                                    fontSize: 18,
                                    marginBottom: 20,
                                    marginHorizontal: 20
                                }}
                            >
                                {parameter_type['name']}: {current_value}{parameter_type['unit']}
                            </Text>
                            <Slider
                                style={{width: 300, height: 30, borderRadius: 50}}
                                thumbTintColor={theme.primaryColor}
                                minimumTrackTintColor={theme.textColor}
                                maximumTrackTintColor={theme.textColor}
                                minimumValue={parameter_type.min}
                                maximumValue={parameter_type.max}
                                step={parameter_type.step}
                                value={current_value}
                                onValueChange={(value) => {
                                    let aux = this.state.action_parameters;
                                    aux[index].value = value;
                                    this.setState({action_parameters: aux});
                                }}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    color: theme.textColor,
                                    fontSize: 18,
                                    marginHorizontal: 20
                                }}
                            >
                                {parameter_type['name']}
                            </Text>
                            <Picker
                                mode='dialog'
                                selectedValue={current_value}
                                style={{
                                    color: theme.textColor,
                                    borderWidth: 1
                                }}
                                onValueChange={(itemValue, itemIndex) => {
                                    let aux = this.state.action_parameters;
                                    aux[index].value = itemValue;
                                    this.setState({action_parameters: aux});
                                }}>
                                {
                                    parameter_type['options'].map((item) => {
                                        return (
                                            <Picker.Item label={item.label} value={item.value} key={item.id}/>
                                        );
                                    })
                                }
                            </Picker>
                        </View>
                    )
                }
            </View>
        )
    }

    renderParametersInput() {
        const {theme} = this.props.screenProps;
        const action_type = this.state.device_actions_types.find((e) => e['id'] === this.state.selected_action_type_id)
        return (
            <Modal
                visible={this.state.modal_visible}
                onRequestClose={() => {
                    this.setState({modal_visible: false});
                }}
                animationType="fade"
            >
                {
                    this.state.modal_visible &&
                    <ScrollView
                        style={{
                            backgroundColor: theme.screenBackgroundColor,
                            padding: '3%',
                        }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'center'
                        }}
                    >
                        {
                            action_type['parameters_types'].map(this.renderParameterInput.bind(this))
                        }
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.primaryColor,
                                padding: 6,
                                alignSelf: "center",
                                borderRadius: 6,
                                width: '75%'
                            }}
                            onPress={() => {
                                // call server api to send an action to device
                                this.executeAction(action_type['id'], this.state.action_parameters);
                                // close modal after action in send to server
                                this.setState({
                                    modal_visible: false
                                });
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.textColor,
                                    fontSize: 18,
                                    alignSelf: "center"
                                }}
                            >
                                {
                                    action_type['name']
                                }
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </Modal>
        )
    }

    render() {
        const {theme} = this.props.screenProps;
        return (
            <ScrollView
                style={{
                    backgroundColor: theme.screenBackgroundColor,
                }}
                contentContainerStyle={[styles.screen_content_container]}
            >
                {
                    this.renderDeviceConnectionStatus()
                }
                {
                    this.renderDeviceStatuses()
                }
                {
                    this.state.device_actions_types.map(this.renderActionButton.bind(this))
                }
                {
                    this.renderParametersInput()
                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    screen_content_container: {
        padding: '4%'
    }
});
