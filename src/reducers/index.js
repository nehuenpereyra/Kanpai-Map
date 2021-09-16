import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import drawerModeReducer from "./drawerModeReducer";
import markersReducer from "./markersReducer";
import cerveceriadbReducer from "./cerveceriadbReducer";
import storageDataReducer from "./storageDataReducer";
import postReducer from "./postReducer";
import configLocalRedcuer from "./configLocalReducer";

/**
 * Combina todos los reducers
 * [laplataDB]: base de datos descargada de internet
 * [drawerMode]: permite desabilitar en cualquier momento el acceso a la barra lateral
 * [marcador]:
 * [cerveceriadb]: se inicializa con el valor de laplataDB y es utilizada por las vistas para visualizar los documentos
 * [configLocal]: mantiene las configuraciones locales del usuario
 * [storageDataReducer]: permite descargar Json y almacenarlos en cache (solo formato Json ya que se parcea)
 * [filtrodb]: permite hacer un fetch y descargar el contenido del json
 * [statePost]: permite hacer un post al servidor
 */

export default function getReducerApp() {
	return combineReducers({
		drawerMode: drawerModeReducer,
		marcador: markersReducer,
		cerveceriadb: cerveceriadbReducer,
		storageData: createNamedWrapperReducer(
			storageDataReducer,
			"cerveceriadb"
		),
		config: createNamedWrapperReducer(storageDataReducer, "config"),
		configLocal: configLocalRedcuer,
		filtrodb: createNamedWrapperReducer(dataReducer, "filtrodb"),
		statePost: postReducer,
		legal: createNamedWrapperReducer(storageDataReducer, "legal"),
	});
}

/**
 * Permite reutilizar reducers definiendole un 'name' a las acciones para
 * definir a que reducer va dirigido
 * @param {Reducer} reducerFunction
 * @param {String} reducerName
 */
function createNamedWrapperReducer(reducerFunction, reducerName) {
	return (state, action) => {
		const { name } = action;
		const isInitializationCall = state === undefined;
		if (name !== reducerName && !isInitializationCall) return state;
		return reducerFunction(state, action);
	};
}
