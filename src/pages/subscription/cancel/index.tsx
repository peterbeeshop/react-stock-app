import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import styles from '../index.module.scss';
import errorIcon from '../assets/error.svg';
const Index = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.successContainer}>
			<img src={errorIcon} alt="error-icon" />
			<h2>
				You cancelled the payment. <br /> Click button to continue
			</h2>
			<Button name="Homepage" className={styles.button} onClick={() => navigate('/')} />
		</div>
	);
};

export default Index;
