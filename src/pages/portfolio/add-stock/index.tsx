import React from 'react';
import styles from '../../watchlist/add-stock/index.module.scss';

import Button from '../../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import TextInputs from './TextInputs';

const Index = () => {
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate('/portfolio/specific-stock');
	};

	return (
		<div className={styles.container}>
			<h2>Add stocks to your portfolio</h2>
			<div className={styles.cardContainer}>
				<TextInputs />
			</div>
			<section className={styles.buttonContainer}>
				<Button name="Back" className={styles.backButton} />
				<Button name="Add" className={styles.addButton} onClick={handleSubmit} />
			</section>
		</div>
	);
};

export default Index;
