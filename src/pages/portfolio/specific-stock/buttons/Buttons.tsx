import { useState, useRef, forwardRef } from 'react';
import styles from '../index.module.scss';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextInputs from '../../add-stock/TextInputs';

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
			>
				<DialogTitle style={{ paddingRight: '300px' }}>Rename this portfolio</DialogTitle>
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
			<Button className={styles.addStockButton} variant="contained" onClick={handleClickOpen}>
				Add stock
			</Button>
			<div style={{ background: 'blue' }}>
				<Dialog
					open={open}
					onClose={handleClose}
					PaperProps={{ style: { backgroundColor: '#536069', width: '100%' } }}
				>
					<DialogContent>
						<TextInputs />
					</DialogContent>
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
