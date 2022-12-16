import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import styles from './index.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { userActions } from '../../store/AuthSlice';
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
		dispatch(userActions.createAppUser(user));
		navigate('/login');
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
				<Button name="GOOGLE" />

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
