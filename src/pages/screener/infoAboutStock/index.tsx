import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import AddIcon from '@mui/icons-material/Add';
import Calculator from '../../../assets/svgs/calculator.svg';
import Comments from './Comments/Comments';
import Button from '../../../components/Buttons/Button';
import NewsComponent from '../../news/component/NewsComponent';
import { getAllStocks, stockSearch } from '../../../services/screener.services';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { TableDataProps } from '..';
import { useNavigate } from 'react-router-dom';
import { watchlistActions, watchlistSelectors } from '../../../store/watchlist';
import { userSelectors } from '../../../store/AuthSlice';
import { Modal, Box } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { toast } from 'react-toastify';

// type DataType = {
// 	price: {
// 		currency: string;
// 		longName: string;
// 		marketCap: number;
// 		symbol: string;
// 	};
// };
const InfoAboutStock = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const myWatchlist = useAppSelector(watchlistSelectors.selectAllWatchlist);
	const authToken = useAppSelector(userSelectors.selectAuthToken);

	let { data } = useQuery<TableDataProps>('stock-data', getAllStocks);
	const { symbol } = useParams();
	const [result, setResult] = useState({});

	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		if (authToken === undefined) {
			toast.error('You need to log in or sign up to continue.');
		} else {
			setOpen(true);
		}
	};
	const handleClose = () => setOpen(false);

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 300,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	useEffect(() => {
		const data = stockSearch(symbol!);
		data.then((res) => setResult(res)).catch((err) => console.log(err));
	}, [symbol]);
	console.log(result);
	const obj = data?.filter((item) => item.symbol === symbol)!;
	const { industry, volume, lastsale, name, sector, marketCap } = obj[0];
	console.log(obj);

	const addToWatchlist = (id: string, nameOfWatchlist: string) => {
		const stock = [];
		stock.push(obj[0].symbol);
		console.log(id, stock);
		dispatch(watchlistActions.addStockToWatchlist({ id, stock }));
		setOpen(false);
		toast.success(`${obj[0].name} successfully added to ${nameOfWatchlist}`);
	};
	return (
		<div className={styles.container}>
			<div className={styles.aboutStock}>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						{myWatchlist.map((watchlist) => {
							return (
								<div
									onClick={() => addToWatchlist(watchlist._id, watchlist.name)}
									className={styles.modal}
								>
									<h2>{watchlist.name}</h2>
									<p>includes {watchlist.watchlist?.length} stocks</p>
								</div>
							);
						})}
					</Box>
				</Modal>
				<section className={styles.firstSection}>
					<h3>{name}</h3>
					<h4>({obj[0].symbol})</h4>
				</section>
				<section className={styles.secondSection}>
					<section>
						<h5>MKT CAP</h5>
						<p>{parseFloat(marketCap).toLocaleString()}</p>
					</section>
					<p>{lastsale}</p>
				</section>
				<section className={styles.thirdSection}>
					<h6 onClick={handleOpen}>
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
					<p>{sector}</p>
				</section>
				<section>
					<h4>Industry</h4>
					<p>{industry}</p>
				</section>
				<section>
					<h4>Share Volume</h4>
					<p>{parseFloat(volume).toLocaleString()}</p>
				</section>
				<section>
					<h4>Market Cap</h4>
					<p>{parseFloat(marketCap).toLocaleString()}</p>
				</section>
				<section>
					<h4>Earnings per share</h4>
					<p>{lastsale}</p>
				</section>
			</div>
			<div className={styles.stockScore}>
				<h3 className={styles.overViewText}>Stock score</h3>
				<h2>91</h2>
			</div>
			<div className={styles.price}>
				<h3 className={styles.overViewText}>Wallstreet finds price </h3>
				<h2>$157</h2>
				<img onClick={() => navigate('/calculator')} src={Calculator} alt="calculatorImage" />
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
