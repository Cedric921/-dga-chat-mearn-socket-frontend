import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { VscChevronLeft } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { getMessages } from '../services/features/messages/messageSlice';
import { AppDispatch } from '../services/store';

const ChatHeader = (props: any) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMessages(props.user._id));
	}, [props]);
	return (
		<div className=' w-full bg-slate-800 rounded-t-xl p-2 flex items-center gap-2 text-white'>
			<div className='rounded-full bg-slate-800 hover:bg-slate-600 transition-all duration-700 w-12 h-12 flex justify-center items-center cursor-pointer  text-2xl'>
				<Link href='/'>
					<VscChevronLeft />
				</Link>
			</div>

			<div className='rounded-full w-16 h-16 border-slate-100 flex items-center justify-center'>
				{props.user && props.user.imageUrl != undefined ? (
					<div className='h-full w-full flex items-center justify-center'>
						<img
							src={process.env.NEXT_PUBLIC_BACKEND_URI + props.user.imageUrl}
							width={'100%'}
							height='100%'
							alt={props.user.name}
							className='w-full h-full rounded-full'
						/>
					</div>
				) : (
					<FaUserCircle className='text-slate-500 w-full h-full' />
				)}
			</div>

			<div>
				<h2 className='text-2xl'>
					{props.user && props.user.name} {props.user && props.user.lastname}
				</h2>
				<h6 className='text-xs text-blue-500'>
					@{props.user && props.user.username}
				</h6>
			</div>
		</div>
	);
};

export default React.memo(ChatHeader);
