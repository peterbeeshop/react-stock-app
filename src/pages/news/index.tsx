import styles from './index.module.scss';
import NewsComponent from './component/NewsComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Box, CircularProgress, Input } from '@mui/material';
import Dropdown from '../screener/components/Dropdown';

type NewsType = {
	results: {
		id: string;
		article_url: string;
		description: string;
		tickers: string[];
		title: string;
	}[];
	next_url: string;
	count: number;
};

const getNews = async () => {
	return await (
		await axios.get('https://api.polygon.io/v2/reference/news?apiKey=yoaHzupExeXXmqctzmJOyMItaX5cHy3u')
	).data;
};

const Index = () => {
	let { isLoading, isError, data, refetch } = useQuery<NewsType>('stock-data', getNews);
	// const [data, setData] = useState<NewsType>();
	// useEffect(() => {
	// 	axios
	// 		.get('https://api.polygon.io/v2/reference/news?apiKey=yoaHzupExeXXmqctzmJOyMItaX5cHy3u')
	// 		.then((data) => setData(data.data.results))
	// 		.catch((err) => console.log(err));
	// }, []);
	if (isLoading) {
		return (
			<div className={styles.container}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress size={50} />
				</Box>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={styles.container}>
				<h2>An error occured while fetching the data. Check your internet connection or try again later!</h2>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<h2>Latest News</h2>
			<p className={styles.text}>Get real time updates from around the world about the stock market.</p>
			<div>
				{data?.results?.map((item) => (
					<NewsComponent
						key={item.id}
						title={item.title}
						description={item.description}
						link={item.article_url}
					/>
				))}
			</div>
		</div>
	);
};

export default Index;
