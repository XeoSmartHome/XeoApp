import {API_URL} from "./api_routes_v_1.0.0.0";


/**
 * Make an async GET request to the server API.
 * @param {String} url
 * @param {Object} request_args
 * @return {Promise<any>}
 */
export const apiGetRequest = (url: string, request_args: {}) => {
	return fetch(`${url}?${new URLSearchParams(request_args)}`, {
		method: 'GET'
	}).then((response) => response.json());
};

/**
 * Make an async POST request to the server API.
 * @param {String} url
 * @param {Object} request_args
 * @return {Promise<any>}
 */
export const apiPostRequest = (url, request_args) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(request_args)
	}).then((response) => response.json());
};


const requests_types = {
	'GET': apiGetRequest,
	'POST': apiPostRequest
};

/**
 * Make an async request to the server API.
 * @param {{
 *     path: String,
 *     method: 'POST' | 'GET'
 * }} input
 * @param {Object} request_args
 * @return {*}
 */
export const apiRequest = (input, request_args) => {
	let url = `${API_URL}${input.path}`
	return requests_types[input.method](url, request_args);
}
