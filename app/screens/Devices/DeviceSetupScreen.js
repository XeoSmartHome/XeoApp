import React from "react";
import {Picker, ScrollView, Text, View} from "react-native";
import {XeoButton} from "../../components/XeoButton";
import NetInfo from '@react-native-community/netinfo';
import * as IntentLauncher from 'expo-intent-launcher';
import {XeoPicker} from "../../components/XeoPicker";
import {XeoTextInput} from "../../components/XeoTextInput";


const WEBSOCKET_EVENT = {
    WIFI_SETTINGS: 'wifi_settings',
    UPDATE_WIFI_SETTINGS: 'update_wifi_settings',
    UPDATE_WIFI_SETTINGS_CALLBACK: 'update_wifi_settings_callback',

};

const WEBSOCKET_CONNECTION_STATUS = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
}

const IP_TYPE = {
    STATIC: 'static',
    DYNAMIC: 'dynamic'
};

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            websocket_connection_status: null,
            ip_type: IP_TYPE.DYNAMIC,
            device_current_ip: '',
            device_ip: '',
            gateway: '',
            subnet: '',
            dns_1: '',
            dns_2: '',

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
        console.log('connecting to', device_access_point_ip);
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
            case WEBSOCKET_EVENT.UPDATE_WIFI_SETTINGS_CALLBACK:
                this.updateWifiSettingsCallback(message);
                break;
            case WEBSOCKET_EVENT.WIFI_SETTINGS:
                this.setState({
                    //wifi_ssid: message['ssid'],
                    ip_type: message['dhcp'] ? IP_TYPE.DYNAMIC : IP_TYPE.STATIC,
                    device_ip: message['ip'],
                    gateway: message['gateway'],
                    subnet: message['subnet'],
                    dns_1: message['dns_1'],
                    dns_2: message['dns_2']
                });
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

    websocketSendMessage(event, message) {
        message['event'] = event;
        this.websocket.send(JSON.stringify(message));
    }

    updateWifiSettings() {
        this.websocketSendMessage(WEBSOCKET_EVENT.UPDATE_WIFI_SETTINGS, {
            ssid: this.state.device_settings.wifi_ssid,
            password: this.state.device_settings.wifi_password,
            dhcp: this.state.ip_type === IP_TYPE.DYNAMIC
        });
    }

    updateWifiSettingsCallback(data) {
        console.log(data);
    }

    onUpdateWifiSettingsButtonPress() {
        this.updateWifiSettings();
    }

    onIpTypeChange(value) {
        console.log(value);
        this.setState({
            ip_type: value
        });
    }

    onDeviceIpChange(value) {
        this.setState({
            device_ip: value
        });
    }

    onGatewayChange(value) {
        this.setState({
            gateway: value
        });
    }

    onSubnetChange(value) {
        this.setState({
            subnet: value
        })
    }

    renderStaticIpSettings(theme, styles) {
        return (
            <View>
                <Text
                    style={styles.input_title}
                >
                    Device ip:
                </Text>
                <XeoTextInput
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'Device ip'}
                    placeholderTextColor={theme.secondaryColor}
                    style={styles.text_input}
                    onChangeText={this.onDeviceIpChange.bind(this)}
                />

                <Text
                    style={styles.input_title}
                >
                    Gateway ip:
                </Text>
                <XeoTextInput
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={'Gateway ip'}
                    placeholderTextColor={theme.secondaryColor}
                    style={styles.text_input}
                    onChangeText={this.onGatewayChange.bind(this)}
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
                    placeholder={'Subnet'}
                    placeholderTextColor={theme.secondaryColor}
                    style={styles.text_input}
                    onChangeText={this.onSubnetChange.bind(this)}
                />
            </View>
        )
    }

    renderDeviceStatus(theme, styles) {
        return (
            <View
                style={{
                    borderBottomWidth: 2,
                    borderColor: theme.primaryColor,
                    padding: 10
                }}
            >
                <Text
                    style={[styles.text]}
                >
                    Network: connected to Paltinis2
                </Text>
                <Text
                    style={[styles.text]}
                >
                    Device IP: {this.state.device_ip} ({this.state.ip_type})
                </Text>
                <Text
                    style={[styles.text]}
                >
                    Gateway: {this.state.gateway}
                </Text>
                <Text
                    style={[styles.text]}
                >
                    Subnet: {this.state.subnet}
                </Text>
                <Text
                    style={[styles.text]}
                >
                    DNS 1: {this.state.dns_1}
                </Text>
                <Text
                    style={[styles.text]}
                >
                    DNS 2: {this.state.dns_2}
                </Text>
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
                        />

                        <Text
                            style={styles.input_title}
                        >
                            DHCP:
                        </Text>
                        <XeoPicker
                            colors={{
                                text: theme.lightColor,
                                border: theme.primaryColor
                            }}
                            style={styles.text_input}
                            selectedValue={this.state.ip_type}
                            onValueChange={this.onIpTypeChange.bind(this)}
                        >
                            <Picker.Item label={'Dynamic ip'} value={IP_TYPE.DYNAMIC}/>
                            <Picker.Item label={'Static ip'} value={IP_TYPE.STATIC}/>
                        </XeoPicker>

                        {
                            this.state.ip_type === IP_TYPE.STATIC && this.renderStaticIpSettings(theme, styles)
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
        paddingVertical: 10,
    },
    text_input: {
        margin: 10
    },
    input_title: {
        color: theme.textColor,
        fontSize: 18,
    },
    button: {
        padding: 10
    },
    text: {
        color: theme.textColor
    }
});