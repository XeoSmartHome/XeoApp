

export const apiGetRequest = (url: string, request_args: {}) => {
	return fetch(`${url}?${new URLSearchParams(request_args)}`, {
		method: 'GET'
	}).then( (response) => response.json());
};

export const apiPostRequest = (url: string, request_args: {}) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(request_args)
	}).then( (response) => response.json());
};


/*
export const apiPostRequest = (url: string, request_args: {}) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(request_args)
	}).then( (response) => response.json().catch(
		() => {
			console.warn(this);
			return Promise.reject('json_parsing_error');
		}));
};
* */
