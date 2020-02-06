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

    login(){
        fetch('https://dashboard.xeosmarthome.com/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((response) => response.json()
        ).then(response => {
            if(response.status === 'success')
                alert('connected');
            else
                alert('bad credentials');
        }).catch((error) => {
            alert(error);
        });
    }

    render() {
        return (
            <View style={{padding: 10, alignItems: 'center'}}>
                <Image
                    source={require('../../assets/images/logo_xeo_nobackground.png')}
                    style={{ width: 150, height: 150, margin: 50}}
                />
                <Text>Email address</Text>
                <TextInput
                    style={{height: 40, width: 200, borderColor: 'black', borderStyle: 'solid', borderWidth: 1, borderRadius: 10, padding: 10}}
                    placeholder="Email address"
                    onChangeText={(email) => this.setState({email: email})}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 40, width: 200, borderColor: 'black', borderStyle: 'solid', borderWidth: 1, borderRadius: 10, padding: 10}}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password: password})}
                />
                <CheckBox
                    center
                    title='Remember me'
                    checked={this.state.checked}
                />
                <Button style={{height: 40, width: 200}}
                        onPress={this.login.bind(this)} title='Login'/>
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
