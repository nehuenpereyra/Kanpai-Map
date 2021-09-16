mode = "unlocked";

export default function drawerModeReducer(state = mode, action) {
	switch (action.type) {
		case "SET_UNLOCKED":
			return {
				mode: "unlocked",
			};
		case "SET_LOCKED_CLOSED":
			return {
				mode: "locked-closed",
			};
		default:
			return state;
	}
}
