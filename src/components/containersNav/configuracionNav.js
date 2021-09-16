import React, { Component } from "react";
import Configuracion from "../scenes/Configuracion";

export default class ConfiguracionNav extends Component {
	/**
	 * Configura el DrawerNavigarion dentro de la Scena
	 * -> Header = null
	 * -> Estable que dependiendo de drawerMode permita abrir el menu lateral o no
	 */
	static navigationOptions = ({ navigation, screenProps }) => ({
		header: null,
	});

	render() {
		return (
			<Configuracion
				screenProps={{ drawerNavigation: this.props.navigation }}
			/>
		);
	}
}
