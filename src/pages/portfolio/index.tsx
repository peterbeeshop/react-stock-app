import { useEffect, useState } from 'react';
import styles from '../watchlist/index.module.scss';
import NotEmpty from './components/NotEmpty/index';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { portfolioActions, portfolioSelectors } from '../../store/portfolio';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getMyPortfolio } from '../../services/portfolio.services';

const Index = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getMyPortfolio();
			dispatch(portfolioActions.setPortfolio(data));
		};
		fetchData();
	}, [dispatch]);
	const myPortfolio = useAppSelector(portfolioSelectors.selectAllPortfolio);

	return (
		<>
			{myPortfolio.length === 0 ? (
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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [portfolioName, setPortfolioName] = useState<string>('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		// navigate('/portfolio/add-stock');
		setOpen(false);
		const onSuccess = (id: string) => navigate(`/portfolio/${id}/add-stock`);
		dispatch(portfolioActions.createPortfolio({ portfolioName, onSuccess }));
	};

	return (
		<div>
			<div className={styles.createWatchlistBtn}>
				<Button className={styles.button} variant="contained" onClick={handleClickOpen}>
					Create new portfolio
				</Button>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle style={{ paddingRight: '300px' }}>Create a new portfolio</DialogTitle>
				<DialogContent>
					<TextField
						onChange={(e) => setPortfolioName(e.target.value)}
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
					{portfolioName?.length === 0 ? (
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
