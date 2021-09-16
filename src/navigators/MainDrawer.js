import React, { Component } from "react";
import { Dimensions } from "react-native";

/**
 * Importo las funciones de Redux
 */
import { connect } from "react-redux";
import { fetchDataStorage, mensaje } from "../actions/storageDataAction";

import { DrawerNavigator } from "react-navigation";
/**
 * Importo la barra lateral del DrawerNavigator (se define el estilo)
 */
import ContentDrawer from "../components/elements/contentDrawer";
/**
 * Importo las rutas a utilizar por DrawerNavigator
 */
import Routes from "../config/drawerRutes";

const { width, height } = Dimensions.get("window");
const WIDTH_DRAWER = width - width * 0.4;

/**
 * Configuraciones del DrawerNavigator
 */
const DrawerNavigatorConfig = {
	drawerWidth: WIDTH_DRAWER,
	contentComponent: (props) => (
		<ContentDrawer {...props} widthDrawer={WIDTH_DRAWER} />
	),
};

/**
 *  Se configura el DrawerNavigator enviando las Rutas y la Configuracion
 */
const AppNavigator = DrawerNavigator(Routes, DrawerNavigatorConfig);

class MainDrawer extends Component {
	componentDidMount() {
		/**
		 * Pide primero el archivo de configuracion (json, depende de la localidad) en donde despues
		 * va poder obtener el enlace de la db cervecerias y el archivo locals
		 */
		this.props.fetch2(this.props.configLocal.localidad).then(() => {
			this.props.fetch3(
				this.props.config.data.urldb,
				this.props.config.data.urlLegal
			);
		});
	}

	/**
	 * DrawerMode define si se bloquea seguir avanzando en la StackNavigator
	 * o permite que se sigan apilando elementos.
	 * [!]->Las rutas de este menu son StackNavigator que permiten apilar vistas
	 */
	render() {
		return (
			<AppNavigator
				screenProps={{ drawerMode: this.props.drawerMode.mode }}
			/>
		);
	}
}

/**
 * Se definen y se conecta las funciones de Redux
 */
const mapStateToProps = (state) => {
	return {
		drawerMode: state.drawerMode,
		configLocal: state.configLocal,
		config: state.config,
	};
};

/**
 * Se puede dispatchear varias acciones usando
 * dispatch([action1,action2])
 */
const mapDispatchToProps = (dispatch) => {
	return {
		fetch2: (localidad) => {
			return dispatch(
				fetchDataStorage(
					"http://localhost:3000" + localidad + "/config",
					"config"
				)
			);
		},
		fetch3: (urlCerveceriadb, urlLegal) => {
			dispatch(fetchDataStorage(urlCerveceriadb, "cerveceriadb")).then(
				() => {
					dispatch(fetchDataStorage(urlLegal, "legal"));
				}
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer);
