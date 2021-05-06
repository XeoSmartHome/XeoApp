import React from "react";
import {ActivityIndicator, StatusBar, Text, TextInput, View} from "react-native";
import {XeoButton} from "../../components/XeoButton";
import NetInfo from '@react-native-community/netinfo';

const WEBSOCKET_EVENT = {
    UPDATE_WIFI_SETTINGS: 'update_wifi_settings',
    UPDATE_WIFI_SETTINGS_CALLBACK: 'update_wifi_settings_callback'
};


export default class extends React.Component{
    constructor() {
        super();
        this.state = {
            websocket_connected: false,
            wifi_ssid: 'Paltinis2',
            wifi_password: '',
            wifi_dhcp: null,
            wifi_local_ip: '',
            wifi_gateway: '',
            wifi_subnet: ''
        }
        this.onConnectToWifiButtonPress = this.onConnectToWifiButtonPress.bind(this);
        //this.checkIfIsXeoDeviceCallback = this.checkIfIsXeoDeviceCallback.bind(this);
    }

    componentDidMount() {
        this.websocket = new WebSocket('http://192.168.99.30/ws');

        this.websocket.onopen = this.onWebsocketConnect.bind(this);
        this.websocket.onmessage = this.onWebsocketMessage.bind(this);
        this.websocket.onerror = this.onWebSocketError.bind(this);
        this.websocket.onclose = this.onWebsocketClose.bind(this);

        this.unsubscrive_net_info_event_listener = NetInfo.addEventListener(this.onNetworkStateChanged.bind(this));

    }

    componentWillUnmount() {
        this.websocket.close();
        this.unsubscrive_net_info_event_listener();
    }

    getGatewayIpFromLocalIp(local_ip) {
        let gateway = local_ip.split('.');
        gateway[3] = 1;
        return gateway.join('.');
    }

    checkIfIsXeoDeviceCallback(response) {
        response.text().then(
            (response) => {
                console.log(response);
            }
        )
    }

    checkIfIsXeoDevice(gateway_ip) {
        fetch(`http://${gateway_ip}`).then(
            this.checkIfIsXeoDeviceCallback
        ).catch(
            (error) => {
                console.log(error);
            }
        )
        console.log(gateway_ip);
    }

    onNetworkStateChanged(state) {
        const gateway_ip = this.getGatewayIpFromLocalIp(state.details.ipAddress);
        this.checkIfIsXeoDevice(gateway_ip);
    }

    onWebsocketConnect() {
        this.setState({
            websocket_connected: true
        });
    }

    onWebsocketMessage({data}) {
        console.log('message received:', data);
        switch (data['event']) {
            case WEBSOCKET_EVENT.UPDATE_WIFI_SETTINGS_CALLBACK:
                break;
            default:
                break;
        }
    }

    onWebSocketError({message}) {
    }

    onWebsocketClose({code, reason}) {
    }
    
    onConnectToWifiButtonPress() {
        console.log('button pressed');
        this.websocketSendMessage({
            event: 'update_wifi_settings',
            ssid: this.state.wifi_ssid,
            password: this.state.wifi_password,
            dhcp: this.state.wifi_dhcp,
            local_ip: this.state.wifi_local_ip,
            gateway: this.state.wifi_gateway,
            subnet: this.state.wifi_subnet
        });
    }

    websocketSendMessage(message){
        this.websocket.send(JSON.stringify(message));
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Style(theme);
        return (
            <View
                style={styles.screen}
            >
                <StatusBar hidden={false}/>
                <Text>Setup screen</Text>
                {
                    this.state.websocket_connected === false &&
                        <View>
                            <ActivityIndicator
                                size={50}
                                color={theme.primaryColor}
                            />
                            <Text>
                                CONNECTING
                            </Text>
                        </View>
                }
                <TextInput
                    style={styles.text_input}
                    editable={true}
                    value={this.state.wifi_ssid}
                    onChangeText={(text) => this.setState({wifi_ssid: text})}
                />
                <TextInput
                    placeholder={'password'}
                    style={styles.text_input}
                    editable={true}
                    value={this.state.wifi_password}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({wifi_password: text})}
                />
                <XeoButton
                    title={'Connect'}
                    onPress={this.onConnectToWifiButtonPress}
                    colors={{
                        text: theme.lightColor,
                        background: theme.primaryColor
                    }}
                />
            </View>
        );
    }
}


const Style = (theme) => ({
   screen: {
       padding: '3%'
   },
    text_input: {
       borderWidth: 2,
        borderColor: theme.primaryColor,
        padding: 6,
        margin: 10
    }
});