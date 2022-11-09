import React, { useState } from 'react';
import { VscArrowDown } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

const ChatItems = (props: any) => {
	const { user } = useSelector((state: any) => state.auth);

	return (
		<div className='p-4 text-white h-full'>
			{props.messages && props.messages.length > 0 ? (
				<div>
					{props.messages.map((msg: any) => (
						<div
							className='flex flex-col h-full overflow-y-scroll'
							key={msg._id}
						>
							{msg.sender === user?._id.toString() ? (
								<div className='p-4 bg-blue-900 w-max rounded-lg m-2 self-end'>
									<div className='flex items-center justify-between mb-2'>
										<h6 className='text-xs text-slate-400'>
											<span>{user && user.name}</span>{' '}
											<span>{user && user.lastname}</span>
										</h6>
										<h6 className='text-xs  text-slate-400'>
											{new Date(msg.updatedAt).toLocaleTimeString()}
										</h6>
									</div>
									<p>{msg.content}</p>
								</div>
							) : (
								<div className='p-2 bg-slate-700 w-max rounded-lg m-2 self-start'>
									<div className='flex items-center justify-between mb-2'>
										<h6 className='text-xs  text-slate-400'>
											<span>{props.receiver && props.receiver.name}</span>{' '}
											<span>{props.receiver && props.receiver.lastname}</span>
										</h6>
										<h6 className='text-xs text-slate-400'>
											{new Date(msg.updatedAt).toLocaleTimeString()}
										</h6>
									</div>
									<p>{msg.content}</p>
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				<div className='h-full w-full flex flex-col items-center justify-center'>
					<h3 className='text-3xl font-extrabold text-blue-800'>
						<span>{props.receiver && props.receiver.name}</span>{' '}
						<span>{props.receiver && props.receiver.lastname}</span>
					</h3>
					<p>Vous pouvez commencer la converation </p>
					<span>
						<VscArrowDown className='animate-bounce text-4xl font-extrabold' />
					</span>
				</div>
			)}
			{props.isError && (
				<div className='w-full h-full flex items-center justify-center'>
					<p>Une erreur est survenu lors du chargement des messages</p>
				</div>
			)}
		</div>
	);
};

export default ChatItems;
