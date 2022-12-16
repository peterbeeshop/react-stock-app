import React, { useState, useRef } from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import NotEmpty from './components/NotEmpty/NotEmpty';

const Index = () => {
	const watchlistIsEmpty = false;
	return (
		<>
			{watchlistIsEmpty ? (
				<div className={styles.IsEmptyContainer}>
					<h2>
						Your watchlist is <br /> currently empty
					</h2>
					<p>
						Create a watchlist so that you can be upto date with the <br /> stocks in this list.
					</p>
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
		navigate('/watchlist/add-stock');
	};

	return (
		<div>
			<Button className={styles.button} variant="contained" onClick={handleClickOpen}>
				Create new watchlist
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle style={{ paddingRight: '300px' }}>Create new watchlist</DialogTitle>
				<DialogContent>
					<TextField
						inputRef={valueRef}
						autoFocus
						margin="dense"
						required
						id="name"
						label="Watchlist name"
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
