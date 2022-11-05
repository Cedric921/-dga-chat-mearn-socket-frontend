import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useDispatch } from 'react-redux';
import { login, register } from '../app/features/auth/authSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../app/store';

export default function Home() {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const user = {
			_id: '1',
			name: ' cedric',
			lastname: 'vb',
			token: 'lsls',
		};
		// dispatch(register());
		dispatch(login());
	}, []);
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
		</div>
	);
}
