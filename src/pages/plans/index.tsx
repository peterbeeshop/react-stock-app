import styles from './index.module.scss';
import check from '../../assets/svgs/check.svg';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
const Index = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className={styles.textContainer}>
				<h4>Compare to see which plan is best for you.</h4>
			</div>
			<div className={styles.cardContainer}>
				<div className={styles.card}>
					<h5>Free</h5>
					<h6>$0 forever</h6>
					<p className={styles.text}>
						Explore a limited version of Similar web Research Intelligence to develop your digital strategy
					</p>
					<hr />
					<div>
						<h5>Package Features</h5>
						<div className={styles.innerContainer}>
							<section>
								<img src={check} alt="check" />
								<p>Follow a stock or company to get the latest updates </p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>Access to a dozen of stocks</p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>Track your portfolio performance</p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>ads</p>
							</section>
						</div>
					</div>
				</div>

				<div className={styles.card}>
					<h5>Premium</h5>
					<h6>$7.50/mo. (30 day free trial)</h6>
					<p className={styles.text}>
						Unlock granular and actionable insights to explore your market and grow your investments
					</p>
					<hr />
					<div className={styles.innerContainer}>
						<h5>Package Features</h5>
						<div>
							<section>
								<img src={check} alt="check" />
								<p>All free features </p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>Access to stock calculator tool</p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>Access to a private discord community </p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>See what other users are saying about a particular stock</p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>Make adjustments to our calculated assumptions</p>
							</section>
							<section>
								<img src={check} alt="check" />
								<p>ad free</p>
							</section>
						</div>
					</div>
					<Button name="Go premium" onClick={() => navigate('/subscription')} />
				</div>
			</div>
		</>
	);
};

export default Index;
