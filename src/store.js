import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import getReducerApp from "./reducers";
import seguimientoAcciones from "./actions/seguimientoPantalla";

export default function getStore() {
	let store = createStore(getReducerApp(), undefined, applyMiddleware(thunk));
	return store;
}
