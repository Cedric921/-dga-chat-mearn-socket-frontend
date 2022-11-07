// 'use client';

import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/features/auth/authSlice';
import { getUsers } from '../services/features/messages/messageSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../services/store';

export default function Home() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: any) => state.auth);
	const { messages, users } = useSelector((state: any) => state.messages);

	useEffect(() => {
		if (!user) router.push('/auth/login');
		if (user) dispatch(getUsers(user.token));
	}, [user, dispatch]);

	const logoutUser = () => {
		dispatch(logout());
		router.replace('/auth/login');
	};

	useEffect(() => {}, [user]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='fixed top-0 bottom-0 left-0 right-0 bg-blue-900 flex flex-column '>
				{/* aside for user and rooms */}
				<aside className='relative w-20 bg-gray-900 p-2 text-white'>
					<div className='profile w-full h-12 bg-slate-100 rounded-xl'></div>
					<p className='text-center text-xs'>{user && user.name}</p>
					<button
						className='absolute bottom-2 left-2 w-12 h-12 bg-slate-100 hover:bg-blue-800 hover:text-white duration-700 animate-bounce rounded-xl text-blue-900 flex items-center justify-center'
						onClick={logoutUser}
					>
						log
					</button>
				</aside>

				{/* aside for users */}
				<div className=' top-2 bottom-2 left-20 w-80 bg-slate-800 rounded-xl p-2 pt-4 mx-4 my-2'>
					<form className='w-full'>
						<input
							type='text'
							name='search'
							className='w-full rounded-md p-2'
							placeholder='Chercher un membre'
						/>
					</form>
					<div className='users h-full'>
						{users ? (
							<div className='h-full '>
								{users.map((user: any) => (
									<div className=' my-2 p-2 rounded text-white flex flex-row items-center hover:bg-blue-800 duration-700 hover:animate-pulse border-b-indigo-800'>
										<div className='profile-img w-10 h-10 bg-slate-50 mr-2 rounded-full'></div>
										<div>
											<h3 className='text-md'>
												<span>{user.name}</span> <span>{user.lastname}</span>
											</h3>
											<h5 className='text-xs text-blue-400'>
												@{user.username}
											</h5>
										</div>
									</div>
								))}
							</div>
						) : (
							<p>Les autres memebres ne sont pas disponibles</p>
						)}
					</div>
				</div>

				{/* Main messages */}
				<div className=' top-2 bottom-2 left-20 w-full bg-gray-900 rounded-xl p-4 ml-0 mr-2 my-2 flex flex-col items-center justify-center'>
					<h2 className='text-3xl text-slate-100 font-extrabold m-2'>
						Welcome <span className='text-blue-900'>{user && user?.name}</span>{' '}
						<span className='text-blue-900'>{user && user?.lastname}</span>
					</h2>
					<p className='text-slate-50'>
						Select please one contact to start a chat{' '}
					</p>
				</div>
			</main>
		</div>
	);
}
