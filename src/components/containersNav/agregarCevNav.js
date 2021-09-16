import React, { Component } from "react";
import AgregarCerveceria from "../scenes/AgregarCerveceria";

export default class AgregarCevNav extends Component {
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
			<AgregarCerveceria
				screenProps={{ drawerNavigation: this.props.navigation }}
			/>
		);
	}
}
