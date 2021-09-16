import { Alert } from "react-native";
import setPost from "../api/postData";

/**
 * Envio de datos por parte del formulario
 */

export function submitData() {
	return {
		type: "SUBMIT_DATA",
	};
}

export function submitDataSuccess(data) {
	return {
		type: "SUBMIT_DATA_SUCCESS",
		data,
	};
}

export function submitDataFailure() {
	return {
		type: "SUBMIT_DATA_FAILURE",
	};
}

export function postData(urlPost, parametros) {
	console.log("La URL es");
	console.log(urlPost);
	return (dispatch) => {
		dispatch(submitData());
		setPost(urlPost, parametros)
			.then(([response, text]) => {
				dispatch(submitDataSuccess(text));
				Alert.alert(text, "Envio Exitoso");
			})
			.catch((err) => {
				dispatch(submitDataFailure());
				Alert.alert("Ocurrio un error al cargar los datos");
			});
	};
}
