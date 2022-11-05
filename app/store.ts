import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import messageReducer from './features/messages/messageSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		messages: messageReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
