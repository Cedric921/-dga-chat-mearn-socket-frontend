import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMessages,
	getUsersMessages,
} from '../services/features/messages/messageSlice';
import { getUsers } from '../services/features/users/usersSlice';
import { AppDispatch } from '../services/store';
import User from './skeleton/User';

const AsideUsers = () => {
	const { user: connectedUser } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const { users, isLoading } = useSelector((state: any) => state.users);
	const { users: usersMessages, isLoading: isLoadingMsg } = useSelector(
		(state: any) => state.messages
	);

	useEffect(() => {
		console.log(' ===>aside user useEffect');

		dispatch(getUsersMessages());
		dispatch(getUsers());
	}, []);

	return (
		<div className='hidden sm:flex top-2 bottom-2  w-80 bg-slate-700 rounded-none p-2 pt-4 ml-0 mr-0 my-0  flex-col '>
			<div className='users min-w-max overflow-y-scroll'>
				<h2 className='text-2xl ml-2 font-extrabold text-blue-400'>Messages</h2>
				{isLoadingMsg ? (
					<div className='flex flex-wrap flex-col justify-end items-end text-slate-100  w-full p-2 skeleton'>
						<User />
						<User />
						<User />
					</div>
				) : (
					<>
						{usersMessages && usersMessages.length > 0 ? (
							<div className=''>
								{usersMessages.map((user: any) => (
									<div key={user._id}>
										{user?._id.toString() != connectedUser?._id.toString() ? (
											<Link href={`/messages/${user._id}`}>
												<div
													key={user._id}
													className=' my-2 mr-2 p-2 rounded text-white flex flex-row items-center hover:bg-blue-800 duration-700 hover:animate-pulse min-w-max'
												>
													<div className='profile-img w-10 h-10 border-slate-50 mr-2 rounded-full cursor-pointer  text-gray-800 text-5xl flex items-center justify-center font-bold p-0'>
														{user && user.imageUrl != undefined ? (
															<div className='h-full w-full'>
																<img
																	src={
																		process.env.NEXT_PUBLIC_BACKEND_URI +
																		user.imageUrl
																	}
																	width={'100%'}
																	height='100%'
																	className='w-full h-full rounded-full'
																/>
															</div>
														) : (
															<FaUserCircle />
														)}
													</div>
													<div className='w-full'>
														<h3 className='text-md cursor-pointer'>
															<span>{user.name}</span>{' '}
															<span>{user.lastname}</span>
														</h3>
														<div className='text-xs text-slate-400 flex justify-between w-full'>
															<h5>{user.message?.substring(0, 5)} ...</h5>
															<h5>
																{new Date(user.date).toLocaleDateString()}
															</h5>
														</div>
													</div>
												</div>
											</Link>
										) : (
											<></>
										)}
									</div>
								))}
							</div>
						) : (
							<div className='flex flex-wrap flex-col justify-end items-end text-slate-100 w-full p-2 pb-20'>
								<User />
								<User />
								<User />
							</div>
						)}
					</>
				)}
				<div className='w-full'>
					{isLoading ? (
						<div className='flex flex-wrap flex-col justify-end items-end text-slate-100 w-full p-2'>
							<h2 className='text-2xl ml-2 font-extrabold text-blue-400 pt-2 self-start'>
								Contacts
							</h2>
							<User />
							<User />
							<User />
						</div>
					) : (
						<>
							{users ? (
								<div className=''>
									<h2 className='text-2xl ml-2 font-extrabold text-blue-400 pt-2'>
										Contacts
									</h2>
									{users.map((user: any) => (
										<div key={user._id}>
											{user?._id.toString() != connectedUser?._id.toString() ? (
												<Link href={`/messages/${user._id}`}>
													<div
														key={user._id}
														className=' my-2 mr-2 p-2 rounded text-white flex flex-row items-center hover:bg-blue-800 duration-700 hover:animate-pulse min-w-max'
													>
														<div className='profile-img w-10 h-10 border-slate-50 mr-2 rounded-full cursor-pointer  text-gray-800 text-5xl flex items-center justify-center font-bold p-0'>
															{user && user.imageUrl != undefined ? (
																<div className='h-full w-full'>
																	<img
																		src={
																			process.env.NEXT_PUBLIC_BACKEND_URI +
																			user.imageUrl
																		}
																		width={'100%'}
																		height='100%'
																		className='w-full h-full rounded-full'
																	/>
																</div>
															) : (
																<FaUserCircle />
															)}
														</div>
														<div>
															<h3 className='text-md cursor-pointer'>
																<span>{user.name}</span>{' '}
																<span>{user.lastname}</span>
															</h3>
															<div className='text-xs text-slate-400 flex justify-between w-full'>
																<h5>@{user.username}</h5>
															</div>
														</div>
													</div>
												</Link>
											) : (
												<></>
											)}
										</div>
									))}
								</div>
							) : (
								<p>Les autres membres ne sont pas disponibles</p>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AsideUsers;
