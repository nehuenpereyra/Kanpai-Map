export function loadDB(data) {
	return {
		type: "LOAD_DB",
		data,
	};
}

/**
 * Setea el texto de filtrado de listBeer
 */
export function setFilterText(data) {
	return {
		type: "SET_FILTER_TEXT",
		data,
	};
}
/**
 * Setea el tipo de filtro utilizado
 * @param {String} data
 */
export function setFilterType(data) {
	return {
		type: "SET_FILTER_TYPE",
		data,
	};
}

/**
 * Seteo la DB con los datos del JSON
 */
export function resetDB() {
	return (dispatch, getState) => {
		if (getState().storageData.data.length != 0) {
			console.log("Reseteo de DB exitoso");
			dispatch(loadDB(getState().storageData.data));
		} else {
			console.log("Error de reseteo de DB: storageData.data esta vacia");
		}
	};
}
