class ConfigModel {
	static getID(model) {
		return model.id;
	}

	static getIp(model) {
		return model.currentIp;
	}

	static getUrlPublicidad(model) {
		let newData = [];
		model.urlPubGaleria.map((data) => {
			newData.push(this.getIp(model) + data);
		});
		return newData;
	}

	static getListFilter(model) {
		newFilter = [
			{
				type: "none",
				name: "Ninguno",
				endPoint: "",
			},
		];
		model.listFilter.map((data) => {
			newFilter.push(data);
		});
		return newFilter;
	}

	/**
	 * [!] Importante que typeFilter sea un string con un valor igual a algun type de Filtro
	 * Ver de mejorar la syntaxis pero muchos errores hasta que funcionara
	 * @param {Json} model
	 * @param {String} typeFilter
	 */
	static getEndPoint(model, typeFilter) {
		for (let index = 0; index < model.listFilter.length; index++) {
			if (model.listFilter[index].type === typeFilter) {
				return model.listFilter[index].endPoint;
			}
		}
	}
}

export { ConfigModel };
