import styles from './Input.module.scss';

type InputProps = {
	placeholder: string;
	className?: string;
	onChange?: () => void;
};

const Input = ({ placeholder, onChange, className }: InputProps) => {
	return (
		<div className={styles.container}>
			<input type="text" placeholder={placeholder} onChange={onChange} className={`${className}`} />
		</div>
	);
};

export default Input;
