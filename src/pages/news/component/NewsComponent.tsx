import { Link } from 'react-router-dom';
import styles from './NewsComponent.module.scss';

type NewsComponentProps = {
	description: string;
};

const NewsComponent = ({ description }: NewsComponentProps) => {
	return (
		<div className={styles.container}>
			<p className={styles.description}>{description}</p>
			<Link className={styles.readMore} to="#">
				Read More
			</Link>
		</div>
	);
};

export default NewsComponent;
