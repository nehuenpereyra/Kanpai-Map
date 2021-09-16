import React, { Component } from "react";
import CustomHeaderStack from "../elements/customHeaderStack";

import { StackNavigator } from "react-navigation";

/**
 * Se importa la ruta que va utilizar INICIO
 */
import Routes from "../../config/inicioRoutes";

const StackNavigatorConfig = {
	navigationOptions: {
		header: (props) => (
			<CustomHeaderStack
				{...props}
				titulo="Cervecerias de LP"
				drawerNavigation={this.props.navigation}
			/>
		),
	},
};

/**
 *  Se configura el StackNavigator enviando las Rutas y la Configuracion
 */
const AppStack = StackNavigator(Routes, StackNavigatorConfig);

export default class Inicio extends Component {
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
