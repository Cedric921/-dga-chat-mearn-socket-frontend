import Link from 'next/link';
import React from 'react';

const AsideUsers = (props: any) => {
	return (
		<div className=' top-2 bottom-2 left-20 w-80 bg-slate-700 rounded-xl p-2 pt-4 mx-4 my-2 flex flex-col '>
			<form className='w-full'>
				<input
					type='text'
					name='search'
					className='w-full rounded-md p-2'
					placeholder='Chercher un membre'
				/>
			</form>
			<div className='users h-full min-w-max overflow-y-scroll'>
				{props.users ? (
					<div className='h-full overflow-y-scroll'>
						{props.users.map((user: any) => (
							<div
								key={user._id}
								className=' my-2 p-2 rounded text-white flex flex-row items-center hover:bg-blue-800 duration-700 hover:animate-pulse border-b-indigo-800 min-w-max'
							>
								<Link href={`/messages/${user._id}`}>
									<div className='profile-img w-10 h-10 bg-slate-50 mr-2 rounded-full cursor-pointer'></div>
								</Link>
								<div>
									<Link href={`/messages/${user._id}`}>
										<h3 className='text-md cursor-pointer'>
											<span>{user.name}</span> <span>{user.lastname}</span>
										</h3>
									</Link>
									<h5 className='text-xs text-blue-400'>@{user.username}</h5>
								</div>
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
