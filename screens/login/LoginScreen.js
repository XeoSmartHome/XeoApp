import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    Button,
    Switch,
    CheckBox,
} from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    updateView() {
        this.setState({ viewChanged: !this.state.viewChanged})
    }

    render() {
        return (
            <View style={{padding: 10, alignItems: 'center'}}>
                <Image
                    source={require('./logo_xeo_nobackground.png')}
                    style={{ width: 150, height: 150, margin: 50}}
                />
                <Text>Email address</Text>
                <TextInput
                    style={{height: 40, width: 200, borderColor: 'black', borderStyle: 'solid', borderWidth: 1, borderRadius: 10, padding: 10}}
                    placeholder="Email address"
                    onChangeText={(email) => this.setState({email})}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 40, width: 200, borderColor: 'black', borderStyle: 'solid', borderWidth: 1, borderRadius: 10, padding: 10}}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                />
                <CheckBox
                    center
                    title='Remember me'
                    checked={this.state.checked}
                />
                <Button style={{height: 40, width: 200}}
                        onPress={() => alert(this.state.email)} title='Login'/>
            </View>
        );
    }
}

/*
export default class LoginScreen extends Component{
    render(){
        return (
            <View>
                <Text>Login page</Text>
                <TextInput style={{height: 40}}
                           placeholder="Email address"
                           onChangeText={(text) => alert(text)}/>
            </View>
        )
    }
}*/
