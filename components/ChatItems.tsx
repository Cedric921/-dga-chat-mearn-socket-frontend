import React, { useEffect, useState } from 'react';
import { VscArrowDown } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

const ChatItems = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { contact } = useSelector((state: any) => state.contact);
	const { messages, isError } = useSelector((state: any) => state.messages);

	return (
		<div className='p-4 text-white overflow-y-scroll'>
			{messages && messages.length > 0 ? (
				<div className='pb-20 sm:pb-16'>
					{messages.map((msg: any) => (
						<div className='flex flex-col h-full ' key={msg._id}>
							{msg.sender === user?._id.toString() ? (
								<div className='p-4 bg-blue-900 w-max   max-w-full rounded-2xl rounded-br-none m-2 self-end'>
									<div className='w-full flex items-center justify-between mb-2'>
										<h6 className='text-xs text-slate-400'>
											<span>{msg.sender && msg.sender.name}</span>{' '}
											<span>{msg.sender && msg.sender.lastname}</span>
										</h6>
										<span className='text-blue-900'> __ </span>
										<h6 className='text-xs  text-slate-400'>
											{new Date(msg.updatedAt).toLocaleTimeString()}
										</h6>
									</div>
									<p className='text-sm md:text-lg w-full h-max p-1'>
										{msg.content}
									</p>
								</div>
							) : (
								<div className='p-2 bg-slate-700 w-max max-w-full rounded-2xl rounded-bl-none m-2 self-start'>
									<div className='flex items-center justify-between mb-2'>
										<h6 className='text-xs  text-slate-400'>
											<span>{contact && contact.name}</span>
											<span>{contact && contact.lastname}</span>
										</h6>
										<span className='text-slate-700'> __ </span>

										<h6 className='text-xs text-slate-400'>
											{new Date(msg.updatedAt).toLocaleTimeString()}
										</h6>
									</div>
									<p className='text-sm md:text-lg'>{msg.content}</p>
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				<div className='absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center'>
					<h3 className='text-3xl font-extrabold text-blue-800'>
						<span>{contact && contact.name}</span>{' '}
						<span>{contact && contact.lastname}</span>
					</h3>
					<p>Vous pouvez commencer la converation </p>
					<span>
						<VscArrowDown className='animate-bounce text-4xl font-extrabold' />
					</span>
				</div>
			)}
			{isError && (
				<div className='w-full h-full flex items-center justify-center'>
					<p>Une erreur est survenu lors du chargement des messages</p>
				</div>
			)}
		</div>
	);
};

export default React.memo(ChatItems);
