/**
 * Api que utiliza para obtener los datos de internet
 */
import getDataApi from "../api/jsonDB";

/**
 * Api para encriptar los datos
 */
import { decryptJson } from "../api/crypto";

import { NetInfo } from "react-native";

export function fetchingData(keyName) {
	return {
		type: "FETCHING_DATA",
		name: keyName,
	};
}

export function fetchingDataSuccess(data, keyName) {
	return {
		type: "FETCHING_DATA_SUCCESS",
		name: keyName,
		data,
	};
}

export function fetchingDataFailure(keyName) {
	return {
		type: "FETCHING_DATA_FAILURE",
		name: keyName,
	};
}

/**
 * Descarga de internet un dato y lo almacena en memoria
 * @param {String} url
 * @param {String} keyName
 */
export const fetchData = (url, keyName) => {
	return (dispatch) => {
		dispatch(fetchingData(keyName));
		return NetInfo.isConnected.fetch().then((isConnected) => {
			if (isConnected) {
				/**
				 * Si existe conexion a internet entra ene ste bloque
				 */
				return getDataApi(url)
					.then(([response, json]) => {
						/**
						 * Formato del json
						 * {data : json_encriptado}
						 */
						let data = decryptJson(json.data);
						dispatch(fetchingDataSuccess(data, keyName));
					})
					.catch((err) => {
						dispatch(fetchingDataFailure(keyName));
					});
			}
		});
	};
};
