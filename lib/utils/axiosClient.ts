import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const axiosClient = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api`,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json, multipart/form-data',
	},
});

axiosClient.interceptors.request.use(async (config) => {
	const token = secureLocalStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export { axiosClient };
