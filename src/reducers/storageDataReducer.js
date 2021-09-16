const initialState = {
	data: [],
	isFetching: false,
	error: false,
};

export default function storageDataReducer(state = initialState, action) {
	switch (action.type) {
		case "FETCHING_DATA_STORAGE":
			return {
				...state,
				isFetching: true,
			};
		case "FETCHING_DATA_STORAGE_SUCCESS":
			return {
				...state,
				data: action.data,
				isFetching: false,
				error: false,
			};
		case "FETCHING_DATA_STORAGE_FAILURE":
			return {
				...state,
				isFetching: false,
				error: true,
			};
		case "SET_DATA_STORAGE_LOCAL":
			return {
				...state,
				data: action.data,
				isFetching: false,
				error: false,
			};
		default:
			return state;
	}
}
