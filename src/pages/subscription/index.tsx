import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import styles from './index.module.scss';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import 'react-credit-cards/es/styles-compiled.css';

const Index = () => {
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	const [card, setCard] = useState({
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
	});

	const handleInputFocus = (e: any) => {
		setCard({ ...card, focus: e.target.name });
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;

		setCard({ ...card, [name]: value });
	};
	return (
		<>
			<div className={styles.container}>
				<h2>Subscribe to Premium</h2>
				<h3>US $7.50/month</h3>
				<div className={styles.cardContainer}>
					<h4>Pay with card</h4>
					<input type="email" placeholder="Email" />
					<p>Card Information</p>
					<input type="text" placeholder="card number" />
					<div>
						<input type="number" placeholder="MM / YY" />
						<input type="number" placeholder="CVC" />
					</div>
					<p>Name on card</p>
					<input type="text" placeholder="John Doe" />
					<p>Country</p>
					<CountryDropdown value={country} onChange={(val) => setCountry(val)} classes={styles.dropdown} />
					<div>
						<Button name="Subscribe" />
					</div>
					<div>
						<p className={styles.text}>
							By confirming your subscription, you allow Wallstreet finds to charge your card for this
							payment and future payments in accordance with their terms. You can always cancel your
							subscription.
						</p>
					</div>
				</div>
				{/* card */}
				<div id="PaymentForm">
					<Cards
						cvc={card.cvc}
						expiry={card.expiry}
						focused={card.focus}
						name={card.name}
						number={card.number}
					/>
					<form>
						<input
							type="tel"
							name="number"
							placeholder="Card Number"
							onChange={() => handleInputChange}
							onFocus={() => handleInputFocus}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default Index;
