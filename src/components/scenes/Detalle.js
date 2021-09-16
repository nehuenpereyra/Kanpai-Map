import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
	TouchableHighlight,
	Linking,
	Share,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GaleriaImg from "../elements/GaleriaImg";
import TextGradient from "react-native-linear-gradient";
import Orientation from "react-native-orientation";
import MapaIndividual from "../elements/MapaIndividual";
import { JsonModel } from "../../models/JsonModel";
import FastImage from "react-native-fast-image";

const { width, height } = Dimensions.get("window");

export default class Detalle extends Component {
	static navigationOptions = {
		header: null,
	};

	componentWillMount() {
		Orientation.lockToPortrait();
	}

	/**
	 * Recibe un url y lo abre
	 * @param {String} url
	 */
	openLink(url) {
		Linking.openURL(url).catch((err) =>
			console.error("Error al abrir un enlace", err)
		);
	}

	/**
	 * Recibe un contacto de telefono y lo abre
	 * @param {String} contact
	 */
	openContact(contact) {
		Linking.openURL("tel:" + contact).catch((err) =>
			console.error("Error al abrir el contacto", err)
		);
	}

	/**
	 * Recibe un mail y abre para escribir un correo
	 * @param {String} mail
	 */
	openMail(mail) {
		Linking.openURL(
			"mailto:" + mail + "?subject=Asunto&body=Escribe aqui tu mensaje"
		).catch((err) => console.error("Error al abrir el Mail", err));
	}

	/**
	 * Retorna la geoposicion actual del usuario
	 */
	getLocationActual() {
		var getPosition = function (options) {
			return new Promise(function (resolve, reject) {
				navigator.geolocation.getCurrentPosition(
					resolve,
					reject,
					options
				);
			});
		};
		return getPosition;
	}

	/**
	 * Recibe la posicion de destino y en base a un punto de origen traza un camino
	 * @param {Objetc} location
	 */
	openCamino(location) {
		var pos = this.getLocationActual();
		pos()
			.then((position) => {
				/**
				 * Utiliza la posicion del GPS para centrar el mapa de punto origen
				 */
				Linking.openURL(
					`https://www.google.com/maps/dir/?api=1&origin=(${position.coords.latitude},${position.coords.longitude})&destination=(${location.latitude},${location.longitude})&travelmode=driving`
				).catch((err) => console.error("Error al abrir el Mapa", err));
			})
			.catch((err) => {
				/**
				 * Posicion por defecto si el GPS no esta encendido para el punto de origen
				 */
				Linking.openURL(
					`https://www.google.com/maps/dir/?api=1&origin=(-34.921297,-57.954587)&destination=(${location.latitude},${location.longitude})&travelmode=driving`
				).catch((err) => console.error("Error al abrir el Mapa", err));
			});
	}

	/**
	 * Abre el whatsapp para enviar un mensaje
	 * @param {String} telefono
	 */
	openWhatapp(telefono) {
		Linking.openURL("whatsapp://send?text=&phone=" + telefono).catch(
			(err) => console.error("Error al enviar Whatsapp", err)
		);
	}

	/**
	 * Boton para compartir en cualquier red social disponible
	 */
	openShare(name, location) {
		Share.share(
			{
				title: name,
				url: "",
				message:
					"Comparte la cervecería " +
					name +
					" que se encuentra en " +
					"https://www.google.com/maps/@" +
					location.latitude +
					"," +
					location.longitude +
					",15z/data=!4m2!10m1!1e2" +
					" decubre mas cervecerías con la App de Kanpai Map",
			},
			{
				//Android
				dialogTitle: "Comparte esta Cerveceria",
				// ios
				excludeActivityTypes: ["com.apple.UIKit.activity.PostToTitter"],
			}
		);
	}

