import styles from './Intro.module.scss';
import logo from '../../../assets/wallstreet.jpeg';
import Input from '../../Input/Input';

const Intro = () => {
	return (
		<div className={styles.container}>
			<section className={styles.leftContainer}>
				<h1>Find calculated stock intrinsic values.</h1>
				<p>
					As the data changes, so do the intrinsic values. So stay up to date with our completly free
					calculations, or customize our calculator to the metrics you want.
				</p>
				<div>
					<h6>Search for a stock</h6>
					<Input placeholder="search for stock or company name..." className={styles.input} />
				</div>
			</section>
			<section className={styles.rightContainer}>
				<img src={logo} alt="logoImage" width={570} />
			</section>
		</div>
	);
};

export default Intro;
