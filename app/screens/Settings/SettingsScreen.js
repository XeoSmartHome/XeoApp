import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
// noinspection ES6CheckImport
import {FontAwesome5, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {translator} from "../../lang/translator";


const SettingsOption = ({title, icon, onPress, theme}) => {
    const styles = Styles(theme);
    return (
        <View style={styles.row}>
            <TouchableOpacity style={styles.button}
                              onPress={onPress}
            >
                {icon}
                <Text style={styles.button_text}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
};


const t = translator('settings');

export default class SettingsScreen extends Component {

    constructor() {
        super();
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        return (
            <ScrollView
                style={styles.screen}
            >
                <SettingsOption
                    theme={theme}
                    title={t('account')}
                    icon={<Icon
                        name='account-circle-outline'
                        type='material-community'
                        size={25}
                        color={theme.textColor}
                    />}
                    onPress={() => {
                        this.props.navigation.navigate('account_settings')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={'Rooms'}
                    icon={<FontAwesome5
                        name="home"
                        size={25}
                        color={theme.textColor}
                    />}
                    onPress={() => {
                        this.props.navigation.navigate('rooms_settings')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={t('notifications')}
                    icon={<Icon
                        name='notifications-none'
                        type='ionicons'
                        size={26}
                        color={theme.textColor}
                    />}
                    onPress={() => {
                        this.props.navigation.navigate('notifications_settings')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={t('security')}
                    icon={<Icon
                        name='security'
                        type='material-community'
                        size={26}
                        color={theme.textColor}
                    />}
                    onPress={() => {
                        this.props.navigation.navigate('security')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={t('language')}
                    icon={<Icon
                        name='language'
                        type='ionicons'
                        size={26}
                        color={theme.textColor}
                    />}
                    onPress={() => {
                        this.props.navigation.navigate('language_settings')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={t('theme')}
                    icon={<Ionicons
                        name="ios-color-palette"
                        size={26}
                        color={theme.textColor}
                    />}
                    onPress={() => {
                        this.props.navigation.navigate('theme_settings')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={t('animations')}
                    icon={<MaterialCommunityIcons
                        name="animation"
                        size={26}
                        color={theme.textColor}/>}
                    onPress={() => {
                        this.props.navigation.navigate('animations_settings')
                    }}
                />

                <SettingsOption
                    theme={theme}
                    title={t('help')}
                    icon={
                        <Icon
                            name='help-circle'
                            type='feather'
                            size={26}
                            color={theme.textColor}
                        />
                    }
                    onPress={() => {
                        this.props.navigation.navigate('help')
                    }}
                />

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
    button_text: {
        fontSize: 20,
        marginLeft: 8,
        color: theme.textColor
    }
});
