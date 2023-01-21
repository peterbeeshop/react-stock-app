import React, { useState } from 'react';
import styles from '../index.module.scss';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '../../../components/Buttons/Button';
import { TableDataProps } from '..';
import { useQueryClient } from 'react-query';

type DropDownProps = {
	data?: TableDataProps;
	refetch?: () => void;
};
const Dropdown = ({ data, refetch }: DropDownProps) => {
	const queryClient = useQueryClient();

	const [volume, setVolume] = useState('0-20000000');
	const [industry, setIndustry] = useState('');
	const [score, setScore] = useState('');
	const [price, setPrice] = useState('0-3000');
	const [marketCap, setMartketCap] = useState('0-3000000000000');

	const handleChange = (event: SelectChangeEvent, updaterFunction: React.Dispatch<React.SetStateAction<string>>) => {
		updaterFunction(event.target.value);
	};

	const handleReset = () => {
		setPrice('0-3000');
		setMartketCap('0-3000000000000');
		setIndustry('');
		setVolume('0-20000000');
		if (refetch !== undefined) refetch();
	};

	const handleSearch = () => {
		data?.forEach((item) => {
			item.lastsale = item.lastsale.replace('$', '');
			return item;
		});
		const numbers = Array.from(price.split('-'), Number);
		const splitVolume = Array.from(volume.split('-'), Number);
		const splitMarketCap = Array.from(marketCap.split('-'), Number);
		const filteredItems = data?.filter((item) => {
			if (industry === '') {
				return (
					parseFloat(item.lastsale) >= numbers[0] &&
					parseFloat(item.lastsale) <= numbers[1] &&
					parseFloat(item.marketCap) >= splitMarketCap[0] &&
					parseFloat(item.marketCap) <= splitMarketCap[1] &&
					parseFloat(item.volume) >= splitVolume[0] &&
					parseFloat(item.volume) <= splitVolume[1]
				);
			} else {
				return (
					parseFloat(item.lastsale) >= numbers[0] &&
					parseFloat(item.lastsale) <= numbers[1] &&
					item.industry === industry &&
					parseFloat(item.marketCap) >= splitMarketCap[0] &&
					parseFloat(item.marketCap) >= splitMarketCap[0]
				);
			}
		});
		queryClient.setQueryData('stock-data', filteredItems);
	};

	return (
		<>
			<div className={styles.dropdown}>
				{/* <FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
				<InputLabel id="demo-simple-select-helper-label">Select sector</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={sector}
					label="Age"
					onChange={handleSector}
					style={{ backgroundColor: '#D9D9D9' }}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={'Pharmaceuticals and Biotechnology'}>Pharmaceuticals and Biotechnology</MenuItem>
					<MenuItem value={'Air Freight/Delivery Services'}>Air Freight/Delivery Services</MenuItem>
					<MenuItem value={'Electrical Products'}>Electrical Products</MenuItem>
					<MenuItem value={'Consumer Electronics/Appliances'}>Consumer Electronics/Appliances</MenuItem>
					<MenuItem value={'Real Estate Investment Trusts'}>Real Estate Investment Trusts</MenuItem>
				</Select>
			</FormControl> */}

				<FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
					<InputLabel id="demo-simple-select-helper-label">Industry</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={industry}
						label="Industry"
						onChange={(e) => handleChange(e, setIndustry)}
						style={{ backgroundColor: '#D9D9D9' }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'Pharmaceuticals and Biotechnology'}>
							Pharmaceuticals and Biotechnology
						</MenuItem>
						<MenuItem value={'Air Freight/Delivery Services'}>Air Freight/Delivery Services</MenuItem>
						<MenuItem value={'Electrical Products'}>Electrical Products</MenuItem>
						<MenuItem value={'Consumer Electronics/Appliances'}>Consumer Electronics/Appliances</MenuItem>
						<MenuItem value={'Real Estate Investment Trusts'}>Real Estate Investment Trusts</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
					<InputLabel id="demo-simple-select-helper-label">Score</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={score}
						label="Score"
						onChange={(e) => handleChange(e, setScore)}
						style={{ backgroundColor: '#D9D9D9' }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'0-20'}>0-20</MenuItem>
						<MenuItem value={'21-40'}>21-40</MenuItem>
						<MenuItem value={'41-60'}>41-60</MenuItem>
						<MenuItem value={'61-80'}>61-80</MenuItem>
						<MenuItem value={'81-100'}>81-100</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
					<InputLabel id="demo-simple-select-helper-label">Price</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={price}
						label="Price"
						onChange={(e) => handleChange(e, setPrice)}
						style={{ backgroundColor: '#D9D9D9' }}
					>
						<MenuItem value={'0-3000'}>
							<em>Any</em>
						</MenuItem>
						<MenuItem value={'1-20'}>$1 to $20</MenuItem>
						<MenuItem value={'20-40'}>$20 to $40</MenuItem>
						<MenuItem value={'40-60'}>$40 to $60</MenuItem>
						<MenuItem value={'80-100'}>$80 to $100</MenuItem>
						<MenuItem value={'100-150'}>$100 to $150</MenuItem>
						<MenuItem value={'150-2000'}>above $150</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
					<InputLabel id="demo-simple-select-helper-label">Marktet cap</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={marketCap}
						label="Age"
						onChange={(e) => handleChange(e, setMartketCap)}
						style={{ backgroundColor: '#D9D9D9' }}
					>
						<MenuItem value={'0-3000000000000'}>
							<em>Any</em>
						</MenuItem>
						<MenuItem value={'200000000000-3000000000000'}>Mega ($200bln and above)</MenuItem>
						<MenuItem value={'10000000000-200000000000'}>Large ($10bln to $200bl)</MenuItem>
						<MenuItem value={'2000000000-10000000000'}>Mid ($2bln to $10bln)</MenuItem>
						<MenuItem value={'300000000-2000000000'}>Small ($300mln to $2bln)</MenuItem>
						<MenuItem value={'50000000-300000000'}>Micro ($50mln to $300mln)</MenuItem>
						<MenuItem value={'0-50000000'}>Nano (under $50mln)</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
					<InputLabel id="demo-simple-select-helper-label">Volume</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={volume}
						label="Volume"
						onChange={(e) => handleChange(e, setVolume)}
						style={{ backgroundColor: '#D9D9D9' }}
					>
						<MenuItem value={'0-20000000'}>
							<em>Any</em>
						</MenuItem>
						<MenuItem value={'0-100000'}>0-100k</MenuItem>
						<MenuItem value={'100000-200000'}>100k-200k</MenuItem>
						<MenuItem value={'200000-300000'}>200k-300k</MenuItem>
						<MenuItem value={'300000-400000'}>300k-40k</MenuItem>
						<MenuItem value={'400000-500000'}>400k-500k</MenuItem>
						<MenuItem value={'500000-600000'}>500k-600k</MenuItem>
						<MenuItem value={'600000-700000'}>600k-700k</MenuItem>
						<MenuItem value={'700000-800000'}>700k-800k</MenuItem>
						<MenuItem value={'800000-900000'}>800k-900k</MenuItem>
						<MenuItem value={'900000-1000000'}>900k-1mln</MenuItem>
						<MenuItem value={'1000000-20000000'}>1mln and above</MenuItem>
					</Select>
				</FormControl>

				{/* <FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
				<InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={age}
					label="Age"
					onChange={handleChange}
					style={{ backgroundColor: '#D9D9D9' }}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl> */}
			</div>
			<div className={styles.buttonContainer}>
				<Button name="Reset" className={styles.resetButton} onClick={handleReset} />
				<Button name="Search" className={styles.searchButton} onClick={handleSearch} />
			</div>
		</>
	);
};

export default Dropdown;
