import styles from './Intro.module.scss';
import logo from '../../../assets/wallstreet.jpeg';
import { useEffect, useMemo, useState } from 'react';
import { getAllStocks } from '../../../services/screener.services';
import Select, { createFilter, ValueType, OptionTypeBase } from 'react-select';
import { TableDataProps } from '../../../pages/screener';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FixedSizeList as List } from 'react-window';

const Intro = () => {
	let { data } = useQuery<TableDataProps>('stock-data', getAllStocks);
	const navigate = useNavigate();
	const [selectedOption, setSelectedOption] = useState<ValueType<OptionTypeBase, false>>();

	useEffect(() => {
		if (selectedOption?.symbol !== undefined) {
			navigate(`/screener/${selectedOption?.symbol}`);
		}
	}, [selectedOption, navigate]);

	const options: OptionTypeBase[] | undefined = data?.map((stock) => {
		stock.value = stock.symbol;
		stock.label = stock.name;
		return stock;
	});

	const handleChange = (option: ValueType<OptionTypeBase, false>) => {
		setSelectedOption(option);
	};

	const memoizedOptions = useMemo(() => options, [options]);

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
						options={memoizedOptions}
						onMenuOpen={() => {}}
						onChange={handleChange}
						// components={{
						// 	MenuList: CustomMenuList,
						// }}
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

export const CustomMenuList = (props: any) => {
	const itemHeight = 35;
	const { options, children, maxHeight, getValue } = props;
	const [value] = getValue();
	const initialOffset = options.indexOf(value) * itemHeight;

	const memoizedOptions = useMemo(() => options, [options]);

	return (
		<div>
			<List
				height={maxHeight}
				itemCount={memoizedOptions.length}
				itemSize={itemHeight}
				initialScrollOffset={initialOffset}
			>
				{({ index, style }: any) => (
					<div className={styles.customMenu} key={memoizedOptions[index].value} style={style}>
						{children[index]}
					</div>
				)}
			</List>
		</div>
	);
};
export default Intro;
