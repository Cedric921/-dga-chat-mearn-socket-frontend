import axios from 'axios';
import { iUsersIDMessage } from '../../../utils/types';

// api
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

const getMessages = async (receiverId: string, token: string) => {
	token = token || JSON.parse(localStorage.getItem('chat-gda-user')!).token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.get(
		`${API_URL}/api/v1/messages/${receiverId}`,
		config
	);
	return res.data;
};

const addMessage = async (
	content: string,
	receiverId: string,
	token: string
) => {
	token = token || JSON.parse(localStorage.getItem('chat-gda-user')!).token;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.post(
		`${API_URL}/api/v1/messages/${receiverId}`,
		content,
		config
	);
	console.log(res.data);
	return res.data;
};

const messagesSerives = { getMessages, addMessage };
export default messagesSerives;
