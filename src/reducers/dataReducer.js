const initialState = {
	data: [],
	isFetching: false,
	error: false,
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case "FETCHING_DATA":
			return {
				...state,
				isFetching: true,
			};
		case "FETCHING_DATA_SUCCESS":
			return {
				...state,
				data: action.data,
				isFetching: false,
				error: false,
			};
		case "FETCHING_DATA_FAILURE":
			return {
				...state,
				isFetching: false,
				error: true,
			};
		case "SET_DATA_LOCAL":
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
