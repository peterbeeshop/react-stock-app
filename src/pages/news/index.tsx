import styles from './index.module.scss';
import NewsComponent from './component/NewsComponent';

const index = () => {
	return (
		<div className={styles.container}>
			<h2>Latest News</h2>
			<p className={styles.text}>Get real time updates from around the world about the stock market.</p>
			<div>
				<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
				<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
				<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
			</div>
		</div>
	);
};

export default index;
