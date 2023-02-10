import React, { useEffect } from 'react';
import styles from './index.module.scss';

const AdsComponent = () => {
	useEffect(() => {
		try {
			((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
		} catch (e) {}
	}, []);

	return (
		<div className={styles.container}>
			<ins
				className="adsbygoogle"
				style={{ display: 'block' }}
				data-ad-client="ca-pub-3115013029888498"
				data-ad-slot="6717689655"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		</div>
	);
};

export default AdsComponent;
