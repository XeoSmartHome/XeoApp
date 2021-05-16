import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView} from "react-native";
import {
    BOOTSTRAP_COLOR_LIGHT,
    BOOTSTRAP_COLOR_PRIMARY,
} from "../../../themes/bootstrap_colors";
import {API} from "../../../api/api";
import {translator} from "../../../lang/translator";
import {XeoTextInput} from "../../../components/XeoTextInput";
import {XeoButton} from "../../../components/XeoButton";


const t = translator('change_password');


export default class ChangePasswordScreen extends Component {
    constructor() {
        super();
        this.state = {
            current_password: '',
            new_password: '',
            confirm_new_password: '',
            wrong_password: null,
            empty_password: true,
            password_to_weak: null,
            password_dont_match: null,
            password_updated: false
        }
        this.onUpdatePasswordButtonPress = this.onUpdatePasswordButtonPress.bind(this);
    }

    checkNewPasswords(new_password, confirm_new_password) {
        this.setState({
            password_updated: false,
            password_to_weak: new_password.length < 8,
            password_dont_match: new_password !== confirm_new_password
        })
    }

    updatePasswordCallback(response) {
        switch (response.status) {
            case 200:
                this.setState({
                    current_password: '',
                    new_password: '',
                    confirm_new_password: '',
                    wrong_password: null,
                    empty_password: true,
                    password_to_weak: null,
                    password_dont_match: null,
                    password_updated: true
                })
                break;
            case 400:
                this.setState({
                    wrong_password: true
                });
                break;
        }
    }

    updatePassword() {
        API.account.updatePassword({
            current_password: this.state.current_password,
            new_password: this.state.new_password
        }).then(
            this.updatePasswordCallback.bind(this)
        ).catch(
            (error) => {
                console.warn(error);
            }
        )
    }

    getMessage() {
        if (this.state.wrong_password) {
            return t('errors.wrong_password');
        }
        if (this.state.password_to_weak === true) {
            return t('errors.password_to_weak');
        }
        if (this.state.password_dont_match === true) {
            return t('errors.passwords_dont_match');
        }
        if (this.state.password_updated) {
            return t('password_updated')
        }
    }

    onUpdatePasswordButtonPress() {
        this.updatePassword();
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        const text_input_colors = {
            text: theme.textColor,
            border: theme.primaryColor
        }

        const button_disabled = this.state.wrong_password || this.state.empty_password || this.state.password_to_weak ||
            this.state.password_dont_match || this.state.new_password.length === 0;

        return (
            <ScrollView
                style={{
                    backgroundColor: theme.screenBackgroundColor
                }}
            >
                <XeoTextInput
                    style={styles.textInput}
                    colors={text_input_colors}
                    value={this.state.current_password}
                    onChangeText={(value) => {
                        this.setState({
                            current_password: value,
                            wrong_password: false,
                            empty_password: value === '',
                            password_updated: false
                        });
                    }}
                    placeholder={t('current_password')}
                    placeholderTextColor={theme.placeholderTextColor}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                />

                <XeoTextInput
                    style={styles.textInput}
                    colors={text_input_colors}
                    value={this.state.new_password}
                    onChangeText={(value) => {
                        this.setState({new_password: value});
                        this.checkNewPasswords(value, this.state.confirm_new_password);
                    }}
                    placeholder={t('new_password')}
                    placeholderTextColor={theme.placeholderTextColor}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                />

                <XeoTextInput
                    style={styles.textInput}
                    colors={text_input_colors}
                    value={this.state.confirm_new_password}
                    onChangeText={(value) => {
                        this.setState({confirm_new_password: value});
                        this.checkNewPasswords(this.state.new_password, value);
                    }}
                    placeholder={t('confirm_new_password')}
                    placeholderTextColor={theme.placeholderTextColor}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text
                    style={[styles.warningText, {
                        color: this.state.password_updated ? theme.successColor : theme.dangerColor
                    }]}
                >
                    {this.getMessage()}
                </Text>

                <View
                    style={styles.updateButtonContainer}
                >
                    <XeoButton
                        title={t('save_button')}
                        colors={{
                            text: theme.lightColor,
                            background: theme.primaryColor
                        }}
                        disabled={button_disabled}
                        onPress={this.onUpdatePasswordButtonPress}
                    />
                </View>

            </ScrollView>
        )
    }
}


const Styles = (theme) => ({
    textInput: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 20,
    },
    updateButtonContainer: {
        width: '35%',
        alignSelf: 'flex-end',
        marginRight: '5%'
    },
    warningText: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20
    }
});