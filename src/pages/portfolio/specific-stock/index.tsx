import NewsComponent from '../../news/component/NewsComponent';
import styles from './index.module.scss';
import { DeletePortfolio, RenamePortfolio, AddStock } from './buttons/Buttons';
import Table from '../../../components/Table';
import { getAllStocks } from '../../../services/screener.services';
import { useEffect } from 'react';

const Index = () => {
	const tableData = [
		{
			'Company name': 'stock',
			symbol: '23 dec 2022',
			'price($)': `12 hrs`,
			'price % chg': 'john smith',
			volume: 'lsk',
			'MKT cap': 345,
			'expected return - 5 years': '15%',
			Score: 50,
			industry: 'cars',
		},
		{
			'Company name': 'tesla',
			symbol: '23 dec 2022',
			'price($)': `12 hrs`,
			'price % chg': 'john smith',
			volume: 'lsk',
			'MKT cap': 345,
			'expected return - 5 years': '15%',
			Score: 50,
			industry: 'cars',
		},
		{
			'Company name': 'google',
			symbol: '23 dec 2022',
			'price($)': `12 hrs`,
			'price % chg': 'john smith',
			volume: 'lsk',
			'MKT cap': 345,
			'expected return - 5 years': '15%',
			Score: 50,
			industry: 'cars',
		},
	];

	useEffect(() => {
		const getStocks = async () => {
			const stocks = await getAllStocks();
			console.log(stocks);
		};
		getStocks();
	}, []);
	// const listOfStocks = getAllStocks()
	// listOfStocks.then(data => console.log(data)).catch(err => console.log(err))

	return (
		<div className={styles.container}>
			<h2>Name of portfolio</h2>
			<section className={styles.buttonContainer}>
				<RenamePortfolio />
				<DeletePortfolio />
				<AddStock />
			</section>
			<Table
				content={tableData}
				columns={['Company name', 'price($)', 'MKT cap', 'expected return - 5 years', 'industry', 'Score']}
				count={tableData.length}
			/>

			<h3 className={styles.news}>News</h3>
			<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
			<NewsComponent description="At 9:47 a.m. ET, the Dow Jones Industrial Average .DJI was up 585.88 points, or 1.98%, at 30,220.71, the S&P 500 .SPX was up 89.71 points, or 2.50%, at 3,672.78, and the Nasdaq Composite .IXIC was up 314.33 points, or 3.05%, at 10,635.72." />
		</div>
	);
};

export default Index;
