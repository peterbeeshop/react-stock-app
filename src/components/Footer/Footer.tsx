import React from 'react';
import logo from '../../assets/logo.jpeg';
import styles from './Footer.module.scss';
import twitterLogo from '../../assets/svgs/icons/twitter_icon.svg';
import facebookLogo from '../../assets/svgs/icons/facebook_icon.svg';
import youtubeLogo from '../../assets/svgs/icons/youtube_icon.svg';
const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.innerContainer}>
				<section>
					<img src={logo} alt="logo" width={260} />
				</section>
				<section>
					<h5>follow Us</h5>
					<div className={styles.imageContainer}>
						<img className={styles.image} src={facebookLogo} alt="facebook-logo" />
						<img className={styles.image} src={twitterLogo} alt="twitter-logo" />
						<img className={styles.image} src={youtubeLogo} alt="youtube-logo" />
					</div>
					<h5>Contact Us</h5>
					<p>wallstreet@gmail.com</p>
				</section>
				<section>
					<h5>support</h5>
					<p>Plans</p>
				</section>
			</div>
			<h2>Copyright © 2023 Wallstreet finds.</h2>
		</div>
	);
};

export default Footer;
