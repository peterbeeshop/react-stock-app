import styles from './Button.module.scss';

type ButtonType = {
	name: string;
	className?: string;
	onClick?: () => void;
};
function Button({ name, className, onClick }: ButtonType) {
	return (
		<button onClick={onClick} className={` ${styles.container} ${className}`}>
			{name}
		</button>
	);
}

export default Button;
