const initialState = {
	mensaje: "",
	isSubmit: false,
	error: false,
};

export default function postReducer(state = initialState, action) {
	switch (action.type) {
		case "SUBMIT_DATA":
			return {
				...state,
				isSubmit: true,
			};
		case "SUBMIT_DATA_SUCCESS":
			return {
				...state,
				mensaje: action.data,
				isSubmit: false,
				error: false,
			};
		case "SUBMIT_DATA_FAILURE":
			return {
				...state,
				isSubmit: false,
				error: true,
			};
		default:
			return state;
	}
}
