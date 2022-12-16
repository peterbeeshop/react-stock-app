import React from 'react';
import styles from './Comments.module.scss';

type CommentProps = {
	name: string;
	comment: string;
	date: string;
};

const Comments = ({ comment, name, date }: CommentProps) => {
	const hasUserPaid = true;

	return (
		<>
			{hasUserPaid ? (
				<div className={styles.container}>
					<h3>{name}</h3>
					<p className={styles.comment}>{comment}</p>
					<p className={styles.date}>{date}</p>
				</div>
			) : (
				<div className={styles.notPaidContainer}>
					<h3>{name} not paid</h3>
					<p className={styles.comment}>{comment}</p>
					<p className={styles.date}>{date}</p>
				</div>
			)}
		</>
	);
};

export default Comments;
