class ConfigLocalModel {
	static getLocalidad(localidad) {
		switch (localidad) {
			case "/laplata":
				return "La Plata";
				break;
			default:
				break;
		}
	}
}

export { ConfigLocalModel };
