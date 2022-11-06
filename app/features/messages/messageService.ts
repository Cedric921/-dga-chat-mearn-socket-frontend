import axios from 'axios';

// api
const API_URL = 'http://localhost:1986';

const getUsers = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.get(`${API_URL}/api/v1/users`, config);
	console.log(res.data);
	return res.data;
};

const messagesSerives = { getUsers };
export default messagesSerives;
