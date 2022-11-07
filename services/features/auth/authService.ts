import { iUserSignupInput, iUserLoginInput } from '../../../utils/types';
import axios from 'axios';

// api
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

const registerUser = async (userData: iUserSignupInput) => {
	const res = await axios.post(`${API_URL}/api/v1/users/signup`, userData);
	console.log(res.status);
	localStorage.setItem('chat-gda-user', JSON.stringify(res.data));
	return res.data;
};

//  login func
const loginUser = async (user: iUserLoginInput) => {
	const res = await axios.post(`${API_URL}/api/v1/users/login`, user);

	localStorage.setItem('chat-gda-user', JSON.stringify(res.data));
	return res.data;
};

// logout func
const logout = async () => {
	localStorage.removeItem('user');
};

const authService = { loginUser, registerUser, logout };

export default authService;
