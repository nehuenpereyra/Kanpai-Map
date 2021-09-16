const initialState = {
	dataMarker: [],
};

export default function markersReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_MARKERS":
			return {
				dataMarker: action.data,
			};
		default:
			return state;
	}
}
