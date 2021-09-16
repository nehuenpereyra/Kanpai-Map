/**
 * Estado inicial
 */
const initialState = {
	localidad: "/laplata",
};

export default function configLocalReducer(state = initialState, action) {
	switch (action.type) {
		/**
		 * Setea la DB con un JSON enviando
		 */
		case "LOAD_LOCALIDAD":
			return {
				...state,
				localidad: action.data,
			};
		default:
			return state;
	}
}
