import React from 'react';
import {createAppContainer} from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import ThemeProvider, {ThemeContext} from "./app/themes/ThemeProvider";
import I18n from 'i18n-js';
import {StackNavigator} from "./app/navigators/StackNavigator";
import DeviceSetupScreen from "./app/screens/Devices/DeviceSetupScreen";


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


const Container = createAppContainer(StackNavigator);

/*const ContainerWrapper = (props) => {
	const [animations_enable, setAnimationsEnable] = useState('unknown');

	AsyncStorage.getItem('animations_enable').then( (animations_enable) => {
		setAnimationsEnable(animations_enable === 'true')
	})

	if(animations_enable !== 'unknown'){
		const Container = createAppContainer(StackNavigator(animations_enable));
		return (
			<Container screenProps={props.screenProps}/>
		)
	}

	const Container = createAppContainer(StackNavigator(false));
	return (
		<Container screenProps={props.screenProps}/>
	)

}*/


const App = () => (
	<ThemeProvider>
		<ThemeContext.Consumer>
			{
				(props) => (
					<Container screenProps={props}/>
					/*<DeviceSetupScreen screenProps={props}/>*/
				)
			}
		</ThemeContext.Consumer>
	</ThemeProvider>
)


export default App;
