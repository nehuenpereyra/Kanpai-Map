import React from "react";

/**
 * Importo las funciones de Redux
 */
import { Provider } from "react-redux";
import getStore from "./store";

/**
 * Importo el menu principal (dentro se definen las rutas)
 */
import MainDrawer from "./navigators/MainDrawer";

const App = () => (
	<Provider store={getStore()}>
		<MainDrawer />
	</Provider>
);

/**
 * Exporto App para ser llamada en index.android.js
 */
export default App;
