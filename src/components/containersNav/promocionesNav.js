import React, { Component } from "react";
import Promociones from "../scenes/Promociones";

export default class PromocionesNav extends Component {
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
			<Promociones
				screenProps={{ drawerNavigation: this.props.navigation }}
			/>
		);
	}
}
