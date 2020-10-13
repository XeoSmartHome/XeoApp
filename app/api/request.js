

export default async function AsyncAPIRequest(input: RequestInfo, init?: RequestInit): Promise<Response> {
	const response = await fetch(input, init);
	switch (response) {
		case 200:
			return response;
		case 400:
			return response;
	}
};


AsyncAPIRequest('https://google.com', {
	method: 'POST',
	headers:{
	}
}).then( () => {}
)
