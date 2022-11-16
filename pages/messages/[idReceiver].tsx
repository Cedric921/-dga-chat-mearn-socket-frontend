import axios from 'axios';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMessages,
	getUsersMessages,
} from '../../services/features/messages/messageSlice';
import { getUsers } from '../../services/features/users/usersSlice';
import { AppDispatch } from '../../services/store';
import RoomAside from '../../components/RoomAside';
import AsideUsers from '../../components/AsideUsers';
import ChatForm from '../../components/ChatForm';
import ChatItems from '../../components/ChatItems';
import ChatHeader from '../../components/ChatHeader';
import { io } from 'socket.io-client';

const Messages = (props: any) => {
	const dispatch = useDispatch<AppDispatch>();
	const { messages, isError } = useSelector((state: any) => state.messages);

	useEffect(() => {
		dispatch(getMessages(props.user._id));
	}, [dispatch]);

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI!);

		socket.on('messages', (data) => {
			console.log(data);
			if (data.action == 'create') {
				dispatch(getMessages(props.user._id));
			}
		});
	}, [dispatch]);

	return (
		<>
			<Head>
				<title>Crypto chat</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='fixed top-0 bottom-0 left-0 right-0 bg-blue-900 flex flex-column '>
				<RoomAside />
				<AsideUsers />
				{/* Main messages */}
				<div className='flex flex-col w-full m-0 p-0 relative'>
					<div className='absolute top-0 bottom-0 left-0 right-0   bg-gray-900 rounded-xl p-0 m-0 sm:m-2 flex flex-col'>
						{/* header */}
						<ChatHeader user={props.user} />

						{/* display messages */}
						<ChatItems
							messages={messages}
							receiver={props.user}
							isError={isError}
						/>

						{/* send message input */}
						<ChatForm receiver={props.user} />
					</div>
				</div>
			</main>
		</>
	);
};

export const getStaticProps = async (context: any) => {
	const API_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URI!;
	const res = await axios.get(
		`${API_BACKEND}/api/v1/users/${context.params.idReceiver}`
	);
	const user = res.status === 200 ? res.data.user : null;

	return {
		props: {
			user: user,
		},
		revalidate: 60,
	};
};

export const getStaticPaths = async () => {
	const API_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URI!;
	const res = await axios.get(`${API_BACKEND}/api/v1/users`);
	const users = res.data;
	const ids = users.users.map((user: any) => ({
		params: { idReceiver: user._id.toString() },
	}));
	return {
		paths: [...ids],
		fallback: false,
	};
};

export default React.memo(Messages);
