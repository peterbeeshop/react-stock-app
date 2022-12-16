import { useState, useRef } from 'react';
import styles from '../watchlist/index.module.scss';
import NotEmpty from '../watchlist/components/NotEmpty/NotEmpty';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Index = () => {
	const isPortfolioListEmpty = true;

	return (
		<>
			{isPortfolioListEmpty ? (
				<div className={styles.IsEmptyContainer}>
					<h2>
						Your portfolio list is <br /> currently empty
					</h2>
					<p>Creating a portfolio is the easiest way to track your stocks.</p>
					<FormDialog />
				</div>
			) : (
				<div className={styles.notEmptyContainer}>
					{' '}
					<NotEmpty />{' '}
				</div>
			)}
		</>
	);
};

export default Index;

export const FormDialog = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const valueRef = useRef('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		setText(valueRef.current.valueOf);
		navigate('/portfolio/add-stock');
	};

	return (
		<div>
			<Button className={styles.button} variant="contained" onClick={handleClickOpen}>
				Create new portfolio
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle style={{ paddingRight: '300px' }}>Create a new portfolio</DialogTitle>
				<DialogContent>
					<TextField
						inputRef={valueRef}
						autoFocus
						margin="dense"
						required
						id="name"
						label="portfolio name"
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button style={{ color: '#6FA61A' }} onClick={handleClose}>
						Cancel
					</Button>
					<Button className={styles.submitButton} onClick={handleSubmit}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
