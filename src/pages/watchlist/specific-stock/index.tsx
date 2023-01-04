import React, { forwardRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { watchlistSelectors } from '../../../store/watchlist';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const SpecificStock = () => {
	const { id } = useParams();
	const specificWatchlist = useAppSelector((state) => watchlistSelectors.selectWatchlistById(state, id!));
	console.log(specificWatchlist);
	// watchlistSelectors.selectWatchlistById()
	return (
		<div className={styles.container}>
			<h2>{specificWatchlist?.name}</h2>
			<DeletePortfolio />
			<p>Press the + button to add to portfolio</p>
		</div>
	);
};

//delete button
const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const DeletePortfolio = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button className={styles.button} variant="contained" onClick={handleClickOpen}>
				Delete
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				PaperProps={{ style: { backgroundColor: '#536069', width: '100%', textAlign: 'center' } }}
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Are you sure you want to delete this portfolio?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button style={{ color: '#6FA61A', textTransform: 'capitalize' }} onClick={handleClose}>
						Close
					</Button>
					<Button onClick={handleClose} className={styles.deleteButton}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SpecificStock;
