import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messagesSerives from './messageService';
import { iUsersIDMessage } from '../../../utils/types';

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
	async (_, thunkAPI) => {
		try {
			return await messagesSerives.getUsers();
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

// get messages from user connected
export const getMessages = createAsyncThunk(
	'message/getMessages',
	async (usersData: any, thunkAPI) => {
		const token = JSON.parse(localStorage.getItem('chat-gda-user')!).token;
		const ids = {
			sender:
				JSON.parse(localStorage.getItem('chat-gda-user')!)._id ||
				usersData.sender,
			receiver: usersData.receiver,
		};
		try {
			return await messagesSerives.getMessages(ids);
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
				state.users = action.payload.users;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.users = [];
				state.isSuccess = false;
				state.isError = true;
				state.errorMessage = action.payload as string;
			})
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.messages = action.payload;
				state.isSuccess = true;
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.messages = null;
				state.isError = true;
				state.errorMessage = action.payload as string;
			});
	},
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
