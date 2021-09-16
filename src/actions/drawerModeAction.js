//Permito que se pueda abrir el Drawer
export function setUnlocked() {
	return {
		type: "SET_UNLOCKED",
	};
}
//No permito que se pueda abrir el Drawer
export function setLockedClosed() {
	return {
		type: "SET_LOCKED_CLOSED",
	};
}
