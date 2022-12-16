import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../../watchlist/add-stock/index.module.scss';
import InputAdornment from '@mui/material/InputAdornment';

const TextInputs = () => {
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '80%' },
			}}
			className={styles.box}
			noValidate
			autoComplete="off"
		>
			<TextField
				sx={{ backgroundColor: '#F5F9FD', borderRadius: 2 }}
				id="standard-search"
				className={styles.standardSearch}
				label="Enter stock symbol  (e.g. APPL, TSLA)"
				type="search"
				variant="filled"
			/>
			<TextField
				id="outlined-basic"
				label="Number of shares"
				variant="filled"
				type={'number'}
				className={styles.textField}
			/>
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment style={{ color: 'black !important' }} position="start">
							$
						</InputAdornment>
					),
				}}
				id="outlined-basic"
				label="Avg purchase price($)"
				variant="filled"
				type={'number'}
				className={styles.textField}
			/>
		</Box>
	);
};

export default TextInputs;
