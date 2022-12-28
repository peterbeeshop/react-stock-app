import styles from './Intro.module.scss';
import logo from '../../../assets/wallstreet.jpeg';
// import Input from '../../Input/Input';
// import { ChangeEvent, useEffect, useState } from 'react';
// import { getAllStocks } from '../../../services/screener.services';
// import { TableDataProps } from '../../../pages/screener';

const Intro = () => {
	// const [tableData, setTableData] = useState<TableDataProps>([]);
	// const [search, setSearch] = useState('');

	// useEffect(() => {
	// 	const stocks = getAllStocks();
	// 	stocks.then((data) => setTableData(data));
	// }, []);

	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setSearch(e.target.value);
	// };

	// const filteredCoins = tableData.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
	// filteredCoins.map((coin) => console.log(coin.name));
	// console.log(tableData);
	return (
		<div className={styles.container}>
			<section className={styles.leftContainer}>
				<h1>Find calculated stock intrinsic values.</h1>
				<p>
					As the data changes, so do the intrinsic values. So stay up to date with our completly free
					calculations, or customize our calculator to the metrics you want.
				</p>
				<div>
					<h6>Search for a stock</h6>
					<input
						type="text"
						// onChange={handleChange}
						placeholder="search for stock or company name..."
						className={styles.input}
					/>
					{/* <div className={styles.searchStockDiv}>
						{filteredCoins.map((coin) => {
							return (
								<div>
									<p className={styles.searchStock}>{coin.name}</p>
									<hr />
								</div>
							);
						})}
					</div> */}
					{/* <Input
						// onChange={(e) => handleChange}
						placeholder="search for stock or company name..."
						className={styles.input}
					/> */}
				</div>
			</section>
			<section className={styles.rightContainer}>
				<img src={logo} alt="logoImage" width={570} />
			</section>
		</div>
	);
};

export default Intro;
