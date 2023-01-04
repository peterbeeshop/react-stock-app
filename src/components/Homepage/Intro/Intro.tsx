import styles from './Intro.module.scss';
import logo from '../../../assets/wallstreet.jpeg';
import { useEffect, useState } from 'react';
import { getAllStocks } from '../../../services/screener.services';
import Select, { createFilter, ValueType, OptionTypeBase } from 'react-select';
import { TableDataProps } from '../../../pages/screener';
// import VirtualList from 'react-tiny-virtual-list';

const Intro = () => {
	const [tableData, setTableData] = useState<TableDataProps>([]);
	const [selectedOption, setSelectedOption] = useState<ValueType<OptionTypeBase, false>>();

	useEffect(() => {
		const stocks = getAllStocks();
		stocks.then((data) => setTableData(data));
	}, []);

	useEffect(() => {
		console.log(selectedOption);
	}, [selectedOption]);

	const options: OptionTypeBase[] = tableData?.map((stock) => {
		stock.value = stock.symbol;
		stock.label = stock.name;
		return stock;
	});

	const handleChange = (option: ValueType<OptionTypeBase, false>) => {
		setSelectedOption(option);
	};

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
					<Select
						placeholder="search for stock or company name..."
						value={selectedOption}
						options={options}
						onChange={handleChange}
						isClearable
						filterOption={createFilter({
							ignoreAccents: false,
						})}
					/>
				</div>
			</section>
			<section className={styles.rightContainer}>
				<img src={logo} alt="logoImage" width={570} />
			</section>
		</div>
	);
};

export default Intro;
