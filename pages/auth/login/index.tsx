'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../services/features/auth/authSlice';
import { AppDispatch } from '../../../services/store';
import { toast } from 'react-toastify';
import logo from '../../../assets/images/logo.svg';
import { VscLoading } from 'react-icons/vsc';

const loginPage: NextPage = () => {
	const [userInput, setUserInput] = useState({
		username: '',
		password: '',
	});
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { user, isSuccess, isLoading, isError, errorMessage } = useSelector(
		(state: any) => state.auth
	);

	const handleChange = (e: any) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(userInput));
	};

	useEffect(() => {
		if (isError) toast.error(errorMessage);
		if (user && isSuccess) {
			toast.success(`Login as ${user && user.name} ${user && user.lastname}`);
			router.push('/');
		}
	}, [isSuccess, isError, user, dispatch]);
	return (
		<div className='h-screen w-screen bg-gray-900'>
			<div className='relative container  mx-auto h-screen flex items-center justify-center  py-20 px-5 '>
				<div className=' w-full h-full flex  flex-col-reverse md:flex-row  rounded-md box-border shadow-md'>
					<div className='w-full md:w-1/2 h-full  bg-slate-100 flex flex-col justify-center p-8 sm:px-10 lg:px-20  rounded-lg md:rounded-none md:rounded-l-lg box-border text-gray-600'>
						<form className='w-full' onSubmit={handleSubmit}>
							<h2 className='text-3xl font-bold text-blue-800'>Se connecter</h2>
							<div className='my-3 flex flex-col justify-center'>
								<label htmlFor='username'>Username or email</label>
								<input
									type='text'
									name='username'
									id='username'
									placeholder='cedric karungu'
									className='p-2 border-2 rounded-md bg-slate-100'
									onChange={handleChange}
								/>
							</div>
							<div className='my-3 flex flex-col justify-center'>
								<label htmlFor='password'>Password</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='1234567890'
									className='p-2 border-2 rounded-md bg-slate-100'
									onChange={handleChange}
								/>
							</div>
							<div className='my-3 w-full flex gap-2  justify-center md:justify-start flex-wrap'>
								<button
									className='bg-blue-700 py-2 px-5 rounded-md text-slate-50 w-full md:w-1/2 flex justify-center items-center'
									type='submit'
								>
									{isLoading ? (
										<VscLoading className='animate-spin text-center' />
									) : (
										<span>Connexion</span>
									)}
								</button>
								<div className='flex md:hidden py-2'>
									<p>Or</p>
								</div>
								<button
									className='flex md:hidden border-blue-700 py-2 px-5 rounded-md text-blue-700 w-full md:w-1/2 bg-slate-100 border-2 text-center justify-center items-center'
									onClick={() => router.push('/auth/signup')}
								>
									<span>Crrer un compte</span>
								</button>
							</div>
						</form>
					</div>
					<div className='hidden md:flex flex-col w-full md:w-1/2 bg-blue-900  justify-center items-center rounded-r-lg p-20'>
						<div className=' w-60 mb-4'>
							<Image src={logo} />
						</div>

						<h2 className='text-4xl text-slate-50 font-bold'>Crypto chat</h2>
						<p className='text-center text-white text-sm m-4'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						</p>
						<button
							className=' border border-white m-5 py-2 px-5 rounded-md text-slate-50 '
							onClick={() => router.push('/auth/signup')}
						>
							creer un compte
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default loginPage;
