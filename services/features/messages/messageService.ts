import axios from 'axios';
import { iUsersIDMessage } from '../../../utils/types';

// api
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

const getUsers = async () => {
	const token = JSON.parse(localStorage.getItem('chat-gda-user')!).token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.get(`${API_URL}/api/v1/users`, config);
	return res.data;
};

const getMessages = async (usersIds: iUsersIDMessage) => {
	const token = JSON.parse(localStorage.getItem('chat-gda-user')!).token;
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
		body: usersIds,
	};
	console.log(usersIds, token);
	const res = await axios.post(
		`${API_URL}/api/v1/messages/getMessages`,
		config
	);
	console.log(res.data);
	return res.data;
};

const messagesSerives = { getUsers, getMessages };
export default messagesSerives;
