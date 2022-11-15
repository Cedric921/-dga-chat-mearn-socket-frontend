import React, {
	FormEvent,
	KeyboardEvent,
	KeyboardEventHandler,
	useState,
} from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { MdSend } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessage,
	getMessages,
} from '../services/features/messages/messageSlice';
import { AppDispatch } from '../services/store';

const ChatForm = (props: any) => {
	const [messageInput, setMessageInput] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: any) => state.auth);

	const handleChange = (e: any) => {
		setMessageInput(e.target.value);
	};
	const handleSend = () => {
		const formData = new FormData();
		formData.append('content', messageInput);
		const receiverID: string = props.receiver._id;
		dispatch(addMessage({ formData, receiverID }));
		dispatch(getMessages(receiverID));
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSend();
		setMessageInput('');
	};
	return (
		<div className='absolute bottom-0 left-0 right-0 bg-slate-600 text-slate-100 rounded-b-xl p-0 sm:p-2 min-h-max'>
			<form
				onSubmit={handleSubmit}
				className='flex justify-between items-center min-h-max h-24 sm:h-14'
			>
				{/* <span>icon</span> */}
				<div className='bg-slate-400 flex items-center w-full h-full mx-0    rounded-none sm:rounded-xl'>
					<textarea
						name=''
						id=''
						className='w-full h-full rounded-none sm:rounded-l-xl focus:border-0 bg-slate-400 m-0 text-slate-900 px-2 box-border'
						value={messageInput}
						onChange={handleChange}
						onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
							if (e.code === 'Enter') handleSend();
						}}
					></textarea>
					<button
						type='submit'
						className='w-16 h-full sm:h-14  bg-slate-900 text-slate-200 flex justify-center items-center text-2xl rounded-none sm:rounded-r-xl hover:animate-pulse hover:shadow-xl'
					>
						<MdSend />
					</button>
				</div>
				<button className='w-14 h-14 ml-2 hidden sm:flex bg-slate-900 text-slate-200  justify-center items-center text-2xl rounded-full animate-pulse hover:shadow-xl'>
					<BiImageAdd />
				</button>
			</form>
		</div>
	);
};

export default React.memo(ChatForm);
