import React from 'react';
import {createAppContainer} from 'react-navigation';
import AsyncStorage from "@react-native-community/async-storage";
import * as Localization from "expo-localization";
import ThemeProvider, {ThemeContext} from "./app/themes/ThemeProvider";
import I18n from 'i18n-js';
//import {StackNavigator} from "./app/navigators/StackNavigator";
import {Text, View} from "react-native";


I18n.fallbacks = true;
I18n.translations = {
	'en': require('./app/lang/en.json'),
	'ro': require('./app/lang/ro.json')
};


AsyncStorage.getItem('locale').then((item) => {
	if (item !== null)
		I18n.locale = item;
	else
		I18n.locale = Localization.locale;
});


//const Container = createAppContainer(StackNavigator);


const App = () => (
	<ThemeProvider>
		<ThemeContext.Consumer>
			{
				(props) => (
					null//<Container screenProps={props}/>
				)
			}
		</ThemeContext.Consumer>
	</ThemeProvider>
)


export default App;
