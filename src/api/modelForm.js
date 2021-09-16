import { StyleSheet } from "react-native";

var t = require("tcomb-form-native");
var _ = require("lodash");

/**
 * Clono y redefino los estilos
 */
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.borderColor = "#3a3a3a";
stylesheet.textbox.normal.backgroundColor = "#323232";
stylesheet.controlLabel.normal.color = "#fdfefe";

/**
 * Defino el modelo del formulario
 */
export var form_add = t.struct({
	name: t.String,
	redSocial: t.String,
	description: t.String,
});

/**
 * Defino la configuracion del formulario
 */
export var options = {
	fields: {
		name: {
			label: "Nombre de la cerveceria",
			stylesheet: stylesheet,
		},
		redSocial: {
			label: "Red Social de la cerveceria",
			stylesheet: stylesheet,
		},
		description: {
			label: "Breve descripción",
			stylesheet: stylesheet,
		},
	},
};
