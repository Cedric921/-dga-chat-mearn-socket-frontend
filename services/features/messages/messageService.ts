import axios from 'axios';
import { iUsersIDMessage } from '../../../utils/types';

// api
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

const getUsers = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.get(`${API_URL}/api/v1/users`, config);
	return res.data;
};

const getMessages = async (usersIds: iUsersIDMessage, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: usersIds,
	};
	const res = await axios.get(`${API_URL}/api/v1/users`, config);
	console.log(res.data);
	return res.data;
};

const messagesSerives = { getUsers, getMessages };
export default messagesSerives;
