import { iUser, iUserLoginInput } from '../../../utils/types';
import axios from 'axios';

// api
const API_URL = 'http://localhost:1986';

const registerUser = async () => {
	const user = {
		name: 'Jopsin',
		lastname: 'kanane',
		email: 'jospin@test.com',
		password: '123456',
		username: 'arick',
	};
	const res = await axios.post(`${API_URL}/api/v1/users/signup`, user);
	console.log(res.status);
	localStorage.setItem('chat-gda-user', JSON.stringify(res.data.token));
	return res.data;
};

//  login func
const loginUser = async (user: iUserLoginInput) => {
	const res = await axios.post(`${API_URL}/api/v1/users/login`, user);

	localStorage.setItem('chat-gda-user', JSON.stringify(res.data.token));
	return res.data;
};

// logout func
const logout = async () => {
	localStorage.removeItem('user');
};

const authService = { loginUser, registerUser, logout };

export default authService;
