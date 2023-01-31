import styles from './index.module.scss';
import { FormDialog } from '../..';
import { useAppSelector } from '../../../../store/hooks';
import { portfolioSelectors } from '../../../../store/portfolio';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Stock1 from '../assets/stock-1.svg';
import Stock2 from '../assets/stock-2.svg';
import Stock3 from '../assets/stock-3.svg';

const NotEmpty = () => {
	return (
		<div className={styles.container}>
			<h2>Portfolio</h2>
			<section>
				<Card />
			</section>
			<div className={styles.formContainer}>
				<FormDialog />
			</div>
		</div>
	);
};

export default NotEmpty;

const Card = () => {
	const navigate = useNavigate();
	const myPortfolio = useAppSelector(portfolioSelectors.selectAllPortfolio);
	const arr = [Stock1, Stock2, Stock3];
	const random = Math.floor(Math.random() * arr.length);

	const handleClick = (id: string) => {
		navigate(`/portfolio/${id}`);
	};
	return (
		<>
			{myPortfolio.map((portfolio) => {
				return (
					<div className={styles.card} key={portfolio._id} onClick={() => handleClick(portfolio._id)}>
						<img src={arr[random]} alt="stockImage1" />
						<h4>{portfolio.name}</h4>
						<p>Created: {moment(portfolio.createdAt).format('MMM DD, YYYY')}</p>
						{/* <p>Includes: {watchlist.watchlist?.length} stocks</p> */}
					</div>
				);
			})}
		</>
	);
};
