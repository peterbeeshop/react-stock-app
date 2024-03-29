import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import NotEmpty from './components/NotEmpty/NotEmpty';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { watchlistActions, watchlistSelectors } from '../../store/watchlist';
import { getMyWatchlist } from '../../services/watchlist.services';
import { userSelectors } from '../../store/AuthSlice';

const Index = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(userSelectors.selectAuthToken);

	useEffect(() => {
		if (token === undefined) {
			dispatch(watchlistActions.setWatchlist([]));
		} else {
			const fetchData = async () => {
				const data = await getMyWatchlist();
				dispatch(watchlistActions.setWatchlist(data));
			};
			fetchData();
		}
	}, [token, dispatch]);

	const myWatchlist = useAppSelector(watchlistSelectors.selectAllWatchlist);
	return (
		<>
			{myWatchlist.length === 0 ? (
				<div className={styles.IsEmptyContainer}>
					<h2>
						Your watchlist is <br /> currently empty
					</h2>
					<p>
						Create a watchlist so that you can be upto date with the <br /> stocks in this list.
					</p>
					{token === undefined ? (
						<h4 style={{ color: '#6FA61A' }}>Log in or sign up to continue</h4>
					) : (
						<FormDialog />
					)}
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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [watchlistName, setWatchlistName] = useState<string>('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		setOpen(false);
		const onSuccess = (id: string) => navigate(`/watchlist/${id}/add-stock`);
		dispatch(watchlistActions.createWatchlist({ watchlistName, onSuccess }));
	};

	return (
		<div>
			<div className={styles.createWatchlistBtn}>
				<Button className={styles.button} variant="contained" onClick={handleClickOpen}>
					Create new watchlist
				</Button>
			</div>
			<Dialog fullWidth open={open} onClose={handleClose}>
				<DialogTitle className={styles.title}>Create new watchlist</DialogTitle>
				<DialogContent>
					<TextField
						onChange={(e) => setWatchlistName(e.target.value)}
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
					{watchlistName?.length === 0 ? (
						<Button variant="contained" disabled>
							Create
						</Button>
					) : (
						<Button className={styles.submitButton} onClick={handleSubmit}>
							Create
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};
