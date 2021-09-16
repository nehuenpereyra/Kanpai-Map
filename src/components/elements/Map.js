import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

/**
 * Funciones de redux
 */
import { connect } from "react-redux";
import { setMarkers } from "../../actions/markersAction";

/**
 * Importo modelo de Json
 */
import { JsonModel } from "../../models/JsonModel";
import { ConfigModel } from "../../models/configModel";

//import MapView from 'react-native-map-clustering';

/**
 * Constantes globales
 */
const LATITUDDELTA = 0.0922;
const LONGITUDEDELTA = 0.0922;

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posicion: {
				latitude: -34.921297,
				longitude: -57.954587,
				latitudeDelta: LATITUDDELTA,
				longitudeDelta: LONGITUDEDELTA,
			},
			focusMarkers: [],
			finishLoad: [],
		};
	}

	/**
	 * Este metodo se invoca inmediatamente después de la actualización.
	 * Este método no se llama para el render inicial.
	 */
	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify(this.props.cerveceriadb.database) !==
			JSON.stringify(prevProps.cerveceriadb.database)
		) {
			console.log("CARGANDO MARCADORES");
			this.props.loadMarkers(
				this.cargar(this.props.cerveceriadb.database)
			);
		}
		return true;
	}

	/**
	 * Renderiza un circulo cargando
	 */
	renderLoad() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	/**
	 * Visiviliza y oculta un Callout con su respectivo contenido
	 */

	showMarket(i) {
		this.state.focusMarkers[i].showCallout();
	}

	hideMarket(i) {
		this.state.focusMarkers[i].hideCallout();
	}

	/**
	 * Abre la pantalla de detalle con la cerveceria enviada en el parametro element
	 */

	openCerveceria(element, i, marcador) {
		const { navigate } = this.props.navigation;
		navigate("Detalle", {
			elemento: element,
			ip: ConfigModel.getIp(this.props.config),
		});
		console.log("CARGANDO --> MARCADORES");
		console.log(marcador);
		//marcador.hideCallout()
		this.hideMarket(i);
	}

	/**
	 * Recibe un Json con la informacion de todas las cervecerias
	 * grafica cada market en la location definida
	 * @param {Json} dbMarket
	 */
	cargar(dbMarket) {
		const arrayMarkers = [];
		const marcador = [];
		/**
		 * Recorre cada elemento del arreglo de cervecerias
		 */
		dbMarket.map((element, i) => {
			/**
			 * Agrega a arrayMarkes un Market con la cerveceria element
			 */
			arrayMarkers.push(
				<Marker
					key={i}
					ref={(ref) => {
						this.state.focusMarkers.push(ref);
					}}
					coordinate={{
						latitude: JsonModel.getLocation(element).latitude,
						longitude: JsonModel.getLocation(element).longitude,
					}}
					image={require("../../img/marcador3.png")}
				>
					{/* Comentario 3 */}
					<Callout
						tooltip={true}
						onPress={() =>
							this.openCerveceria(element, i, marcador[i])
						}
					>
						{/*
						 *	Vista del Callout
						 */}
						<View style={[styles.container, this.props.style]}>
							<View style={styles.bubble}>
								<View style={styles.amount}>
									<View style={{ paddingLeft: 20 }}>
										<Text style={{ color: "white" }}>
											{JsonModel.getTitulo(element)}
										</Text>
										<Text style={{ color: "grey" }}>
											Horario:{" "}
											{JsonModel.getHorario(element)}
										</Text>
									</View>
									<Image
										style={{
											width: 50,
											height: 50,
											borderRadius: 40,
										}}
										source={{
											uri:
												ConfigModel.getIp(
													this.props.config
												) + JsonModel.getIcono(element),
										}}
									/>
								</View>
							</View>
							<View style={styles.arrowBorder} />
							<View style={styles.arrow} />
						</View>
					</Callout>
				</Marker>
			);
		});

		/**
		 * Retorna un arreglo con Markers
		 */
		return arrayMarkers;
	}

	render() {
		return (
			<View style={styles.containerr}>
				<MapView
					ref={(ref) => (mapView = ref)}
					style={{ flex: 1 }}
					provider={MapView.PROVIDER_GOOGLE}
					region={{
						latitude: -34.921297,
						longitude: -57.954587,
						latitudeDelta: LATITUDDELTA,
						longitudeDelta: LONGITUDEDELTA,
					}}
					showsUserLocation={true}
				>
					{
						this.props.cerveceriadb.database.length != 0 &&
							this.cargar(this.props.cerveceriadb.database)
						//Inicio comentarios 2
					}
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerr: {
		flex: 1,
	},
	container: {
		flexDirection: "column",
		alignSelf: "flex-start",
	},
	bubble: {
		width: 300,
		flexDirection: "row",
		alignSelf: "flex-start",
		backgroundColor: "#181818",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 6,
		borderColor: "#007a87",
		borderWidth: 0.5,
	},
	amount: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 2,
		borderColor: "red",
		paddingTop: 5,
		width: "100%",
	},
	arrow: {
		backgroundColor: "transparent",
		borderWidth: 16,
		borderColor: "transparent",
		borderTopColor: "#181818",
		alignSelf: "center",
		marginTop: -32,
	},
	arrowBorder: {
		backgroundColor: "transparent",
		borderWidth: 16,
		borderColor: "transparent",
		borderTopColor: "#007a87",
		alignSelf: "center",
		marginTop: -0.5,
	},
});

const mapStateToProps = (state) => {
	return {
		cerveceriadb: state.cerveceriadb,
		config: state.config.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadMarkers: (data) => {
			dispatch(setMarkers(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
