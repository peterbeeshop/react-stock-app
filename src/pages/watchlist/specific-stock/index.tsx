import React, { forwardRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { watchlistActions, watchlistSelectors } from '../../../store/watchlist';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Table from '../components/Table';
import { TableDataProps } from '../../screener';
import { useQuery } from 'react-query';
import { getAllStocks } from '../../../services/screener.services';
// import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const SpecificStock = () => {
	const { id } = useParams();
	let { data } = useQuery<TableDataProps>('stock-data', getAllStocks);
	const navigate = useNavigate();

	const specificWatchlist = useAppSelector((state) => watchlistSelectors.selectWatchlistById(state, id!));

	let result = data?.filter((item) => {
		return specificWatchlist?.watchlist?.includes(item.symbol);
	});
	result?.forEach((item) => {
		item.price = item.lastsale;
		item.marketCap = parseFloat(item.marketCap).toLocaleString();
		item.volume = parseFloat(item.volume).toLocaleString();
		// item.addToPortfolio = <AddIcon style={{ color: '#FFFFFF' }} color="info" />;
		item.delete = <DeleteIcon style={{ color: '#B00F0F' }} color="info" />;
		return item;
	});

	const handleNavigate = () => {
		navigate(`/watchlist/${id}/add-stock`);
	};
	return (
		<div className={styles.container}>
			<h2>{specificWatchlist?.name}</h2>
			<div style={{ display: 'flex' }}>
				<Button
					style={{ width: '120px', height: '35px', marginRight: '30px' }}
					variant="contained"
					onClick={handleNavigate}
				>
					add stock
				</Button>
				<DeletePortfolio />
			</div>
			<p>Press the + button to add to portfolio</p>
			{result?.length === 0 ? (
				<p>This watchlist has no stocks</p>
			) : (
				<Table
					content={result}
					columns={['name', 'symbol', 'price', 'volume', 'pctchange', 'industry', 'marketCap', 'delete']}
					count={result?.length!}
					id={id}
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
		dispatch(watchlistActions.retrieveWatchlist());
		dispatch(watchlistActions.deleteWatchlist({ id: id!, onSuccess: () => navigate('/watchlist') }));
	};

	return (
		<div>
			<Button className={styles.deleteButton} variant="contained" onClick={handleClickOpen}>
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
						Are you sure you want to delete this watchlist?
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
