import { AsyncStorage } from "react-native";

/**
 * Funcion a ejecutar si se puede establecer conexion a internet
 * [!] Es requerido la converion con JSON.stringify  para ser almacenado
 * @param {Json} data
 * @param {tring} nameKey
 */
export async function initilize(data, nameKey) {
	try {
		const value = await AsyncStorage.getItem(nameKey);
		if (value !== null) {
			/**
			 * Existe una actualizacion de la Data
			 */
			console.log("Recuperacion de dato exitosa");
			if (JSON.stringify(value) != JSON.stringify(data)) {
				try {
					console.log(
						"[!]-> Actualizacion local de " + namekey + " exitosa"
					);
					await AsyncStorage.setItem(nameKey, data);
				} catch (error) {
					console.log("Error: Al guardar localmente " + namekey);
				}
			}
			/**
			 * Si son iguales o se actualizo se retorna la data para setearlo en redux
			 * return data;
			 */
		} else {
			console.log("Recupero dato [" + nameKey + "] pero es null");
			try {
				await AsyncStorage.setItem(nameKey, JSON.stringify(data));
			} catch (error) {
				console.log("Error: Al guardar localmente " + nameKey);
			}
		}
	} catch (error) {
		/**
		 * No se puedo recuperar el dato
		 * [!] El dato puede que no exista la primera vez entonces hay que setearlo
		 */
		try {
			await AsyncStorage.setItem(nameKey, JSON.stringify(data));
		} catch (err) {
			console.log("Error: Al guardar localmente " + nameKey);
			console.log(err);
		}
	}
}

/**
 * Funcion llamada cuando no existe conexion a internet
 */
export async function getDataLocal(nameKey) {
	try {
		const value = await AsyncStorage.getItem(nameKey);
		if (value !== null) {
			return value;
		}
	} catch (error) {
		console.log("Recupero dato [" + nameKey + "] pero es null");
	}
}
