import Link from 'next/link';
import React from 'react';
import { VscChevronLeft } from 'react-icons/vsc';

const ChatHeader = (props: any) => {
	return (
		<div className=' w-full bg-slate-600 rounded-t-xl p-2 flex items-center gap-2 text-white'>
			<div className='rounded-full hover:bg-slate-700 transition-all duration-700 w-12 h-12 flex justify-center items-center cursor-pointer  text-2xl'>
				<Link href='/'>
					<VscChevronLeft />
				</Link>
			</div>
			<div className='rounded-full w-12 h-12 bg-slate-100'></div>
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

export default ChatHeader;
