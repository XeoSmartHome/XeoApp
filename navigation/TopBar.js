import {Appbar} from "react-native-paper";
import React from "react";


export default function TopBar () {
	return(<Appbar.Header>
		<Appbar.BackAction
			onPress={()=>{alert('')}}
		/>
		<Appbar.Content
			title="XeoSmartHome"
			subtitle="username username"
		/>
		<Appbar.Action icon="new" onPress={()=>{alert('')}}/>
		<Appbar.Action icon="dots-vertical" onPress={()=>{alert('')}}/>
	</Appbar.Header>)
}
