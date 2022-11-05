import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { iUser } from '../../../utils/types';

//  initial state
const initialState = {
	user: null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
};

// actions
export const login = createAsyncThunk('auth/login', async (_, thunkAPI) => {
	try {
		return await authService.loginUser();
	} catch (error) {
		const message = error;
		return thunkAPI.rejectWithValue(message);
	}
});

export const register = createAsyncThunk(
	'auth/register',
	async (_, thunkAPI) => {
		try {
			return await authService.registerUser();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState,
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
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
