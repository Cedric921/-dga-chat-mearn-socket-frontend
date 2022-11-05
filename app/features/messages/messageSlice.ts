import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	messages: null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		// builder.addCase();
	},
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
