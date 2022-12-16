import styles from './Input.module.scss';

type InputProps = {
	placeholder: string;
	className?: string;
	onClick?: () => void;
};

const Input = ({ placeholder, onClick, className }: InputProps) => {
	return (
		<div className={styles.container}>
			<input type="text" placeholder={placeholder} className={`${className}`} />
		</div>
	);
};

export default Input;
