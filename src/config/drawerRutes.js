import Inicio from "../components/containersNav/inicio";
import promocionesNav from "../components/containersNav/promocionesNav";
import TiposCervezas from "../components/containersNav/tiposCervezas";
import CervezeriasNav from "../components/containersNav/cervezeriasNav";
import AgregarCevNav from "../components/containersNav/agregarCevNav";
import Configuracion from "../components/containersNav/configuracionNav";

// Rutas del Menu Drawer
const Routes = {
	Inicio: { screen: Inicio },
	Cervezerias: { screen: CervezeriasNav },
	Promociones: { screen: promocionesNav },
	TiposCervezas: { screen: TiposCervezas },
	AgregarCer: { screen: AgregarCevNav },
	config: { screen: Configuracion },
};

export default Routes;
