import React, {Component} from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import {translator} from "../../../lang/translator";


const t = translator('help');


export default class HelpScreen extends Component {
    constructor() {
        super();
        this.onHelpCenterButtonPress = this.onHelpCenterButtonPress.bind(this);
    }

    onHelpCenterButtonPress() {
        this.props.navigation.navigate('help_center');
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        return (
            <ScrollView style={styles.screen}>

                <TouchableOpacity
                    style={styles.row}
                    onPress={this.onHelpCenterButtonPress}
                >
                    <Text style={styles.rowText}>
                        {t('help_center')}
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
    rowText: {
        fontSize: 20,
        color: theme.textColor
    }
});
