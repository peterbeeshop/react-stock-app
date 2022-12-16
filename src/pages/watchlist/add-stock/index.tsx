import React from 'react';
import styles from './index.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

const AddStock = () => {
	const navigate = useNavigate();
	const handleSubmit = () => {
		navigate('/watchlist/specific-stock');
	};
	return (
		<div className={styles.container}>
			<h2>Add stocks to your watchlist</h2>
			<div className={styles.cardContainer}>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '80%' },
					}}
					className={styles.box}
					noValidate
					autoComplete="off"
				>
					<p>Enter stock symbol (e.g. APPL, TSLA)</p>

					<TextField
						sx={{ backgroundColor: '#F5F9FD', borderRadius: 2 }}
						id="standard-search"
						label="Search for stock"
						type="search"
						variant="filled"
					/>
					<TextField
						sx={{ backgroundColor: '#F5F9FD', borderRadius: 2 }}
						id="standard-search"
						label="Search for stock"
						type="search"
						variant="filled"
					/>
					<TextField
						sx={{ backgroundColor: '#F5F9FD', borderRadius: 2 }}
						id="standard-search"
						label="Search for stock"
						type="search"
						variant="filled"
					/>
					<TextField
						sx={{ backgroundColor: '#F5F9FD', borderRadius: 2 }}
						id="standard-search"
						label="Search for stock"
						type="search"
						variant="filled"
					/>
				</Box>
			</div>
			<section className={styles.buttonContainer}>
				<Button name="Back" className={styles.backButton} />
				<Button name="Add" className={styles.addButton} onClick={handleSubmit} />
			</section>
		</div>
	);
};

export default AddStock;
