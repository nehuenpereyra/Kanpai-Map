import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ButtonMail from "../containers/ButtonMail";
import { form_add, options } from "../../api/modelForm";

/**
 * Variables requeridas por la libreria de formulario
 */
var t = require("tcomb-form-native");
var Form = t.form.Form;

export default class Formulario extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
	}

	componentWillMount() {
		this.setInitialState();
	}

	setInitialState() {
		const value = {
			email: "",
			name: "",
			redSocial: "",
			description: "",
		};
	}

	onChange(value_local) {
		this.setState({ value: value_local });
	}

	clearForm() {
		this.setState({
			value: {
				email: "",
				name: "",
				redSocial: "",
				description: "",
			},
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.formComplete}>
						<View style={styles.containerForm}>
							<Form
								ref="form"
								options={options}
								type={form_add}
								value={this.state.value}
								onChange={this.onChange.bind(this)}
							/>
						</View>

						<View style={{ height: 50, width: "70%" }}>
							<ButtonMail
								form={this.refs.form}
								clearForm={this.clearForm.bind(this)}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	formComplete: {
		borderColor: "#cb4335",
		borderWidth: 2,
		borderRadius: 5,
		alignItems: "center",
		margin: 8,
	},
	form: {
		backgroundColor: "yellow",
	},
	containerForm: {
		width: "90%",
		margin: 10,
		marginVertical: 20,
		backgroundColor: "#181818",
		borderWidth: 2,
		borderColor: "#181818",
		paddingHorizontal: 5,
		borderRadius: 4,
	},
});
