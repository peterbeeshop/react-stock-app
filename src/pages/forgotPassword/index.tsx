import React from 'react';
import Button from '../../components/Buttons/Button';
import styles from './index.module.scss';

const index = () => {
	return (
		<div className={styles.container}>
			<h2>WALLSTREET FINDS</h2>
			<div className={styles.cardContainer}>
				<h3>Reset Password</h3>
				<div className={styles.innerContainer}>
					<p>Enter your email address</p>
					<input type="email" placeholder="Email" />
				</div>
				<Button name="Send reset email" />
			</div>
		</div>
	);
};

export default index;
