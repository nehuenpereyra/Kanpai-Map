import { NetInfo } from "react-native";

import { Alert } from "react-native";
var rebote = true;

/**
 * Api que utiliza para obtener los datos de internet
 */
import getDataApi from "../api/jsonDB";

/**
 * Cargo la DB cervecerias
 */
import { loadDB } from "./cerveceriadbAction";

/**
 * Importo las funciones para almacenar localmente datos y recuperarlos
 */
import { initilize, getDataLocal } from "../api/fetchingDataLocal";

/**
 * Api de encriptación
 */
import { decryptJson } from "../api/crypto";

export function fetchingDataStorage(keyName) {
	return {
		type: "FETCHING_DATA_STORAGE",
		name: keyName,
	};
}

export function fetchingDataStorageSuccess(data, keyName) {
	return {
		type: "FETCHING_DATA_STORAGE_SUCCESS",
		name: keyName,
		data,
	};
}

export function fetchingDataStorageFailure(keyName) {
	return {
		type: "FETCHING_DATA_STORAGE_FAILURE",
		name: keyName,
	};
}

export function setDataStorageLocal(data, keyName) {
	return {
		type: "SET_DATA_STORAGE_LOCAL",
		name: keyName,
		data,
	};
}

export const mensaje = () => {
	return (dispatch) => {
		return "Hola loco de mierda";
	};
};

/**
 * Busca un Json de internet usando el parametro URL y lo guarda de manera local usando
 * como key el valor de keyName
 * @param {String} url
 * @param {String} keyName
 */
export const fetchDataStorage = (url, keyName) => {
	return (dispatch) => {
		dispatch(fetchingDataStorage(keyName));

		/**
		 * Comprueba si existe una conexion a internet
		 */
		return NetInfo.isConnected.fetch().then((isConnected) => {
			if (isConnected) {
				/**
				 * Si existe conexion a internet entra en este bloque
				 */

				return getDataApi(url)
					.then(([response, json]) => {
						/**
						 * Inicializa solo si es cerveceriadb
						 */
						switch (keyName) {
							case "cerveceriadb":
								/**
								 * Formato del json
								 * {data : json_encriptado}
								 */
								let map = decryptJson(json.data);
								dispatch(loadDB(map));
								initilize(json, keyName);
								console.log(
									"Se almaceno en DISCO el json de MAPCER"
								);
								dispatch(
									fetchingDataStorageSuccess(map, keyName)
								);
								break;
							case "config":
								initilize(json, keyName);
								dispatch(
									fetchingDataStorageSuccess(json, keyName)
								);
								console.log(
									"Se almaceno en DISCO el json de CONFIG"
								);
								break;
							case "legal":
								initilize(json, keyName);
								dispatch(
									fetchingDataStorageSuccess(json, keyName)
								);
								console.log(
									"Se almaceno en DISCO el json de LEGAL"
								);
								break;
							default:
								dispatch(
									fetchingDataStorageSuccess(json, keyName)
								);
								break;
						}
					})
					.catch((err) => {
						dispatch(fetchingDataStorageFailure(keyName));
					});
			} else {
				if (rebote) {
					Alert.alert(
						"No tienes conexión a internet",
						"Las imagenes no se cargaran correctamente",
						[
							{
								text: "OK",
								onPress: () => console.log("OK Pressed"),
							},
						],
						{ cancelable: false }
					);
					rebote = false;
				}

				/**
				 * Si no hay conexion a internet entra en este bloque
				 */
				console.log("TRABAJANDO SIN CONEXION");

				return getDataLocal(keyName).then((data) => {
					/**
					 * Se requiere parsear los datos a Json para su utilizacion
					 * Se setea el dato en el reducer correspondiente
					 */
					let map;
					switch (keyName) {
						case "cerveceriadb":
							map = decryptJson(JSON.parse(data).data);
							dispatch(setDataStorageLocal(map, keyName));
							break;
						default:
							dispatch(
								setDataStorageLocal(JSON.parse(data), keyName)
							);
							break;
					}

					/**
					 * Actualiza solamente por el keyName
					 */
					switch (keyName) {
						case "cerveceriadb":
							dispatch(loadDB(map));
							break;
						default:
							break;
					}
				});
			}
		});
	};
};
