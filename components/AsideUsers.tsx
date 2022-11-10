import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AsideUsers = () => {
	const { user: connectedUser } = useSelector((state: any) => state.auth);
	const {
		users,
		isError: isErrorUsers,
		errorMessage: errorUsers,
	} = useSelector((state: any) => state.users);
	return (
		<div className='hidden md:flex top-2 bottom-2  w-80 bg-slate-700 rounded-none p-2 pt-4 ml-0 mr-0 my-0  flex-col '>
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
											<div className='profile-img w-10 h-10 bg-slate-50 mr-2 rounded-full cursor-pointer  text-gray-800 text-5xl flex items-center justify-center font-bold p-0'>
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
										</Link>
										<Link href={`/messages/${user._id}`}>
											<div>
												<h3 className='text-md cursor-pointer'>
													<span>{user.name}</span> <span>{user.lastname}</span>
												</h3>
												<h5 className='text-xs text-blue-400'>
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
