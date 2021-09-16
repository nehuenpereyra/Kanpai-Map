import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigator } from "react-navigation";

/**
 * Se importa la ruta que va utilizar CERVECERIAS
 */
import Routes from "../../config/cervezeriasRoutes";

/**
 *  Se configura el StackNavigator enviando las Rutas
 */
const AppStack = StackNavigator(Routes);

export default class CervezeriasNav extends Component {
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
