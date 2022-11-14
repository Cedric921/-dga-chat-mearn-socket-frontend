import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/features/auth/authSlice';
import { AppDispatch } from '../../services/store';

const Header = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { user: connectedUser } = useSelector((state: any) => state.auth);
	const logoutUser = () => {
		dispatch(logout());
		router.replace('/auth/login');
	};
	return (
		<div className=' w-full bg-slate-800 flex sm:hidden justify-between items-center p-2'>
			<Link href='/auth/profil'>
				<div className='rounded-full w-16 h-16 border-slate-100 flex items-center justify-center cursor-pointer'>
					{connectedUser && connectedUser.imageUrl != undefined ? (
						<div className='h-full w-full flex items-center justify-center rounded-full'>
							<img
								src={connectedUser.imageUrl}
								width={'100%'}
								height='100%'
								className='w-full h-full rounded-full'
							/>
						</div>
					) : (
						<FaUserCircle className='text-slate-500 w-full h-full' />
					)}
				</div>
			</Link>
			<button
				className=' bottom-2 left-2 w-12 h-12 bg-slate-300 hover:bg-red-700 hover:text-white text-red-700 duration-700 animate-pulse rounded-xl text-red	-900 flex items-center justify-center'
				onClick={logoutUser}
			>
				<MdLogout />
			</button>
		</div>
	);
};

export default Header;
