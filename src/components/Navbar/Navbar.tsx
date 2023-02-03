import styles from './Navbar.module.scss';
import Button from '../Buttons/Button';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { userActions, userSelectors } from '../../store/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Hamburger from './Hamburger';

const Navbar = () => {
	const screenSize = useMediaQuery('(max-width: 768px)');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isUserLoggedIn = useAppSelector(userSelectors.selectIsUserLoggedIn);
	const user = useAppSelector(userSelectors.selectAuthState);

	const onLogout = () => {
		navigate('/login');
		dispatch(userActions.logout());
	};
	if (screenSize) {
		return (
			<div className={styles.mobile}>
				<Hamburger isUserLoggedIn={isUserLoggedIn} />
				<Link to="/">
					<h2>WALLSTREET FINDS</h2>
				</Link>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<Link to="/">
				<h2>WALLSTREET FINDS</h2>
			</Link>

			<ul>
				<Link to="/plans">
					<li>Plans</li>
				</Link>
				<Link to="/screener">
					<li>Screener</li>
				</Link>
				<Link to="/news">
					<li>News</li>
				</Link>
				<Link to="/watchlist">
					<li>Watchlist</li>
				</Link>
				<Link to="/portfolio">
					<li>Portfolio</li>
				</Link>
			</ul>
			<div className={styles.buttonContainer}>
				{isUserLoggedIn ? (
					<>
						<p>Hi,{user?.firstname} </p>
						<Button name="Logout" className={styles.button} onClick={onLogout} />
					</>
				) : (
					<>
						<Link to="/login">Sign in</Link>
						<Link to="/sign-up">
							<Button name="Sign up" className={styles.button} />
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
