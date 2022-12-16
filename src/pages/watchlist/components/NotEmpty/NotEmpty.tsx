import styles from './NotEmpty.module.scss';
import Stock1 from '../assets/stock-1.svg';
import { FormDialog } from '../..';

// import Stock2 from '../assets/stock-2.svg';
// import Stock3 from '../assets/stock-3.svg';

const NotEmpty = () => {
	return (
		<div className={styles.container}>
			<h2>Watchlist</h2>
			<section>
				<Card />
				<Card />
				<Card />
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
	return (
		<div className={styles.card}>
			<img src={Stock1} alt="stockImage1" />
			<h4>My first watchlist</h4>
			<p>Created: Sep 17, 2022</p>
			<p>Includes: 2 stocks</p>
		</div>
	);
};
