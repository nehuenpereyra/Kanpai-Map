import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Picker,
	Button,
	Linking,
} from "react-native";
import Orientation from "react-native-orientation";
import CustomHeaderStack from "../elements/customHeaderStack";
import Modal from "react-native-modal";

import { setLocalidad } from "../../actions/configLocalAction";

/**
 * Se utiliza para tener acceso a la base de datos
 */
import { connect } from "react-redux";

class Configuracion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			localidad: "",
			visibleModal: false,
		};
	}

	componentWillMount() {
		Orientation.lockToPortrait();
	}

	/**
	 * Comienzo de las funciones del Modal
	 */
	_showModal = () => this.setState({ visibleModal: true });

	_hideModal = () => this.setState({ visibleModal: false });

	setModalVisible(visible) {
		this.setState({
			visibleModal: visible,
		});
	}

	_renderModalContent = () => (
		<View style={styles.modalContent}>
			<ScrollView>
				<View style={{ flex: 1 }}>
					<Text>{this.props.legal.join("\n")}</Text>
				</View>
			</ScrollView>
		</View>
	);
	/**
	 * Fin de las funciones del modal
	 */

	/**
	 * Se envia una localidad con la estructura '/ciudad' para cargar nuevamente
	 * la configuracion y la cerveceriadb en base a la localidad
	 * @param {String} newLocalidad
	 */
	setLocalidadApp(newLocalidad) {
		if (this.props.configLocal.localidad != newLocalidad) {
			this.props.setLocalidad(newLocalidad);
			this.props.fetch(newLocalidad);
			this.setState({
				localidad: newLocalidad,
			});
		}
	}

	/**
	 * Recibe un mail y abre para escribir un correo
	 * @param {String} mail
	 */
	openMail() {
		let mail = "devflags@gmail.com";
		Linking.openURL(
			"mailto:" + mail + "?subject=Consulta" + "&body= "
		).catch((err) => console.error("Error al abrir el Mail", err));
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<CustomHeaderStack
						titulo="Configuración"
						drawerNavigation={
							this.props.screenProps.drawerNavigation
						}
					/>

					<Modal
						isVisible={this.state.visibleModal}
						onBackdropPress={() => {
							this.setModalVisible(false);
						}}
						onBackButtonPress={() => {
							this.setModalVisible(false);
						}}
					>
						{this._renderModalContent()}
					</Modal>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 10,
						}}
					>
						<Text style={{ color: "white", padding: 10 }}>
							Localidad:
						</Text>
						<View
							style={{
								flex: 1,
								borderBottomWidth: 1,
								borderColor: "#cb4335",
							}}
						>
							<Picker
								style={{
									height: 40,
									width: "100%",
									color: "white",
								}}
								selectedValue={this.state.localidad}
								onValueChange={(itemValue, itemIndex) =>
									this.setLocalidadApp(itemValue)
								}
							>
								<Picker.Item
									label="La Plata"
									value="/laplata"
								/>
							</Picker>
						</View>
					</View>

					<Button
						onPress={() => this.openMail()}
						title="Contactar con los desarroladores"
						color="#181818"
					/>

					<View
						style={{
							borderTopWidth: 2,
							borderBottomWidth: 2,
							borderColor: "#cb4335",
						}}
					>
						<Button
							onPress={() => this.setModalVisible(true)}
							title="TERMINOS Y CONDICIONES"
							color="#181818"
						/>
					</View>
					<View style={{ justifyContent: "center" }}>
						<Text style={{ color: "white", textAlign: "center" }}>
							Version Beta 1.0
						</Text>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
	},
	modalContent: {
		padding: 10,
		backgroundColor: "#FACC2E",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
});

/**
 * Se conecta a Redux
 */
const mapStateToProps = (state) => {
	return {
		config: state.config.data,
		configLocal: state.configLocal,
		legal: state.legal.data.body,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch: (localidad) => {
			dispatch(
				fetchDataStorage(
					"http://localhost:3000" + localidad + "/cervecerias",
					"cerveceriadb"
				)
			).then(() => {
				dispatch(
					fetchDataStorage(
						"http://localhost:3000" + localidad + "/config",
						"config"
					)
				);
			});
		},
		setLocalidad: (data) => {
			dispatch(setLocalidad(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Configuracion);
