import Card from './component/Card';
import styles from './WhyUs.module.scss';

const WhyUs = () => {
	return (
		<div className={styles.container}>
			<h1>Why choose us</h1>
			<div className={styles.cardContainer}>
				<Card
					text="Generate optimal portfolios that outperform market benchmarks and protect against global or local economic bubbles."
					bgColor="#33334F"
				/>
				<Card
					text="Discover amazing investment opportunities and make confident and informed decisions."
					bgColor="#5656C2"
				/>
				<Card
					text="Stay up to date on fundamental changes on the stocks you are following."
					bgColor="#42427B"
				/>
			</div>
		</div>
	);
};

export default WhyUs;
