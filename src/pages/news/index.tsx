import styles from './index.module.scss';
import NewsComponent from './component/NewsComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

type NewsType = {
	id: string;
	article_url: string;
	description: string;
	tickers: string[];
	title: string;
}[];
const Index = () => {
	const [data, setData] = useState<NewsType>();
	useEffect(() => {
		axios
			.get('https://api.polygon.io/v2/reference/news?apiKey=yoaHzupExeXXmqctzmJOyMItaX5cHy3u')
			.then((data) => setData(data.data.results))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className={styles.container}>
			<h2>Latest News</h2>
			<p className={styles.text}>Get real time updates from around the world about the stock market.</p>
			<div>
				{data?.map((item) => (
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
