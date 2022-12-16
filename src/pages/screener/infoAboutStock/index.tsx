import React from 'react';
import styles from './index.module.scss';
import AddIcon from '@mui/icons-material/Add';
import Calculator from '../../../assets/svgs/calculator.svg';
import Comments from './Comments/Comments';
import Button from '../../../components/Buttons/Button';
import NewsComponent from '../../news/component/NewsComponent';

const InfoAboutStock = () => {
	return (
		<div className={styles.container}>
			<div className={styles.aboutStock}>
				<section className={styles.firstSection}>
					<h3>Apple</h3>
					<h4>(AAPL)</h4>
				</section>
				<section className={styles.secondSection}>
					<section>
						<h5>MKT CAP</h5>
						<p>2.224T</p>
					</section>
					<p>$145.46</p>
				</section>
				<section className={styles.thirdSection}>
					<h6>
						<AddIcon fontSize="small" /> ADD TO WATCHLIST{' '}
					</h6>
					<h6>
						<AddIcon fontSize="small" /> ADD TO PORTFOLIO{' '}
					</h6>
				</section>
			</div>
			<h4>chart</h4>
			<div>
				<h3 className={styles.overViewText}>Overview</h3>
				<div className={styles.overView}>
					<section className={styles.section}>
						<p>ONE APPLE PARK WAY, CUPERTINO, California, 95014, United States</p>
						<p>https://www.apple.com</p>
					</section>
					<section className={styles.stockDetails}>
						<p>
							Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets,
							wearables, and accessories worldwide. Apple (ticker symbol: AAPL) is one of the worlds
							leading consumer electronics and personal computer companies. The Cupertino,
							California-based company was established in 1977 as Apple Computer Inc. It dropped the
							Computer from its name in early 2007.{' '}
						</p>
					</section>
				</div>
			</div>
			<div className={styles.keyData}>
				<h3 className={styles.overViewText}>Key Data</h3>
				<section>
					<h4>Sector</h4>
					<p>Technology</p>
				</section>
				<section>
					<h4>Industry</h4>
					<p>Computer Manufacturing</p>
				</section>
				<section>
					<h4>Share Volume</h4>
					<p>43,4234,348</p>
				</section>
				<section>
					<h4>Market Cap</h4>
					<p>234,4234,348</p>
				</section>
				<section>
					<h4>Earnings per share</h4>
					<p>$6.06</p>
				</section>
			</div>
			<div className={styles.stockScore}>
				<h3 className={styles.overViewText}>Stock score</h3>
				<h2>91</h2>
			</div>
			<div className={styles.price}>
				<h3 className={styles.overViewText}>Wallstreet finds price </h3>
				<h2>$157</h2>
				<img src={Calculator} alt="calculatorImage" />
				<p>press the calculator to open the calculator tool</p>
			</div>
			<div className={styles.commentSection}>
				<h3 className={styles.overViewText}>What others are saying about this stock</h3>
				<Comments
					name="Peter beeshop"
					comment="Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. Apple (ticker symbol: AAPL) is one of the worlds leading consumer electronics and personal computer companies. "
					date="07 december 2022"
				/>
				<section>
					<p className={styles.text}>
						Want to see these comments? - Participate in our community and build your own calculator!
					</p>
					<Button name="Go Premium" className={styles.button} />
				</section>
			</div>
			<div className={styles.newsContainer}>
				<h3>News</h3>
				<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
				<NewsComponent description="Major megacap growth stocks like Apple Inc AAPL.O, Meta Platforms Inc META.O, Amazon.com AMZN.O and Tesla Inc TSLA.O added about 3% and 4% each as the yield on U.S. 10-year bonds US10YT=RR retreated from multi-year highs." />
			</div>
		</div>
	);
};

export default InfoAboutStock;
