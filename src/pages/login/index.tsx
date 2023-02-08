import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import { useAppDispatch } from '../../store/hooks';
import { userActions } from '../../store/AuthSlice';
import styles from '../signUp/index.module.scss';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const Index = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const handleSubmit = () => {
		const onSuccess = () => navigate('/');
		dispatch(userActions.login({ ...user, onSuccess }));
	};

	return (
		<div className={styles.container}>
			<h2>WALLSTREET FINDS</h2>
			<div className={styles.card}>
				<h3>Welcome</h3>
				<p>Sign in to your account</p>
				<input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<Button name="Login" onClick={handleSubmit} />
				<p>OR SIGN IN WITH</p>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<GoogleLogin
						useOneTap
						onSuccess={({ credential }) => {
							const onSuccess = () => navigate('/');
							dispatch(userActions.googleLogin({ userToken: credential!, onSuccess }));
						}}
						theme="filled_blue"
						shape="circle"
						onError={() => {
							toast.error('Error login in. Please try again!');
						}}
					/>
				</div>

				<Link to="/forgot-password" className={styles.forgotPassword}>
					Forgot Password ?
				</Link>
				<section>
					<p>Don’t have an account?</p>
					<Link to="/sign-up" className={styles.link}>
						Sign up here
					</Link>
				</section>
			</div>
		</div>
	);
};

export default Index;
