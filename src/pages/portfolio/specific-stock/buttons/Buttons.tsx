import { useState, useRef, forwardRef } from 'react';
import styles from '../index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextInputs from '../../add-stock/TextInputs';
import { useAppDispatch } from '../../../../store/hooks';
import { portfolioActions } from '../../../../store/portfolio';

//rename button
export const RenamePortfolio = () => {
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
		navigate('/portfolio/specific-stock');
	};

	return (
		<div>
			<Button className={styles.button} variant="contained" onClick={handleClickOpen}>
				Rename
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{ style: { backgroundColor: '#536069', width: '100%' } }}
				fullWidth
			>
				<DialogTitle>Rename this portfolio</DialogTitle>
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
						variant="filled"
						style={{ background: '#F5F9FD', borderRadius: 8 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button style={{ color: '#6FA61A' }} onClick={handleClose}>
						Cancel
					</Button>
					<Button className={styles.submitButton} onClick={handleSubmit}>
						Rename
					</Button>
				</DialogActions>
			</Dialog>
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

//add stock button
export const AddStock = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [symbol, setSymbol] = useState('');
	const [averagePrice, setAveragePrice] = useState('');
	const [numberOfShares, setNumberOfShares] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		dispatch(
			portfolioActions.addStockToPortfolio({ id: id!, symbol, shares: numberOfShares, price: averagePrice }),
		);
		navigate(`/portfolio/${id}`);
	};

	return (
		<div>
			<Button className={styles.addStockButton} variant="contained" onClick={handleClickOpen}>
				Add stock
			</Button>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					PaperProps={{ style: { backgroundColor: '#536069', width: '100%' } }}
				>
					<TextInputs
						symbol={setSymbol}
						averagePurchasePrice={setAveragePrice}
						numberOfShares={setNumberOfShares}
					/>
					<DialogActions>
						<Button style={{ color: '#6FA61A' }} onClick={handleClose}>
							Cancel
						</Button>
						<Button className={styles.submitButton} onClick={handleSubmit}>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};
