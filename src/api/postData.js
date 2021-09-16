export default (urlPost, parametros) => {
	return fetch(urlPost, {
		method: "POST",
		headers: new Headers({
			Accept: "application/json",
			"Content-Type": "application/json",
		}),
		body: JSON.stringify(parametros),
	})
		.then((response) => Promise.all([response, response.text()]))
		.catch((err) => {
			alert("Se produjo un error al intentar votar de forma alternativa");
			console.log(err);
		});
};
