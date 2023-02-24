import React, { useState } from 'react';
import styles from './index.module.scss';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const Index = () => {
	const [value, setValue] = useState<number | string>(5);

	const handleChange = (e: SelectChangeEvent<number | string>) => {
		setValue(e.target.value);
	};
	console.log(value);
	if (value === 'All years') {
		return (
			<>
				<h2>Stock Calculator Tool</h2>
				<div className={styles.calculator}>
					<h3>year</h3>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							value={value}
							onChange={(e) => handleChange(e)}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							sx={{ height: 30, borderColor: 'gold' }}
						>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
							<MenuItem value={4}>4</MenuItem>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={'All years'}>All years</MenuItem>
						</Select>
					</FormControl>
				</div>
			</>
		);
	}
	return (
		<>
			<h2>Stock Calculator Tool</h2>
			<div className={styles.calculator}>
				<h3>year</h3>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						value={value}
						onChange={(e) => handleChange(e)}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						sx={{ height: 30, borderColor: 'gold' }}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={'All years'}>All years</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className={styles.container}>
				<section>
					<h4>Revenue</h4>
					<h4>$1,233,343</h4>
				</section>
				<section>
					<h4>Revenue Growth (Past 5Y = 6%, TTM=10%)</h4>
					<input type="text" value={'5%'} />
				</section>
				<section>
					<h4>Net profit (Past 5Y = 3%, TTM=5%, Industry Average = 4%)</h4>
					<div style={{ paddingTop: '30px' }}>
						<h4>$1,233,343</h4>
						<input type="text" value={'6%'} />
					</div>
				</section>
				<section style={{ marginTop: '45px' }}>
					<h4>Shares Outstanding </h4>
					<h4>27,628,320</h4>
				</section>
				<section>
					<h4>Shares Outstanding Growth (Past 5Y = 3%, TTM=0.5%)</h4>
					<input type="text" value={'-2%'} />
				</section>
				<section style={{ marginTop: '45px' }}>
					<h4>EARNINGS PER SHARE</h4>
					<h4>$3.95</h4>
				</section>
				<section>
					<h4>PRICE TO EARNINGS</h4>
					<h4>7</h4>
				</section>
				<section style={{ marginTop: '45px' }}>
					<h4>Forward PE (Industry Average = 10)</h4>
					<input type="text" value={'10'} />
				</section>
				<div className={styles.results}>
					<h4>Intrinsic Value</h4>
					<input type="text" value={'$42.34'} />
				</div>
				<div className={styles.results}>
					<h4>EXPECTED RATE OF RETURN TOTAL</h4>
					<input type="text" value={'52%'} />
				</div>
				<div className={styles.results}>
					<h4>ANNUALISED %</h4>
					<input type="text" value={'9%'} />
				</div>
			</div>
			<div className={styles.bottom}>
				<hr />
				<h3>ONLY PREMIUM USER’S CAN MAKE ADJUSTMENTS TO THE ABOVE ASSUMPTIONS</h3>
			</div>
		</>
	);
};

export default Index;
