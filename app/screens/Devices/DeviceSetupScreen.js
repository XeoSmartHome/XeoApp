import React from "react";
import {Picker, ScrollView, Text, View} from "react-native";
import {XeoButton} from "../../components/XeoButton";
import NetInfo from '@react-native-community/netinfo';
import * as IntentLauncher from 'expo-intent-launcher';
import {XeoPicker} from "../../components/XeoPicker";
import {XeoTextInput} from "../../components/XeoTextInput";


const WEBSOCKET_EVENT = {
    GET_DEVICE_STATUS: "get_device_status",
    DEVICE_STATUS: "device_status",
    SCAN_NETWORKS: "scan_networks",
    SCAN_NETWORKS_RESULT: "scan_networks_result",
    UPDATE_SETTINGS: "update_settings",
    UPDATE_SETTINGS_RESULT: "update_settings_result",
    REBOOT: "reboot",
};

const WEBSOCKET_CONNECTION_STATUS = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
}

const IP_TYPE = {
    STATIC: 'static',
    DYNAMIC: 'DHCP'
};

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            websocket_connection_status: null,

            device: {
                connected: null,
                ssid: '',
                ip_type: null,
                ip: '',
                gateway: '',
                subnet: '',
                dns: ''
            },

            network_settings: {
                ssid: '',
                password: '',
                ip: '',
                ip_type: IP_TYPE.DYNAMIC,
                gateway: '',
                subnet: '',
                dns: ''
            },

        };
        this.websocket = null;
    }

    componentDidMount() {
        this.unsubscribe_net_info_event_listener = NetInfo.addEventListener(this.onNetworkStateChanged.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe_net_info_event_listener();
        if (this.websocket !== null) {
            this.websocket.close();
        }
    }

    getGatewayIpFromLocalIp(local_ip) {
        let gateway = local_ip.split('.');
        gateway[3] = 1;
        return gateway.join('.');
    }

    onNetworkStateChanged(network_state) {
        this.setState({
            websocket_connection_status: WEBSOCKET_CONNECTION_STATUS.CONNECTING
        })
        const device_access_point_ip = this.getGatewayIpFromLocalIp(network_state.details.ipAddress);
        this.connectToWebsocket(device_access_point_ip);
    }

    connectToWebsocket(device_access_point_ip) {
        device_access_point_ip = '192.168.99.30';
        this.websocket = new WebSocket(`http://${device_access_point_ip}/ws`);
        this.websocket.onopen = this.onWebsocketConnect.bind(this);
        this.websocket.onmessage = this.onWebsocketMessage.bind(this);
        this.websocket.onerror = this.onWebSocketError.bind(this);
        this.websocket.onclose = this.onWebsocketClose.bind(this);
    }

    onWebsocketConnect() {
        this.setState({
            websocket_connection_status: WEBSOCKET_CONNECTION_STATUS.CONNECTED
        });
    }

    onWebsocketMessage({data}) {
        const message = JSON.parse(data);
        switch (message['event']) {
            case WEBSOCKET_EVENT.DEVICE_STATUS:
                this.getDeviceStatusCallback(message);
                break;
            case WEBSOCKET_EVENT.UPDATE_SETTINGS_RESULT:
                this.updateWifiSettingsCallback(message);
                break;
            default:
                console.log('WebsocketEventNotFound');
                break;
        }
    }

    onWebSocketError({message}) {
    }

    onWebsocketClose({code, reason}) {
        this.setState({
            websocket_connection_status: WEBSOCKET_CONNECTION_STATUS.DISCONNECTED
        })
    }

    getDeviceStatusCallback(message) {
        this.setState({
            device: {
                connected: message['connected'],
                ssid: message['ssid'],
                ip_type: message['dhcp'] ? IP_TYPE.DYNAMIC : IP_TYPE.STATIC,
                ip: message['ip'],
                gateway: message['gateway'],
                subnet: message['subnet'],
                dns: message['dns']
            },
            network_settings: {
                ssid: message['ssid'],
                password: '',
                ip: message['ip'],
                ip_type: message['dhcp'] ? IP_TYPE.DYNAMIC : IP_TYPE.STATIC,
                gateway: message['gateway'],
                subnet: message['subnet'],
                dns: message['dns']
            }
        });
    }

    updateWifiSettingsCallback(data) {
        console.log(data);
    }

    websocketSendMessage(event, message) {
        message['event'] = event;
        this.websocket.send(JSON.stringify(message));
    }

    getDeviceStatus() {
        this.websocketSendMessage(WEBSOCKET_EVENT.GET_DEVICE_STATUS, {});
    }

    updateWifiSettings() {
        this.websocketSendMessage(WEBSOCKET_EVENT.UPDATE_SETTINGS, {
            ssid: this.state.device_settings.ssid,
            password: this.state.device_settings.password,
            dhcp: this.state.device_settings.ip_type === IP_TYPE.DYNAMIC,
            ip: this.state.device_settings.ip,
            gateway: this.state.device_settings.gateway,
            subnet: this.state.device_settings.subnet,
            dns: this.state.device_settings.dns
        });
    }

    onUpdateWifiSettingsButtonPress() {
        this.updateWifiSettings();
    }

    onSsidChange(value) {
        this.setState({
            network_settings: {
                ...this.state.network_settings,
                ssid: value
            }
        });
    }

    onPasswordChange(value) {
        this.setState({
            network_settings: {
                ...this.state.network_settings,
                password: value
            }
        });
    }

    onIpTypeChange(value) {
        this.setState({
            network_settings: {
                ...this.state.network_settings,
                ip_type: value
            }
        });
    }

    onDeviceIpChange(value) {
        this.setState({
            network_settings: {
                ...this.state.network_settings,
                ip: value
            }
        });
    }

    onGatewayChange(value) {
        this.setState({
            network_settings: {
                ...this.state.network_settings,
                gateway: value
            }
        });
    }

    onSubnetChange(value) {
        this.setState({
            network_settings: {
                ...this.state.network_settings,
                subnet: value
            }
        });
    }

    renderDeviceStatus(theme, styles) {
        return (
            <View
                style={styles.device_state_container}
            >
                <Text
                    style={[styles.text, styles.device_state_row]}
                >
                    Network: connected to {this.state.device.ssid}
                </Text>
                <Text
                    style={[styles.text, styles.device_state_row]}
                >
                    Device IP: {this.state.device.ip} ({this.state.device.ip_type})
                </Text>
                <Text
                    style={[styles.text, styles.device_state_row]}
                >
                    Gateway: {this.state.device.gateway}
                </Text>
                <Text
                    style={[styles.text, styles.device_state_row]}
                >
                    Subnet: {this.state.device.subnet}
                </Text>
                <Text
                    style={[styles.text, styles.device_state_row]}
                >
                    Dns: {this.state.device.dns}
                </Text>
            </View>
        )
    }

    renderStaticIpSettings(theme, styles) {
        return (
            <View>
                <Text
                    style={styles.input_title}
                >
                    Local ip:
                </Text>
                <XeoTextInput
                    style={styles.text_input}
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'192.168.0.10'}
                    placeholderTextColor={theme.secondaryColor}
                    value={this.state.network_settings.ip}
                    onChangeText={this.onDeviceIpChange.bind(this)}
                />

                <Text
                    style={styles.input_title}
                >
                    Gateway:
                </Text>
                <XeoTextInput
                    style={styles.text_input}
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'192.168.0.1'}
                    placeholderTextColor={theme.secondaryColor}
                    value={this.state.network_settings.gateway}
                    onChangeText={this.onGatewayChange.bind(this)}
                />
                <Text
                    style={styles.input_title}
                >
                    Subnet:
                </Text>
                <XeoTextInput
                    style={styles.text_input}
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'255.255.255.0'}
                    placeholderTextColor={theme.secondaryColor}
                    value={this.state.network_settings.subnet}
                    onChangeText={this.onSubnetChange.bind(this)}
                />
            </View>
        )
    }

    renderNetworkSettings(theme, styles) {
        return (
            <View
                style={styles.network_settings_container}
            >
                <Text
                    style={styles.input_title}
                >
                    Network SSID
                </Text>
                <XeoTextInput
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'Network SSID'}
                    placeholderTextColor={theme.secondaryColor}
                    style={styles.text_input}
                    value={this.state.network_settings.ssid}
                    onChangeText={this.onSsidChange.bind(this)}
                />

                <Text
                    style={styles.input_title}
                >
                    Network password
                </Text>
                <XeoTextInput
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'Network SSID'}
                    placeholderTextColor={theme.secondaryColor}
                    style={styles.text_input}
                    secureTextEntry={true}
                    value={this.state.network_settings.password}
                    onChangeText={this.onPasswordChange.bind(this)}
                />

                <Text
                    style={styles.input_title}
                >
                    Ip settings:
                </Text>
                <XeoPicker
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    style={styles.text_input}
                    selectedValue={this.state.network_settings.ip_type}
                    onValueChange={this.onIpTypeChange.bind(this)}
                >
                    <Picker.Item label={'Dynamic ip'} value={IP_TYPE.DYNAMIC}/>
                    <Picker.Item label={'Static ip'} value={IP_TYPE.STATIC}/>
                </XeoPicker>

                {
                    this.state.network_settings.ip_type === IP_TYPE.STATIC
                    &&
                    this.renderStaticIpSettings(theme, styles)
                }

                <View
                    style={styles.button}
                >
                    <XeoButton
                        title={'Update settings'}
                        onPress={this.onUpdateWifiSettingsButtonPress.bind(this)}
                        colors={{
                            text: theme.lightColor,
                            background: theme.primaryColor
                        }}
                    />
                </View>
            </View>
        )
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Style(theme);

        return (
            <ScrollView
                style={styles.screen}
            >
                <Text
                    style={styles.title}
                >
                    Status: {this.state.websocket_connection_status}
                </Text>

                {
                    this.state.websocket_connection_status === WEBSOCKET_CONNECTION_STATUS.CONNECTED &&
                    <View>
                        {
                            this.renderDeviceStatus(theme, styles)
                        }
                        {
                            this.renderNetworkSettings(theme, styles)
                        }
                    </View>
                }
            </ScrollView>
        )

    }

}


const Style = (theme) => ({
    screen: {
        padding: '3%',
        backgroundColor: theme.screenBackgroundColor,
    },
    title: {
        color: theme.textColor,
        fontSize: 20,
        borderBottomWidth: 2,
        borderColor: theme.primaryColor,
        padding: '3%',
    },
    text_input: {
        marginVertical: 10
    },
    input_title: {
        color: theme.textColor,
        fontSize: 16,
    },
    button: {
        padding: 10
    },
    text: {
        color: theme.textColor
    },
    device_state_container: {
        borderBottomWidth: 2,
        borderColor: theme.primaryColor,
        padding: '3%'
    },
    device_state_row: {
        fontSize: 16,
        paddingVertical: 2
    },
    network_settings_container: {
        padding: '3%'
    }
});