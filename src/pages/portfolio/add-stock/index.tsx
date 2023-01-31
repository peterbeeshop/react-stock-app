import React, { useState } from 'react';
import styles from '../../watchlist/add-stock/index.module.scss';

import Button from '../../../components/Buttons/Button';
import { useNavigate, useParams } from 'react-router-dom';
import TextInputs from './TextInputs';
import { useAppDispatch } from '../../../store/hooks';
import { portfolioActions } from '../../../store/portfolio';

const Index = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams();
	const [symbol, setSymbol] = useState('');
	const [averagePrice, setAveragePrice] = useState('');
	const [numberOfShares, setNumberOfShares] = useState('');

	const navigate = useNavigate();

	const handleSubmit = () => {
		console.log(symbol, averagePrice, numberOfShares);
		dispatch(
			portfolioActions.addStockToPortfolio({ id: id!, symbol, shares: numberOfShares, price: averagePrice }),
		);
		navigate(`/portfolio/${id}`);
	};

	return (
		<div className={styles.container}>
			<h2>Add stocks to your portfolio</h2>
			<div className={styles.cardContainer}>
				<TextInputs
					symbol={setSymbol}
					averagePurchasePrice={setAveragePrice}
					numberOfShares={setNumberOfShares}
				/>
			</div>
			<section className={styles.buttonContainer}>
				<Button name="Back" className={styles.backButton} />
				<Button name="Add" className={styles.addButton} onClick={handleSubmit} />
			</section>
		</div>
	);
};

export default Index;
