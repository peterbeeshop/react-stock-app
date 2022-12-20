import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import styles from './index.module.scss';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import 'react-credit-cards/es/styles-compiled.css';

const Index = () => {
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
					<Cards
						cvc={card.cvc}
						expiry={card.expiry}
						focused={card.focus}
						name={card.name}
						number={card.number}
					/>
					<p>Name on card</p>
					<input
						name="name"
						type="text"
						placeholder="John Doe"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					<p>Card Information</p>
					<input
						name="number"
						type="text"
						placeholder="card number"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					<input
						name="expiry"
						type="tel"
						placeholder="MM / YY"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					<input
						name="cvc"
						type="number"
						placeholder="CVC"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					{/* <p>Country</p>
						<CountryDropdown
							value={country}
							onChange={(val) => setCountry(val)}
							classes={styles.dropdown}
						/> */}
					<Button name="Subscribe" />
					<div>
						<p className={styles.text}>
							By confirming your subscription, you allow Wallstreet finds to charge your card for this
							payment and future payments in accordance with their terms. You can always cancel your
							subscription.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
