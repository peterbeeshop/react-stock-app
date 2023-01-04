import { useState, useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Input/Input';
import Dropdown from './components/Dropdown';
import styles from './index.module.scss';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Table from '../../components/Table';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getAllStocks } from '../../services/screener.services';

export type TableDataProps = {
	symbol: string;
	name: string;
	volume: string;
	marketCap: string;
	industry: string;
	pctchange: number;
	url: string;
	value?: string;
	label?: string;
}[];

const Index = () => {
	const [tableData, setTableData] = useState<TableDataProps>();

	useEffect(() => {
		const stocks = getAllStocks();
		stocks.then((data) => setTableData(data));
	}, []);

	return (
		<div className={styles.container}>
			<h2 className="text-gray-400">Stock Screener</h2>
			<Input placeholder="search for stock or company name..." className={styles.input} />

			<section>
				<Dropdown />
				<div className={styles.buttonContainer}>
					<Button name="Reset" className={styles.resetButton} />
					<Button name="Search" className={styles.searchButton} />
				</div>
			</section>
			<p>
				Press the <StarOutlineIcon sx={{ color: '#89B93F', marginX: 1 }} /> to add to your watchlist
			</p>
			{tableData?.length === 0 || tableData === undefined ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress size={50} />
				</Box>
			) : (
				<Table
					content={tableData}
					columns={['name', 'symbol', 'volume', 'pctchange', 'industry', 'marketCap']}
				/>
			)}
		</div>
	);
};

export default Index;
