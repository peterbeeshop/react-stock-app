import styles from './Navbar.module.scss';
import Button from '../Buttons/Button';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { userActions, userSelectors } from '../../store/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Hamburger from './Hamburger';
import { useCallback, useEffect } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { toast } from 'react-toastify';

const Navbar = () => {
	const screenSize = useMediaQuery('(max-width: 768px)');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isUserLoggedIn = useAppSelector(userSelectors.selectIsUserLoggedIn);
	const token = useAppSelector(userSelectors.selectAuthToken);
	const user = useAppSelector(userSelectors.selectAuthState);

	const onLogout = useCallback(() => {
		navigate('/login');
		dispatch(userActions.logout());
	}, [dispatch, navigate]);

	const checkExpired = (token: string) => {
		const decoded = jwtDecode<JwtPayload>(token);
		const currentTime = Math.floor(Date.now() / 1000);
		return currentTime > decoded.exp!;
	};

	useEffect(() => {
		if (token !== undefined) {
			const expired = checkExpired(token!);
			if (expired) {
				setTimeout(() => {
					dispatch(userActions.resetState());
					navigate('/login');
					toast.error('Session has expired. Please login again!');
				}, 0);
			}
		}
	}, [token, dispatch, navigate]);

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
						<p>Hi, {user?.firstname} </p>
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
