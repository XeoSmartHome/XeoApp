import React from "react";
import I18n from 'i18n-js';
import {
    View,
    StyleSheet, Text, TouchableOpacity,
} from "react-native";
import {ProgressBar} from "react-native-paper";


const t = (key) => I18n.t(`dashboard.${key}`);


export default class DashboardScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            view_mode: 'list',
            screens: [
                {
                    id: 1,
                    shortcuts: [
                        {
                            id: 1,
                            device_name: 'Jaluzele electrice',
                            type: 'ACTION',
                            action: {
                                name: 'open'
                            }
                        },
                        {
                            id: 2,
                            device_name: 'Jaluzele electrice',
                            type: 'SENSOR',
                            sensor: {
                                name: 'Temperature',
                                unit: '`C',
                                value: 0.5
                            }
                        },
                        {
                            id: 3,
                            device_name: 'Sistem irigat',
                            type: 'ACTION',
                            action: {
                                name: 'Irrigate'
                            }
                        }
                    ]
                }
            ]
        }
        this.renderShortcut = this.renderShortcut.bind(this);
        this.renderAction = this.renderAction.bind(this);
        this.renderSensor = this.renderSensor.bind(this);
    }

    componentDidMount() {

    }

    renderSensor(shortcut: { id: number, sensor: { name: string, value: number, unit: string } }) {
        const {theme} = this.props.screenProps;
        return (
            <View
                key={`shortcut-${shortcut.id}`}
                style={[
                    styles.shortcut_container, {
                        borderColor: theme.primaryColor,
                        flexDirection: 'column'
                    }
                ]}
            >
                <Text
                    style={[styles.sensor_name, {
                        color: theme.textColor
                    }]}
                >
                    {shortcut.sensor.name}: {shortcut.sensor.value}{shortcut.sensor.unit}
                </Text>
                <ProgressBar
                    color={theme.primaryColor}
                    style={[styles.progress_bar]}
                    progress={shortcut.sensor.value}
                />
            </View>
        )
    }

    renderAction(shortcut) {
        const {theme} = this.props.screenProps;
        return (
            <View
                key={`shortcut-${shortcut.id}`}
                style={[
                    styles.shortcut_container, {
                        borderColor: theme.primaryColor
                    }
                ]}
            >
                <Text
                    style={[
                        styles.shortcut_device_name, {
                            color: theme.textColor
                        }
                    ]}
                >
                    {
                        shortcut.device_name
                    }
                </Text>
                <TouchableOpacity
                    style={[
                        styles.shortcut_action_button, {
                            backgroundColor: theme.primaryColor
                        }
                    ]}
                >
                    <Text
                        style={[
                            styles.shortcut_action_button_text, {
                                color: theme.lightColor
                            }
                        ]}
                    >
                        {
                            shortcut.action.name
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderShortcut(shortcut) {
        const type = {
            'ACTION': this.renderAction,
            'SENSOR': this.renderSensor
        };
        return type[shortcut.type](shortcut);
    }

    render() {
        const {theme} = this.props.screenProps;
        return (
            <View
                style={[
                    styles.screen, {
                        backgroundColor: theme.screenBackgroundColor
                    }
                ]}
            >
                {
                    this.state.screens[0].shortcuts.map(this.renderShortcut)
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    screen: {
        padding: '5%',
        flex: 1
    },
    shortcut_container: {
        borderWidth: 2,
        padding: 10,
        marginVertical: '2%',
        borderRadius: 8,
        flexDirection: 'row',
    },
    shortcut_device_name: {
        flex: 1,
        fontSize: 16,
        alignSelf: 'center'
    },
    shortcut_action_button: {
        flex: 1,
        padding: 6,
        borderRadius: 10,
        height: 38,
        alignSelf: 'center'
    },
    shortcut_action_button_text: {
        alignSelf: 'center',
        fontSize: 18,
    },
    sensor_name: {
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 4
    },
    progress_bar: {
        height: 16,
    }
});
