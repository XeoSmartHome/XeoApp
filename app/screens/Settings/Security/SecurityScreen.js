import React, {Component} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// noinspection ES6CheckImport
import I18n from "i18n-js";


const t = (key) => I18n.t('security.' + key)


export default class SecurityScreen extends Component {
    constructor() {
        super();
        this.onChangePasswordButtonPress = this.onChangePasswordButtonPress.bind(this);
        this.onAppPinButtonPress = this.onAppPinButtonPress.bind(this);
    }

    onChangePasswordButtonPress() {
        this.props.navigation.navigate('change_password');
    }

    onAppPinButtonPress() {
        this.props.navigation.navigate('pin_settings')
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        return (
            <ScrollView style={styles.screen}>

                <TouchableOpacity
                    style={styles.row}
                    onPress={this.onChangePasswordButtonPress}
                >
                    <Text style={styles.buttonText}>
                        {t('change_password')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.row}
                    onPress={this.onAppPinButtonPress}
                >
                    <Text style={styles.buttonText}>
                        {t('app_pin')}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}


const Styles = (theme) => ({
    screen: {
        backgroundColor: theme.screenBackgroundColor
    },
    row: {
        paddingVertical: '3%',
        paddingHorizontal: '1%',
        width: '94%',
        marginHorizontal: '3%',
    },
    button: {
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 20,
        marginLeft: 8,
        color: theme.textColor
    }
});
