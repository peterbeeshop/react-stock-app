import React, { useState } from 'react';
import styles from './Hamburger.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';
import { userActions, userSelectors } from '../../store/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type HamburgerMenuProps = {
	isUserLoggedIn: boolean;
};
const HamburgerMenu = ({ isUserLoggedIn }: HamburgerMenuProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelectors.selectAuthState);
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const onLogout = () => {
		navigate('/login');
		dispatch(userActions.logout());
	};
	return (
		<div className={styles.container}>
			<MenuIcon onClick={handleClick} sx={{ fontSize: '40px', color: '#89B93F', marginLeft: '20px' }} />
			{isOpen && (
				<ul className={styles.isOpen} style={{ position: 'absolute', top: 0 }}>
					<CloseIcon
						sx={{ fontSize: '40px', color: '#89B93F' }}
						onClick={handleClick}
						className={styles.closeButton}
					/>
					<Link to="/plans">
						<li onClick={() => setIsOpen(false)}>Plans</li>
					</Link>
					<Link to="/screener">
						<li onClick={() => setIsOpen(false)}>Screener</li>
					</Link>
					<Link to="/news">
						<li onClick={() => setIsOpen(false)}>News</li>
					</Link>
					<Link to="/watchlist">
						<li onClick={() => setIsOpen(false)}>Watchlist</li>
					</Link>
					<Link to="/portfolio">
						<li onClick={() => setIsOpen(false)}>Portfolio</li>
					</Link>
					{isUserLoggedIn ? (
						<>
							<p className={styles.user}>Hi, {user?.firstname} </p>
							<Button name="Logout" className={styles.button} onClick={onLogout} />
						</>
					) : (
						<div className={styles.btnContainer}>
							<Link to="/login">Sign in</Link>
							<Link to="/sign-up">
								<Button name="Sign up" className={styles.button} />
							</Link>
						</div>
					)}
				</ul>
			)}
		</div>
	);
};

export default HamburgerMenu;
