import styles from './NewsComponent.module.scss';

type NewsComponentProps = {
	description: string;
	title?: string;
	key?: string;
	link?: string;
};

const NewsComponent = ({ description, key, link, title }: NewsComponentProps) => {
	return (
		<div key={key} className={styles.container}>
			<h4>{title}</h4>
			<p className={styles.description}>{description}</p>
			<a href={link !== undefined ? link : '#'} className={styles.readMore} target="_blank" rel="noreferrer">
				Read more
			</a>
		</div>
	);
};

export default NewsComponent;
