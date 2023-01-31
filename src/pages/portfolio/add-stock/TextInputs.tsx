import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../../watchlist/add-stock/index.module.scss';
import myStyles from './index.module.scss';
import InputAdornment from '@mui/material/InputAdornment';

import Select, { createFilter, ValueType, OptionTypeBase } from 'react-select';
import { getAllStocks } from '../../../services/screener.services';
import { TableDataProps } from '../../screener';

type TextInputsProps = {
	symbol: Dispatch<SetStateAction<string>>;
	numberOfShares: Dispatch<SetStateAction<string>>;
	averagePurchasePrice: Dispatch<SetStateAction<string>>;
};

const TextInputs = ({ symbol, numberOfShares, averagePurchasePrice }: TextInputsProps) => {
	const [tableData, setTableData] = useState<TableDataProps>([]);
	const [selectedOption1, setSelectedOption1] = useState<ValueType<OptionTypeBase, false>>();

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
		symbol(selectedOption1?.symbol);
	};

	useEffect(() => {
		symbol(selectedOption1?.symbol);
	}, [selectedOption1?.symbol, symbol]);

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '80%' },
			}}
			className={myStyles.box}
			noValidate
			autoComplete="off"
		>
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
			{/* <TextField
				onChange={(e) => symbol(e.target.value)}
				sx={{ backgroundColor: '#F5F9FD', borderRadius: 2 }}
				id="standard-search"
				className={styles.standardSearch}
				label="Enter stock symbol  (e.g. APPL, TSLA)"
				type="search"
				variant="filled"
			/> */}
			<TextField
				onChange={(e) => numberOfShares(e.target.value)}
				id="outlined-basic"
				label="Number of shares"
				variant="filled"
				type={'number'}
				className={styles.textField}
			/>
			<TextField
				onChange={(e) => averagePurchasePrice(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment style={{ color: 'black !important' }} position="start">
							$
						</InputAdornment>
					),
				}}
				id="outlined-basic"
				label="Avg purchase price($)"
				variant="filled"
				type={'number'}
				className={styles.textField}
			/>
		</Box>
	);
};

export default TextInputs;
