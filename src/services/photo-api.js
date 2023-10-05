import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchPhoto(name, page) {
	const searchParams = new URLSearchParams({
		q: name,
		page: page,
		key: '39744117-e96b008e006f9d85bd3c2ab50',
		image_type: 'photo',
		orientation: 'horizontal',
		per_page: 12,
	});

	const response = await axios.get(`?${searchParams}`);
	return response.data;
}

// function fetchPhoto(name, page) {
// 	return fetch(
// 		`https://pixabay.com/api/?q=${name}&page=${page}&key=39744117-e96b008e006f9d85bd3c2ab50&image_type=photo&orientation=horizontal&per_page=12`
// 	).then((response) => {
// 		if (response.ok) {
// 			return response.json();
// 		}
// 		return Promise.reject(new Error(`Немає фото з назвою ${name}`));
// 	});
// }

const api = {
	fetchPhoto,
};

export default api;
