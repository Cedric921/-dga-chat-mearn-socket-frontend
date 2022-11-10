import axios from 'axios';
import { iUsersIDMessage } from '../../../utils/types';

// api
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

const getMessages = async (usersIds: iUsersIDMessage, token: string) => {
	token = token || JSON.parse(localStorage.getItem('chat-gda-user')!).token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.post(
		`${API_URL}/api/v1/messages/getMessages`,
		usersIds,
		config
	);
	return res.data;
};

const addMessage = async (usersIds: iUsersIDMessage, token: string) => {
	token = token || JSON.parse(localStorage.getItem('chat-gda-user')!).token;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.post(
		`${API_URL}/api/v1/messages/addMessages`,
		usersIds,
		config
	);
	console.log(res.data);
	return res.data;
};

const messagesSerives = { getMessages, addMessage };
export default messagesSerives;
