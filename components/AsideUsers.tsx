import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const AsideUsers = (props: any) => {
	return (
		<div className='hidden md:flex top-2 bottom-2  w-80 bg-slate-700 rounded-none p-2 pt-4 ml-0 mr-0 my-0  flex-col '>
			{/* <form className='w-full'>
				<input
					type='text'
					name='search'
					className='w-full rounded-md p-2'
					placeholder='Chercher un membre'
				/>
			</form> */}
			<div className='users h-full min-w-max overflow-y-scroll'>
				{props.users ? (
					<div className='h-full overflow-y-scroll'>
						{props.users.map((user: any) => (
							<>
								{user.email != props.user?.email ? (
									<div
										key={user._id}
										className=' my-2 mr-2 p-2 rounded text-white flex flex-row items-center hover:bg-blue-800 duration-700 hover:animate-pulse min-w-max'
									>
										<Link href={`/messages/${user._id}`}>
											<div className='profile-img w-10 h-10 bg-slate-50 mr-2 rounded-full cursor-pointer  text-gray-800 text-5xl flex items-center justify-center font-bold p-0'>
												{user.img ? <p></p> : <FaUserCircle />}
											</div>
										</Link>
										<div>
											<Link href={`/messages/${user._id}`}>
												<h3 className='text-md cursor-pointer'>
													<span>{user.name}</span> <span>{user.lastname}</span>
												</h3>
											</Link>
											<h5 className='text-xs text-blue-400'>
												@{user.username}
											</h5>
										</div>
									</div>
								) : (
									<p></p>
								)}
							</>
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
