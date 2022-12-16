import React, { useState } from 'react';
import styles from '../index.module.scss';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Dropdown = () => {
	const [age, setAge] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
	};

	return (
		<div className={styles.dropdown}>
			<FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
				<InputLabel id="demo-simple-select-helper-label">Select sector</InputLabel>
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
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
				<InputLabel id="demo-simple-select-helper-label">Industry</InputLabel>
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
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
				<InputLabel id="demo-simple-select-helper-label">Score</InputLabel>
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
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
				<InputLabel id="demo-simple-select-helper-label">Price</InputLabel>
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
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
				<InputLabel id="demo-simple-select-helper-label">Marktet cap</InputLabel>
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
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
				<InputLabel id="demo-simple-select-helper-label">Volume</InputLabel>
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
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 120, width: 250 }}>
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
			</FormControl>
		</div>
	);
};

export default Dropdown;
