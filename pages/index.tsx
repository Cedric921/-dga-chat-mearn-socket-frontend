import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../app/features/auth/authSlice';
import { getUsers } from '../app/features/messages/messageSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../app/store';

export default function Home() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: any) => state.auth);
	const { messages, users } = useSelector((state: any) => state.messages);
	useEffect(() => {
		if (!user) router.push('/auth/login');
		if (user) dispatch(getUsers(user.token));
	}, [user, dispatch]);

	useEffect(() => {
		dispatch(getUsers(user.token));
	}, [user]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<h2>
					{' '}
					Hello {user && user.lastname} {user && user.name}
				</h2>
			</main>
		</div>
	);
}
