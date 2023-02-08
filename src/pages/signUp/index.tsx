import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import styles from './index.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { userActions } from '../../store/AuthSlice';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Index = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	});

	const handleSubmit = () => {
		if (user.password.length < 4) {
			toast.error('Password must be more than 4 characters long');
		} else if (user.email === '') {
			toast.error('Please enter a valid email');
		} else if (user.firstname === '') {
			toast.error('Please provide atleast your first name');
		} else {
			dispatch(userActions.createAppUser(user));
			navigate('/login');
		}
	};
	return (
		<div className={styles.container}>
			<h2>WALLSTREET FINDS</h2>
			<div className={styles.card}>
				<h3>Create account</h3>
				<p>No credit card required</p>
				<input
					type="text"
					placeholder="First Name"
					onChange={(e) => setUser({ ...user, firstname: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Last Name"
					onChange={(e) => setUser({ ...user, lastname: e.target.value })}
				/>
				<input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>

				<Button name="Create Account" onClick={handleSubmit} />
				<p>OR SIGN UP WITH</p>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<GoogleLogin
						useOneTap
						onSuccess={({ credential }) => {
							const onSuccess = () => navigate('/');
							dispatch(userActions.googleLogin({ userToken: credential!, onSuccess }));
						}}
						text="signup_with"
						context="signup"
						theme="filled_blue"
						shape="circle"
						onError={() => {
							toast.error('Error login in. Please try again!');
						}}
					/>
				</div>

				<section>
					<p>Already have an account?</p>
					<Link to="/login" className={styles.link}>
						Log in
					</Link>
				</section>
			</div>
		</div>
	);
};

export default Index;
