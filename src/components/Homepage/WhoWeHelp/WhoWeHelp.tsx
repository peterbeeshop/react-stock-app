import styles from './WhoWeHelp.module.scss';
import WhoWeHelpImage from '../../../assets/svgs/WhoWeHelp.svg';

const WhoWeHelp = () => {
	return (
		<div className={styles.container}>
			<h1>Who we help</h1>
			<div className={styles.innerContainer}>
				<img src={WhoWeHelpImage} alt="logo" />
				<section>
					<p>
						Wallstreet finds helps offices, individuals, investment consultants and private equity firms to
						make the most of their time through better information at their fingertips, and a single source
						of truth when it comes to researching about a stock or company.
					</p>
				</section>
			</div>
		</div>
	);
};

export default WhoWeHelp;
