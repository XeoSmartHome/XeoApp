import React from "react";
import {ScrollView, View, StyleSheet, Text} from "react-native";
import {XeoButton} from "../../../components/XeoButton";
import {API} from "../../../api/api";


export default class CreateTimedAction extends React.Component {
    constructor() {
        super();
        this.state = {

        };
        this.renderActionType = this.renderActionType.bind(this);
        this.onActionTypePress = this.onActionTypePress.bind(this);
        this.createTimedActionCallback = this.createTimedActionCallback.bind(this);
    }

    componentDidMount() {
    }

    createTimedActionCallback(response) {
        switch (response.status) {
            case 200:
                this.props.navigation.replace('edit_device_timed_action', {
                    device_id: this.props.navigation.state.params.device_id,
                    action_id: response['action']['id']
                });
                break;
            case 400:
                console.warn(response['message']);
                break;
        }
    }

    createTimedAction(action_type_id) {
        API.devices.timed_actions.createTimedAction({
            device_id: this.props.navigation.state.params.device_id,
            action_type_id: action_type_id
        }).then(
            this.createTimedActionCallback
        ).catch( (error) => {
            console.warn(error);
        });
    }

    onActionTypePress(action_type) {
        return () => {
            this.createTimedAction(action_type['id'])
        }
    }

    renderActionType(action_type, index) {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        return (
            <View
                key={`action-type-${action_type['id']}`}
                style={styles.action_type}
            >
                <XeoButton
                    onPress={this.onActionTypePress(action_type)}
                    title={action_type['name']}
                    theme={theme}
                    size={"medium"}
                    colors={{
                        text: theme.lightColor,
                        background: theme.primaryColor
                    }}
                />
            </View>
        )
    }

    render() {
        const {theme} = this.props.screenProps;
        const styles = Styles(theme);
        return (
            <ScrollView
                style={styles.screen}
            >
                {
                    this.props.navigation.state.params.device_actions_types.map(this.renderActionType)
                }
            </ScrollView>
        )
    }
}


const Styles = (theme) => ({
    screen: {
      padding: '3%'
    },
    action_type: {
        width: '60%',
        alignSelf: 'center',
        paddingTop: 14
    }
});