	render() {
		const { elemento, ip } = this.props.navigation.state.params;

		return (
			<ScrollView style={styles.container}>
				{/**
				 * Comienzo de la Scena
				 * Portada de la cerveceria
				 */}
				<FastImage
					style={styles.portada}
					resizeMode={FastImage.resizeMode.stretch}
					source={{
						uri: ip + JsonModel.getPortada(elemento),
						headers: { Authorization: "someAuthToken" },
						priority: FastImage.priority.normal,
					}}
				>
					<View style={styles.fixedContainer}>
						<View style={styles.tituloContainer}>
							<TextGradient
								colors={["transparent", "#181818", "#181818"]}
							>
								<Text style={styles.titulo}>
									{JsonModel.getTitulo(elemento)}
								</Text>
							</TextGradient>
						</View>
					</View>
				</FastImage>
				{/**
				 * Contenedor de la Descripcion de la cerveceria
				 */}
				<View style={styles.descriptionContainer}>
					<View style={styles.subtitulo}>
						<View style={styles.sub}>
							<Text style={{ color: "grey", fontSize: 13 }}>
								{JsonModel.getDireccion(elemento)}
							</Text>
							<Text style={{ color: "grey", fontSize: 13 }}>
								Horarios: {JsonModel.getHorario(elemento)}
							</Text>
						</View>
						<View style={styles.redSocialContainer}>
							{Object.keys(JsonModel.getRedSocial(elemento)).map(
								function (key, index) {
									let sizeIcon = 40;
									if (key == "facebook") {
										return (
											<TouchableHighlight
												key={index}
												style={styles.botonSocial}
												underlayColor="transparent"
												onPress={() =>
													this.openLink(
														JsonModel.getRedSocial(
															elemento
														)[key]
													)
												}
											>
												<Icon
													name="facebook-official"
													color="grey"
													size={sizeIcon}
												/>
											</TouchableHighlight>
										);
									}
									if (key == "twitter") {
										return (
											<TouchableHighlight
												key={index}
												style={styles.botonSocial}
												underlayColor="transparent"
												onPress={() =>
													this.openLink(
														JsonModel.getRedSocial(
															elemento
														)[key]
													)
												}
											>
												<Icon
													name="twitter-square"
													color="grey"
													size={sizeIcon}
												/>
											</TouchableHighlight>
										);
									}
									if (key == "instagram") {
										return (
											<TouchableHighlight
												key={index}
												style={styles.botonSocial}
												underlayColor="transparent"
												onPress={() =>
													this.openLink(
														JsonModel.getRedSocial(
															elemento
														)[key]
													)
												}
											>
												<Icon
													name="instagram"
													color="grey"
													size={sizeIcon}
												/>
											</TouchableHighlight>
										);
									}

									if (key == "whatsapp") {
										return (
											<TouchableHighlight
												key={index}
												style={styles.botonSocial}
												underlayColor="transparent"
												onPress={() =>
													this.openWhatapp(
														JsonModel.getRedSocial(
															elemento
														)[key]
													)
												}
											>
												<Icon
													name="whatsapp"
													color="grey"
													size={sizeIcon}
												/>
											</TouchableHighlight>
										);
									}
								}.bind(this)
							)}
						</View>
					</View>

					<View style={styles.descripcionContainer}>
						<Text style={{ color: "grey", fontSize: 18 }}>
							{JsonModel.getDescripcion(elemento)}
						</Text>
					</View>

					{JsonModel.getServicio(elemento) != "" ? (
						<View style={styles.serviciosContainer}>
							<Text style={{ color: "grey", fontSize: 12 }}>
								Servicios: {JsonModel.getServicio(elemento)}
							</Text>
						</View>
					) : null}

					{/* Comprueba si no existe ningun numero de telefono para mostrar */}
					<View style={styles.telefonoContainer}>
						{JsonModel.getTelefono(elemento).length != 0 ? (
							JsonModel.getTelefono(elemento).length == 1 ? (
								<Text style={{ color: "grey" }}>
									Telefono:{" "}
								</Text>
							) : (
								<Text style={{ color: "grey" }}>
									Telefonos:{" "}
								</Text>
							)
						) : null}
						{JsonModel.getTelefono(elemento).length != 0
							? JsonModel.getTelefono(elemento).map(
									(data, index) => {
										return (
											<TouchableHighlight
												style={{ paddingRight: 10 }}
												key={index}
												underlayColor="transparent"
												onPress={() =>
													this.openContact(data)
												}
											>
												<View
													style={{
														backgroundColor: "grey",
														borderRadius: 4,
														padding: 2,
													}}
												>
													<Text
														style={{
															color: "#181818",
														}}
													>
														{data}
													</Text>
												</View>
											</TouchableHighlight>
										);
									}
							  )
							: null}
					</View>
					{/**
					 * Contenedor de utilidades:
					 * WebSite
					 * Compartir
					 * Como llegar
					 * Mail
					 * Me Gusta
					 */}
					<View style={styles.utilidadContainer}>
						{JsonModel.getWebsite(elemento) != "" ? (
							<TouchableHighlight
								underlayColor="transparent"
								onPress={() =>
									this.openLink(
										JsonModel.getWebsite(elemento)
									)
								}
							>
								<View style={styles.botonUtilidad}>
									<Icon
										name="bookmark"
										color="grey"
										size={30}
									/>
									<Text style={{ color: "grey" }}>
										WebSite
									</Text>
								</View>
							</TouchableHighlight>
						) : null}

						<TouchableHighlight
							underlayColor="transparent"
							onPress={() =>
								this.openShare(
									JsonModel.getTitulo(elemento),
									JsonModel.getLocation(elemento)
								)
							}
						>
							<View style={styles.botonUtilidad}>
								<Icon name="share-alt" color="grey" size={30} />
								<Text style={{ color: "grey" }}>Compartir</Text>
							</View>
						</TouchableHighlight>

						<TouchableHighlight
							onPress={() =>
								this.openCamino(JsonModel.getLocation(elemento))
							}
						>
							<View style={styles.botonUtilidad}>
								<Icon name="map" color="grey" size={30} />
								<Text style={{ color: "grey" }}>
									Como llegar
								</Text>
							</View>
						</TouchableHighlight>

						{JsonModel.getMail(elemento) != "" ? (
							<TouchableHighlight
								underlayColor="transparent"
								onPress={() =>
									this.openMail(JsonModel.getMail(elemento))
								}
							>
								<View style={styles.botonUtilidad}>
									<Icon
										name="envelope"
										color="grey"
										size={30}
									/>
									<Text style={{ color: "grey" }}>Mail</Text>
								</View>
							</TouchableHighlight>
						) : null}

						{}
					</View>
				</View>

				{
					/**
					 * Galeria de imagenes
					 */
					JsonModel.getGaleria(elemento).length >= 2 ? (
						<View style={styles.galeriaContainer}>
							<View style={styles.galeriaHeder}>
								<Text
									style={{
										color: "white",
										textAlign: "center",
										fontSize: 20,
									}}
								>
									GALERIA
								</Text>
							</View>
							<View style={{ height: 300 }}>
								<GaleriaImg
									galeria={JsonModel.getGaleria(elemento, ip)}
								/>
							</View>
						</View>
					) : null
				}

				{/**
				 * Ubicacion individual de la cerveceria en el mapa
				 */}
				<View style={styles.galeriaContainer}>
					<View style={styles.galeriaHeder}>
						<Text
							style={{
								color: "white",
								textAlign: "center",
								fontSize: 20,
							}}
						>
							UBICACION
						</Text>
					</View>
					<View style={{ height: 300 }}>
						<MapaIndividual
							location={JsonModel.getLocation(elemento)}
						/>
					</View>
				</View>

				{/**
				 * Fin de la Scena
				 */}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
	},
	portada: {
		width: width,
		height: 300,
	},
	subtitulo: {
		paddingTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	sub: {
		paddingLeft: 5,
	},
	redSocialContainer: {
		flexDirection: "row",
		paddingRight: 5,
	},
	botonSocial: {
		paddingLeft: 5,
	},
	descripcionContainer: {
		paddingHorizontal: 10,
	},
	utilidadContainer: {
		flexDirection: "row",
		padding: 5,
	},
	botonUtilidad: {
		alignItems: "center",
		paddingRight: 5,
	},
	serviciosContainer: {
		paddingHorizontal: 10,
	},
	tabContainer: {
		width: width,
		height: 300,
	},
	telefonoContainer: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
	},
	fixedContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	tituloContainer: {
		backgroundColor: "transparent",
		width: width,
	},
	titulo: {
		fontSize: 35,
		paddingLeft: 10,
		color: "white",
	},
	galeriaContainer: {
		paddingTop: 8,
		paddingBottom: 10,
	},
	galeriaHeder: {
		paddingVertical: 5,
		borderTopWidth: 2,
		borderColor: "red",
	},
});
