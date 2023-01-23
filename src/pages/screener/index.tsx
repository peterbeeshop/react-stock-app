import Input from '../../components/Input/Input';
import Dropdown from './components/Dropdown';
import styles from './index.module.scss';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Table from '../../components/Table';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getAllStocks } from '../../services/screener.services';
import { useQuery } from 'react-query';

export type TableDataProps = {
	symbol: string;
	name: string;
	sector?: string;
	volume: string;
	marketCap: string;
	industry: string;
	pctchange: number;
	url: string;
	lastsale: string;
	price?: string;
	value?: string;
	label?: string;
}[];

const Index = () => {
	let { isLoading, isError, data, refetch } = useQuery<TableDataProps>('stock-data', getAllStocks, {
		// refetchInterval: 5 * 60 * 1000,
		// refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return (
			<div className={styles.container}>
				<h2 className="text-gray-400">Stock Screener</h2>
				<Input placeholder="search for stock or company name..." className={styles.input} />

				<section>
					<Dropdown />
				</section>
				<p>
					Press the <StarOutlineIcon sx={{ color: '#89B93F', marginX: 1 }} /> to add to your watchlist
				</p>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress size={50} />
				</Box>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={styles.container}>
				<h2 className="text-gray-400">Stock Screener</h2>
				<Input placeholder="search for stock or company name..." className={styles.input} />

				<section>
					<Dropdown />
				</section>
				<p>
					Press the <StarOutlineIcon sx={{ color: '#89B93F', marginX: 1 }} /> to add to your watchlist
				</p>
				<h2>An error occured while fetching the data. Check your internet connection or try again later!</h2>
			</div>
		);
	}
	data?.forEach((item) => {
		item.price = item.lastsale;
		// item.volume = Number(item.volume).toLocaleString();
		// item.marketCap = Number(item.marketCap).toLocaleString();
		return item;
	});
	return (
		<div className={styles.container}>
			<h2 className="text-gray-400">Stock Screener</h2>
			<Input placeholder="search for stock or company name..." className={styles.input} />

			<section>
				<Dropdown data={data} refetch={refetch} />
			</section>
			<p>
				Press the <StarOutlineIcon sx={{ color: '#89B93F', marginX: 1 }} /> to add to your watchlist
			</p>
			{data?.length === 0 ? (
				<p>Nothing matched your search. Try applying different filters!</p>
			) : (
				<Table
					content={data}
					columns={['name', 'symbol', 'price', 'volume', 'pctchange', 'industry', 'marketCap']}
					count={data?.length!}
				/>
			)}
		</div>
	);
};

export default Index;
