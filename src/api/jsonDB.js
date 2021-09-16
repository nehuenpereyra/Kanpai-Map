export default (url) => {
	return fetch(url).then((response) =>
		Promise.all([response, response.json()])
	);
};
