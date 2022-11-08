import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/features/auth/authSlice';
import messageReducer from '../services/features/messages/messageSlice';
import userReducer from './features/users/usersSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		messages: messageReducer,
		users: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
