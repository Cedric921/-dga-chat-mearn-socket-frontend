import React from 'react';
import { logout } from '../services/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../services/store';
import { useRouter } from 'next/router';

const RoomAside = (props: any) => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: any) => state.auth);
	const router = useRouter();

	const logoutUser = () => {
		dispatch(logout());
		router.replace('/auth/login');
	};
	return (
		<aside className='relative w-20 bg-gray-900 p-2 text-white flex flex-col justify-between'>
			<div>
				<div className='profile w-full h-12 bg-slate-100 rounded-xl'></div>
				<p className='text-center text-xs'>{user && user.name}</p>
			</div>
			<button
				className=' bottom-2 left-2 w-12 h-12 bg-slate-100 hover:bg-blue-800 hover:text-white duration-700 animate-bounce rounded-xl text-blue-900 flex items-center justify-center'
				onClick={logoutUser}
			>
				log
			</button>
		</aside>
	);
};

export default RoomAside;
