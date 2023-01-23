import React, { forwardRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { watchlistActions, watchlistSelectors } from '../../../store/watchlist';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
// import { getWatchlistSymbols } from '../../../services/watchlist.services';
import Table from '../../../components/Table';
import { TableDataProps } from '../../screener';
import { useQuery } from 'react-query';
import { getAllStocks } from '../../../services/screener.services';

const SpecificStock = () => {
	const { id } = useParams();
	let { data } = useQuery<TableDataProps>('stock-data', getAllStocks);
	// const [result, setResult] = useState<TableDataProps>([]);
	const specificWatchlist = useAppSelector((state) => watchlistSelectors.selectWatchlistById(state, id!));

	let result = data?.filter((item) => {
		return specificWatchlist?.watchlist?.includes(item.symbol);
	});
	// useEffect(() => {
	// 	if (specificWatchlist?.watchlist?.length !== 0) {
	// 		const data = getWatchlistSymbols(specificWatchlist?.watchlist!);
	// 		data.then((data) => setResult(data)).catch((err) => console.log(err));
	// 	}
	// }, [specificWatchlist?.watchlist]);
	result?.forEach((item) => {
		item.price = item.lastsale;
		// item.marketCap = parseFloat(item.marketCap).toLocaleString();
		// item.volume = parseFloat(item.volume).toLocaleString();
		return item;
	});
	return (
		<div className={styles.container}>
			<h2>{specificWatchlist?.name}</h2>
			<DeletePortfolio />
			<p>Press the + button to add to portfolio</p>
			{result?.length === 0 ? (
				<p>This watchlist has no stocks</p>
			) : (
				<Table
					content={result}
					columns={['name', 'symbol', 'price', 'volume', 'pctchange', 'industry', 'marketCap']}
					count={result?.length!}
				/>
			)}
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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		dispatch(watchlistActions.deleteWatchlist({ id: id!, onSuccess: () => navigate('/watchlist') }));
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
					<Button onClick={handleDelete} className={styles.deleteButton}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SpecificStock;
