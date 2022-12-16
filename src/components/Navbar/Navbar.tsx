import styles from './Navbar.module.scss';
import Button from '../Buttons/Button';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { userActions, userSelectors } from '../../store/AuthSlice';
import { Link, redirect } from 'react-router-dom';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const isUserLoggedIn = useAppSelector(userSelectors.selectIsUserLoggedIn);
	const user = useAppSelector(userSelectors.selectAuthState);

	const onLogout = () => {
		dispatch(userActions.logout());
		redirect('/login');
	};
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
