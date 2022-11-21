import React from 'react';
import { logout } from '../services/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../services/store';
import { useRouter } from 'next/router';
import { MdLogout } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';
import AsideUsers from './mobile/Users';

const RoomAside = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: any) => state.auth);
	const router = useRouter();

	const logoutUser = () => {
		dispatch(logout());
		router.replace('/auth/login');
	};
	return (
		<aside className='hidden relative w-20 bg-gray-900 p-2 text-white md:flex flex-col justify-between'>
			<div className='cursor-pointer'>
				<Link href='/auth/profil'>
					<div className='profile w-full h-12 bg-slate-100 text-gray-800 text-4xl   font-bold rounded-xl flex items-center justify-center'>
						{user && user.imageUrl ? (
							<div className='h-full w-full'>
								<img
									src={user.imageUrl}
									width={'100%'}
									height='100%'
									className='w-full h-full rounded-xl'
								/>
							</div>
						) : (
							<div>
								<CiUser />
							</div>
						)}
					</div>
				</Link>
				<p className='text-center text-xs'>{user && user.name}</p>
			</div>
			<button
				className=' bottom-2 left-2 w-12 h-12 bg-slate-300 hover:bg-red-700 hover:text-white text-red-700 duration-700 animate-pulse rounded-xl text-red	-900 flex items-center justify-center'
				onClick={logoutUser}
			>
				<MdLogout />
			</button>
		</aside>
	);
};

export default RoomAside;
