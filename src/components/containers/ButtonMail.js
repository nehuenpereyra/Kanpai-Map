import React, { Component } from "react";
import { StyleSheet, Button, Linking } from "react-native";

import { ConfigLocalModel } from "../../models/configLocalModel";

// Realizo la conexión con redux
import { connect } from "react-redux";

class ButtonMail extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Recibe un mail y abre para escribir un correo
	 * @param {String} mail
	 */
	openMail(mail, name, redSocial, des, localidad) {
		Linking.openURL(
			"mailto:" +
				mail +
				"?subject=[" +
				localidad +
				"] Añadir Cerveceria " +
				name +
				"&body=Nombre Cerveceria: " +
				name +
				" \nNombre de su red social: " +
				redSocial +
				" \nDescripción: " +
				des
		).catch((err) => console.error("Error al abrir el Mail", err));
	}

	/**
	 * Evalua los parametros pasados para verificar el envio
	 */
	evaluar() {
		const { form, clearForm } = this.props;
		const value = form != undefined ? form.getValue() : false;
		if (value) {
			console.log("Localidad Actual");
			console.log(this.props.localidad);
			this.openMail(
				"devflags@gmail.com",
				value.name,
				value.redSocial,
				value.description,
				ConfigLocalModel.getLocalidad(this.props.localidad)
			);
			clearForm();
		}
	}

	/**
	 * Se realiza doble click porque el cursor tiene que salir de la caja de texto
	 */
	render() {
		return (
			<Button
				onPress={() => this.evaluar()}
				title="Enviar"
				color="#cb4335"
			/>
		);
	}
}

const styles = StyleSheet.create({
	boton: {
		padding: 10,
		backgroundColor: "white",
		borderWidth: 2,
		borderColor: "black",
		borderRadius: 6,
		marginHorizontal: 10,
		color: "black",
	},
});

const mapStateToProps = (state) => {
	return {
		config: state.config.data,
		localidad: state.configLocal.localidad,
	};
};

export default connect(mapStateToProps)(ButtonMail);
