import styles from './Card.module.scss';

type CardType = {
	text: string;
	bgColor?: string;
};

const Card = ({ text, bgColor }: CardType) => {
	return (
		<div className={styles.container} style={{ background: `${bgColor}` }}>
			<h4>{text}</h4>
		</div>
	);
};

export default Card;
