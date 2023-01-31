import React, { useEffect, useState } from 'react';
import Select, { createFilter, ValueType, OptionTypeBase } from 'react-select';
import styles from './index.module.scss';
import Box from '@mui/material/Box';
import Button from '../../../components/Buttons/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStocks } from '../../../services/screener.services';
import { TableDataProps } from '../../screener';
import { addStockToWatchlist } from '../../../services/watchlist.services';
import { toast } from 'react-toastify';
import { watchlistActions } from '../../../store/watchlist';
import { useAppDispatch } from '../../../store/hooks';

const AddStock = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams();
	const navigate = useNavigate();
	const [tableData, setTableData] = useState<TableDataProps>([]);
	const [selectedOption1, setSelectedOption1] = useState<ValueType<OptionTypeBase, false>>();
	const [selectedOption2, setSelectedOption2] = useState<ValueType<OptionTypeBase, false>>();
	const [selectedOption3, setSelectedOption3] = useState<ValueType<OptionTypeBase, false>>();
	const [selectedOption4, setSelectedOption4] = useState<ValueType<OptionTypeBase, false>>();

	useEffect(() => {
		const stocks = getAllStocks();
		stocks.then((data) => setTableData(data));
	}, []);

	const options: OptionTypeBase[] = tableData?.map((stock) => {
		stock.value = stock.symbol;
		stock.label = stock.name;
		return stock;
	});

	const handleChange1 = (option: ValueType<OptionTypeBase, false>) => {
		setSelectedOption1(option);
	};
	const handleChange2 = (option: ValueType<OptionTypeBase, false>) => {
		setSelectedOption2(option);
	};
	const handleChange3 = (option: ValueType<OptionTypeBase, false>) => {
		setSelectedOption3(option);
	};
	const handleChange4 = (option: ValueType<OptionTypeBase, false>) => {
		setSelectedOption4(option);
	};

	const handleSubmit = () => {
		const arr = [
			selectedOption1?.symbol,
			selectedOption2?.symbol,
			selectedOption3?.symbol,
			selectedOption4?.symbol,
		];
		const newArr = arr.filter((item) => {
			return item !== undefined;
		});
		if (newArr.length !== 0) {
			dispatch(watchlistActions.addStockToWatchlist({ id: id!, stock: newArr }));
			navigate(`/watchlist/${id}`);
		} else {
			toast.error('Watchlist must contain atleast one stock!');
		}
	};
	return (
		<div className={styles.container}>
			<h2>Add stocks to your watchlist</h2>
			<div className={styles.cardContainer}>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '80%' },
					}}
					className={styles.box}
					noValidate
					autoComplete="off"
				>
					<p>Enter stock symbol (e.g. APPL, TSLA)</p>

					<Select
						className={styles.selectTag}
						placeholder="search for stock or company name..."
						value={selectedOption1}
						options={options}
						onChange={handleChange1}
						isClearable
						filterOption={createFilter({
							ignoreAccents: false,
						})}
					/>
					<Select
						className={styles.selectTag}
						placeholder="search for stock or company name..."
						value={selectedOption2}
						options={options}
						onChange={handleChange2}
						isClearable
						filterOption={createFilter({
							ignoreAccents: false,
						})}
					/>
					<Select
						className={styles.selectTag}
						placeholder="search for stock or company name..."
						value={selectedOption3}
						options={options}
						onChange={handleChange3}
						isClearable
						filterOption={createFilter({
							ignoreAccents: false,
						})}
					/>
					<Select
						className={styles.selectTag}
						placeholder="search for stock or company name..."
						value={selectedOption4}
						options={options}
						onChange={handleChange4}
						isClearable
						filterOption={createFilter({
							ignoreAccents: false,
						})}
					/>
				</Box>
			</div>
			<section className={styles.buttonContainer}>
				<Button name="Back" className={styles.backButton} />
				<Button name="Add" className={styles.addButton} onClick={handleSubmit} />
			</section>
		</div>
	);
};

export default AddStock;
