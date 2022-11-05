import { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../app/features/auth/authSlice'
import { AppDispatch } from '../../app/store';

const loginPage: NextPage = () => {
	const [userInput, setUserInput] = useState({
		username: '',
		password: '',
	});
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: any) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(login(userInput))
	};
	return (
		<div className='h-screen w-screen bg-red-800'>
			<div className='relative container  mx-auto h-screen flex items-center justify-center  py-20 px-5'>
				<div className=' w-full h-full flex  flex-col-reverse md:flex-row  rounded-md box-border shadow-md'>
					<div
						className='w-full md:w-1/2 h-full bg-green-100 flex flex-col justify-center p-8 sm:px-10 lg:px-20  rounded-lg md:rounded-none md:rounded-l-lg box-border text-gray-600'
					>
						<form action='' onSubmit={handleSubmit}>
							<h2 className='text-3xl font-bold text-red-800'>Se connecter</h2>
							<div className='my-3 flex flex-col justify-center'>
								<label htmlFor='username'>Username or email</label>
								<input
									type='text'
									name='username'
									id='username'
									placeholder='cedric karungu'
									className='p-2 border-2 rounded-md'
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
									className='p-2 border-2 rounded-md'
									onChange={handleChange}
								/>
							</div>
							<div className='my-3 flex flex-col justify-center '>
								<button className='bg-blue-700 py-2 px-5 rounded-md text-slate-50 w-3/6'>
									Connexion
								</button>
							</div>
						</form>
					</div>
					<div className='hidden md:flex flex-col w-full md:w-1/2 bg-blue-600  justify-center items-center rounded-r-lg p-20'>
						<h2 className='text-4xl text-red-900 font-bold'>Crypto chat</h2>
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
