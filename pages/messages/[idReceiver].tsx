import axios from 'axios';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../services/features/messages/messageSlice';
import { AppDispatch } from '../../services/store';
import RoomAside from '../../components/RoomAside';
import AsideUsers from '../../components/AsideUsers';

const Messages = (props: any) => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { messages, users, isError, isSuccess, isLoading, messageError } =
		useSelector((state: any) => state.messages);

	useEffect(() => {
		const userIDS = { receiver: props.user._id };
		dispatch(getMessages(userIDS));
	});

	return (
		<>
			<Head>
				<title>Crypto chat</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='fixed top-0 bottom-0 left-0 right-0 bg-blue-900 flex flex-column '>
				<RoomAside />
				<AsideUsers users={users} />
				{/* Main messages */}
				<div className=' top-2 bottom-2 left-20 w-full bg-gray-900 rounded-xl p-4 ml-0 mr-2 my-2 flex flex-col items-center justify-center'>
					<h2 className='text-3xl text-slate-100 font-extrabold m-2'></h2>
					<p className='text-slate-50'>votre conversation avec </p>
					<span className='text-3xl text-blue-600'>
						{' '}
						{props.user && props.user.name} {props.user && props.user.lastname}
					</span>
					<span className='text-xs text-white'>
						@{props.user && props.user.username}
					</span>
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

export default Messages;
