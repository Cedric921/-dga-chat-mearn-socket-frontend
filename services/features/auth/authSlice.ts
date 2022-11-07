import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { iUserLoginInput, iUserSignupInput } from '../../../utils/types';

//  initial state
let user;
if (typeof window !== 'undefined') {
	if (localStorage.getItem('chat-gda-user')) {
		user = JSON.parse(localStorage.getItem('chat-gda-user')!);
	} else {
		user = null;
	}
}

// const user = JSON.parse(localStorage.getItem('chat-gda-user')!);
const initialState = {
	user: user || null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
};

// actions
export const login = createAsyncThunk(
	'auth/login',
	async (user: iUserLoginInput, thunkAPI) => {
		try {
			return await authService.loginUser(user);
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (userData: iUserSignupInput, thunkAPI) => {
		try {
			return await authService.registerUser(userData);
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('chat-gda-user');
	return await authService.logout();
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.user = null;
				state.isError = true;
				state.errorMessage = action.payload as string;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.user = null;
				state.isError = true;
				state.errorMessage = action.payload as string;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
