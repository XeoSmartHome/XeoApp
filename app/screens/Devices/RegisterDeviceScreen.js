import React, {Component, useEffect, useState} from "react";
import {
    Modal,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {BarCodeScanner} from 'expo-barcode-scanner';
import {API} from "../../api/api";
import {translator} from "../../lang/translator";
import {XeoTextInput} from "../../components/XeoTextInput";
import {XeoButton} from "../../components/XeoButton";


const t = translator('register_device');


export default class RegisterDeviceScreen extends Component {
    constructor() {
        super();
        this.state = {
            new_device_name: '',
            new_device_serial: '',
            showQRCodeScanner: false
        };
        this.registerDeviceCallback = this.registerDeviceCallback.bind(this);
    }

    registerDeviceCallback(response) {
        console.log(response);
        if (response.status === 200) {
            this.props.navigation.goBack();
        }
        if (response.status === 400) {
            switch (response.error) {
                case 'ValueError':
                    ToastAndroid.show("value error", ToastAndroid.LONG);
                    break;
                case 'DeviceTypeNotFound':
                    ToastAndroid.show("Serial invalid", ToastAndroid.LONG);
                    break;
            }
        }
    }

    registerDevice() {
        API.devices.registerDevice({
            name: this.state.new_device_name,
            serial: this.state.new_device_serial
        }).then(
            this.registerDeviceCallback
        ).catch(
            (error) => {
                console.warn(error);
            }
        );
    }

    onAddDevicePress() {
        this.registerDevice();
    }

    openQRCodeScanner() {
        BarCodeScanner.requestPermissionsAsync().then((status) => {
            if (status.granted)
                this.setState({showQRCodeScanner: true});
        });
    }

    onScanQrCodeCancelButtonPress() {
        this.setState({
            showQRCodeScanner: false
        });
    }

    renderQRCodeScannerModal(theme, styles) {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.showQRCodeScanner}
                onRequestClose={() => {
                    this.setState({showQRCodeScanner: false})
                }}
            >
                <View style={styles.barcodeScannerContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={({type, data}) => {
                            this.setState({showQRCodeScanner: false, new_device_serial: data})
                        }}
                        style={{flex: 1}}
                    />

                    <View
                        style={styles.cancelQrCodeScanButton}
                    >
                        <XeoButton
                            title={t('close_qr_code_scanner')}
                            colors={{
                                text: theme.lightColor,
                                background: theme.dangerColor
                            }}
                            onPress={this.onScanQrCodeCancelButtonPress.bind(this)}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        const add_device_button_enabled = this.state.new_device_name.length !== 0 && this.state.new_device_serial.length !== 0;
        return (
            <ScrollView style={styles.screen}>
                <Text
                    style={styles.inputHint}
                >
                    {t('name')} <Text style={{fontSize: 16}}>({t('name_info')})</Text>
                </Text>
                <XeoTextInput
                    style={styles.textInput}
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={t('device_name_placeholder')}
                    placeholderTextColor={theme.placeholderTextColor}
                    autoCorrect={true}
                    autoCapitalize='sentences'
                    value={this.state.new_device_name}
                    onChangeText={text => this.setState({new_device_name: text})}
                />
                <Text style={[styles.inputHint, {
                    color: theme.textColor,
                }]}>
                    {t('serial')} <Text style={{fontSize: 16}}>({t('serial_info')})</Text>
                </Text>
                <XeoTextInput
                    style={styles.textInput}
                    colors={{
                        text: theme.textColor,
                        border: theme.primaryColor
                    }}
                    placeholder={t('device_serial_placeholder')}
                    placeholderTextColor={theme.placeholderTextColor}
                    autoCorrect={true}
                    autoCapitalize='none'
                    value={this.state.new_device_serial}
                    onChangeText={text => this.setState({new_device_serial: text})}
                />
                <View style={styles.scanQrCodeButtonContainer}>
                    <XeoButton
                        title={t('scan_qr_code_button')}
                        colors={{
                            text: theme.lightColor,
                            background: theme.primaryColor
                        }}
                        onPress={this.openQRCodeScanner.bind(this)}
                    />
                </View>
                <Text style={styles.qrCodeScanDetails}>
                    {t('qr_code_info')}
                </Text>
                <View style={{marginTop: '10%'}}>
                    <XeoButton
                        style={{
                            opacity: add_device_button_enabled ? 1 : theme.buttonDisabledOpacity
                        }}
                        title={t('confirm_button')}
                        colors={{
                            text: theme.lightColor,
                            background: theme.primaryColor
                        }}
                        onPress={this.onAddDevicePress.bind(this)}
                        disabled={!add_device_button_enabled}
                    />
                </View>

                {this.renderQRCodeScannerModal(theme, styles)}

            </ScrollView>
        )
    }
}


const Styles = (theme) => ({
    screen: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: theme.screenBackgroundColor
    },
    inputHint: {
        fontSize: 22,
        margin: 5,
        color: theme.textColor
    },
    textInput: {
        margin: 5,
        marginBottom: 20,
    },
    scanQrCodeButtonContainer: {
        width: '50%',
        marginLeft: 5
    },
    barcodeScannerContainer:{
        backgroundColor: theme.screenBackgroundColor, flex: 1
    },
    cancelQrCodeScanButton: {
        marginVertical: '5%',
        width: '75%',
        alignSelf: "center"
    },
    qrCodeScanDetails: {
        padding: 10,
        fontSize: 16,
        color: theme.textColor
    }
});
