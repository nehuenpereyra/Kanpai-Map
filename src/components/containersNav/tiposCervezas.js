import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Routes from "../../config/tipoCervezasRoutes";

/**
 *  Se configura el StackNavigator enviando las Rutas
 */
const AppStack = StackNavigator(Routes);

export default class TiposCervezas extends Component {
	/**
	 * Configura el DrawerNavigarion dentro del StackNavigation
	 * -> Header = null
	 * -> Estable que dependiendo de drawerMode permita abrir el menu lateral o no
	 */
	static navigationOptions = ({ navigation, screenProps }) => ({
		header: null,
		drawerLockMode: screenProps.drawerMode,
	});

	render() {
		return (
			<AppStack
				screenProps={{ drawerNavigation: this.props.navigation }}
			/>
		);
	}
}
