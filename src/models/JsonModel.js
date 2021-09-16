class JsonModel {
	static getID(model) {
		return model.id;
	}

	static getTitulo(model) {
		return model.titulo;
	}

	static getTelefono(model) {
		return model.telefono;
	}

	static getDescripcion(model) {
		return model.descripcion;
	}

	static getGaleria(model, host) {
		let galeria = [];
		model.galeria.forEach((element) => {
			galeria.push(host + element);
		});
		return galeria;
	}

	static getHorario(model) {
		return model.horario;
	}

	static getIcono(model) {
		return model.icono;
	}

	static getLocation(model) {
		return model.location;
	}

	static getMail(model) {
		return model.mail;
	}

	static getPortada(model) {
		return model.portada;
	}

	static getPromo(model) {
		return model.promo;
	}

	static getRedSocial(model) {
		return model.redSocial;
	}

	static getServicio(model) {
		return model.servicio;
	}

	static getWebsite(model) {
		return model.website;
	}

	static getLocalidad(model) {
		return model.localidad;
	}

	static getDireccion(model) {
		return model.direccion;
	}
}

export { JsonModel };
