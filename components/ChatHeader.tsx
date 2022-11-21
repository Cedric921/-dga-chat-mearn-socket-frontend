import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { VscChevronLeft } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../services/features/messages/messageSlice';
import { AppDispatch } from '../services/store';

const ChatHeader = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { contact } = useSelector((state: any) => state.contact);

	useEffect(() => {
		if (!contact) router.replace('/');
		else dispatch(getMessages(contact._id));
	}, [contact]);
	return (
		<div className=' w-full bg-slate-800 rounded-t-xl p-2 flex items-center gap-2 text-white'>
			<div className='rounded-full bg-slate-800 hover:bg-slate-600 transition-all duration-700 w-12 h-12 flex justify-center items-center cursor-pointer  text-2xl'>
				<Link href='/'>
					<VscChevronLeft />
				</Link>
			</div>

			<div className='rounded-full w-14 h-14 border-slate-100 flex items-center justify-center'>
				{contact && contact.imageUrl != undefined ? (
					<div className='h-full w-full flex items-center justify-center'>
						<img
							src={contact.imageUrl}
							width={'100%'}
							height='100%'
							alt={contact && contact.name}
							className='w-full h-full rounded-full'
						/>
					</div>
				) : (
					<FaUserCircle className='text-slate-500 w-full h-full' />
				)}
			</div>

			<div>
				<h2 className='text-2xl'>
					{contact && contact.name} {contact && contact.lastname}
				</h2>
				<h6 className='text-xs text-blue-500'>
					@{contact && contact.username}
				</h6>
			</div>
		</div>
	);
};

export default React.memo(ChatHeader);
