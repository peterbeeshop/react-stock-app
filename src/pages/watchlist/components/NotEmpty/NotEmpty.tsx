import styles from './NotEmpty.module.scss';
import { FormDialog } from '../..';
import { useAppSelector } from '../../../../store/hooks';
import { watchlistSelectors } from '../../../../store/watchlist';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Stock1 from '../assets/stock-1.svg';
import Stock3 from '../assets/stock-3.svg';

const NotEmpty = () => {
	return (
		<div className={styles.container}>
			<h2>Watchlist</h2>
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

export const Card = () => {
	const navigate = useNavigate();
	const myWatchlist = useAppSelector(watchlistSelectors.selectAllWatchlist);
	const arr = [Stock1, Stock3];
	const random = Math.floor(Math.random() * arr.length);

	const handleClick = (id: string) => {
		navigate(`/watchlist/${id}`);
	};
	return (
		<>
			{myWatchlist.map((watchlist) => {
				return (
					<div className={styles.card} key={watchlist._id} onClick={() => handleClick(watchlist._id)}>
						<img src={arr[random]} alt="stockImage1" />
						<h4>{watchlist.name}</h4>
						<p>Created: {moment(watchlist.createdAt).format('MMM DD, YYYY')}</p>
						<p>Includes: {watchlist.watchlist?.length} stocks</p>
					</div>
				);
			})}
		</>
	);
};
