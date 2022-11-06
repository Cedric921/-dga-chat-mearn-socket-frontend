import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messagesSerives from './messageService';

const initialState = {
	messages: null,
	users: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
};

//  get all users
export const getUsers = createAsyncThunk(
	'message/getUsers',
	async (token: string, thunkAPI) => {
		try {
			return await messagesSerives.getUsers(token);
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

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users = action.payload;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.users = [];
				state.isSuccess = false;
				state.isError = true;
				state.errorMessage = action.payload as string;
			});
	},
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
