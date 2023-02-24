import NewsComponent from '../../news/component/NewsComponent';
import styles from './index.module.scss';
import { DeletePortfolio, RenamePortfolio, AddStock } from './buttons/Buttons';
import Table from '../../../components/Table';
import { getAllStocks } from '../../../services/screener.services';
import { useEffect, useState } from 'react';
import { viewPortfolio } from '../../../services/portfolio.services';
import { portfolioSelectors } from '../../../store/portfolio';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

const Index = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);

	const specificPortfolio = useAppSelector((state) => portfolioSelectors.selectPortfolioById(state, id!));

	useEffect(() => {
		const data = viewPortfolio(id!);
		data.then((json) => setData(json));
	}, [id]);
	console.log(data);
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
	];

	return (
		<div className={styles.container}>
			<h2>{specificPortfolio?.name}</h2>
			<section className={styles.buttonContainer}>
				<RenamePortfolio />
				<DeletePortfolio />
				<AddStock />
			</section>
			{data.length === 0 ? (
				<p>No stocks to display</p>
			) : (
				<Table
					content={data}
					columns={['name', 'lastsale', 'marketCap', 'pctchange', 'industry', 'volume']}
					count={data.length}
				/>
			)}

			<h3 className={styles.news}>News</h3>
			<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
			<NewsComponent description="At 9:47 a.m. ET, the Dow Jones Industrial Average .DJI was up 585.88 points, or 1.98%, at 30,220.71, the S&P 500 .SPX was up 89.71 points, or 2.50%, at 3,672.78, and the Nasdaq Composite .IXIC was up 314.33 points, or 3.05%, at 10,635.72." />
		</div>
	);
};

export default Index;
