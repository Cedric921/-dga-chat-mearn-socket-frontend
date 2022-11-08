import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messagesSerives from './messageService';
import { iThunkAPIUser, iUsersIDMessage } from '../../../utils/types';

const initialState = {
	messages: null,
	users: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
};

//  get all users

// get messages from user connected
export const getMessages = createAsyncThunk(
	'message/getMessages',
	async (usersData: any, thunkAPI) => {
		const { auth } = thunkAPI.getState() as iThunkAPIUser;
		const { token } = auth.user;
		const ids = {
			sender: auth.user._id || usersData.sender,
			receiver: usersData.receiver,
		};
		try {
			return await messagesSerives.getMessages(ids, token);
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
