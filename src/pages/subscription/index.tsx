import styles from './index.module.scss';
// import { subscribeUsingPayPal } from '../../services/subscribe.services';
import { apiClient } from '../../services/config';
// import axios from 'axios';
import { toast } from 'react-toastify';
const Index = () => {
	const handlePay = () => {
		apiClient
			.post('/subscribe/paypal', { price: 7.5 })
			.then(function (response) {
				localStorage.setItem('paymentId', JSON.stringify(response.data.paymentId));
				localStorage.setItem('price', JSON.stringify(response.data.price));
				// Redirect the user to the PayPal approval URL
				window.open(response.data.approvalUrl, '_blank');
			})
			.catch(function (error) {
				toast.error('An error occured');
			});
	};
	return (
		<div className={styles.container}>
			<h2>Subscribe to Premium</h2>
			<h3>US $7.50/month</h3>
			<div className={styles.btnContainer}>
				<button onClick={handlePay}>Continue with PayPal </button>
			</div>
		</div>
	);
};

export default Index;
