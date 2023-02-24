import styles from '../index.module.scss';
import { useEffect, useState } from 'react';
import { successPayment } from '../../../services/subscribe.services';
import { apiClient } from '../../../services/config';
import succcessIcon from '../assets/success.svg';
import errorIcon from '../assets/error.svg';
import Button from '../../../components/Buttons/Button';
import { Navigate, useNavigate } from 'react-router-dom';

const Index = () => {
	const [token, setToken] = useState('');
	const [payerId, setPayerId] = useState('');
	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		setToken(searchParams.get('token') ?? '');
		setPayerId(searchParams.get('PayerID') ?? '');
	}, []);
	useEffect(() => {
		const paymentId = localStorage.getItem('paymentId');
		const price = localStorage.getItem('price');
		console.log(paymentId, price);
		apiClient
			.get(`/success${window.location.search}&price=${encodeURIComponent(price!)}`, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data.success === true) {
					setSuccess(true);
				}
			})
			.catch(() => setError(true));
	}, []);

	if (success) {
		return <Successful />;
	} else if (error) {
		return <NotSuccessful />;
	} else {
		return <NotSuccessful />;
	}
	// return <div>{success ? <Successful /> : <NotSuccessful />}</div>;
};

const Successful = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.successContainer}>
			<img src={succcessIcon} alt="success-icon" />
			<h2>Your payment was successful</h2>
			<Button name="Continue" className={styles.button} onClick={() => navigate('/screener')} />
		</div>
	);
};

const NotSuccessful = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.successContainer}>
			<img src={errorIcon} alt="error-icon" />
			<h2>There was an error processing your payment. Please try again! </h2>
			<Button name="Continue" className={styles.button} onClick={() => navigate('/subscription')} />
		</div>
	);
};

export default Index;
