import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/features/auth/authSlice';
import { AppDispatch } from '../../services/store';
import Header from './Header';

const AsideUsers = () => {
	const { user: connectedUser } = useSelector((state: any) => state.auth);
	const { users } = useSelector((state: any) => state.users);
	return (
		<div className='flex sm:hidden top-2 bottom-2  w-full bg-gray-900 rounded-none p-0 m-0  flex-col '>
			<Header />
			{/* main users */}
			<div className='users h-full min-w-max overflow-y-scroll'>
				{users ? (
					<div className='h-full overflow-y-scroll'>
						{users.map((user: any) => (
							<div key={user._id}>
								{user.email != connectedUser?.email ? (
									<div
										key={user._id}
										className=' my-2 mr-2 p-2 rounded text-white flex flex-row items-center hover:bg-blue-800 duration-700 hover:animate-pulse min-w-max'
									>
										<Link href={`/messages/${user._id}`}>
											<div className='profile-img w-20 h-20 border-slate-50 mr-2 rounded-full cursor-pointer  text-slate-600  text-5xl flex items-center justify-center font-bold p-0'>
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
													<div>
														<FaUserCircle className='w-20 h-20  ' />
													</div>
												)}
											</div>
										</Link>
										<Link href={`/messages/${user._id}`}>
											<div>
												<h3 className='text-2xl cursor-pointer'>
													<span>{user.name}</span> <span>{user.lastname}</span>
												</h3>
												<h5 className='text-xl text-slate-400'>
													@{user.username}
												</h5>
											</div>
										</Link>
									</div>
								) : (
									<></>
								)}
							</div>
						))}
					</div>
				) : (
					<p>Les autres memebres ne sont pas disponibles</p>
				)}
			</div>
		</div>
	);
};

export default AsideUsers;
