/**
 * Estado inicial
 */
const initialState = {
	database: [],
	textFilter: "",
	typeFilter: "none",
};

export default function cerveceriadbReducer(state = initialState, action) {
	switch (action.type) {
		/**
		 * Setea la DB con un JSON enviando
		 */
		case "LOAD_DB":
			console.log("-->SETEANDO CERVECERIADB");
			console.log(action.data);
			return {
				...state,
				database: action.data,
			};
		/**
		 * Setea el texto que se utiliza para filtrar en listBeer
		 */
		case "SET_FILTER_TEXT":
			return {
				...state,
				textFilter: action.data,
			};
		/**
		 * Setea el tipo del filtro utilizado
		 */
		case "SET_FILTER_TYPE":
			return {
				...state,
				typeFilter: action.data,
			};
		default:
			return state;
	}
}
