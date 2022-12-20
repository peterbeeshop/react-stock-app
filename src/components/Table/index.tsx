import { useState } from 'react';
import styles from './index.module.scss';
import TablePagination from '@mui/material/TablePagination';

interface TableProps<TData> {
	content?: TData[];
	columns: (keyof TData)[];
}

const Table = <TData extends object>(props: TableProps<TData>) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = props.columns.map((col) => {
		return <th key={Math.random() * 100}>{col.toString()}</th>;
	});

	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>{columns}</tr>
				</thead>
				<tbody>
					{props.content?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cont) => {
						return (
							<tr>
								{props.columns.map((item) => (
									<td key={Math.random() * 100}></td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<TablePagination
				rowsPerPageOptions={[10, 25, 50, 75, 100]}
				component="div"
				count={props.content!.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				sx={{ background: '#3A444B', color: '#6FA61A' }}
			/>
		</div>
	);
};

export default Table;
