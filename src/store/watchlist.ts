import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createThunkAction, RootState } from '.';
import { Watchlist } from '../types/watchlist';
import * as WatchlistService from '../services/watchlist.services';
import { userSelectors } from './AuthSlice';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// initial state
interface WatchlistState {
	watchlist: Watchlist[];
}

const initialState: WatchlistState = {
	watchlist: [],
};

const slice = createSlice({
	name: 'watchlist',
	initialState,
	reducers: {
		setWatchlist: (state, action: PayloadAction<Watchlist[]>) => {
			state.watchlist = action.payload;
		},
		addToWatchlist: (state, action: PayloadAction<Watchlist>) => {
			state.watchlist = [...state.watchlist, action.payload];
		},
		removeWatchlist: (state, action: PayloadAction<{ data: Watchlist[]; watchlist?: Watchlist }>) => {
			state.watchlist = action.payload.data.filter((watchlist) => {
				return watchlist !== action.payload.watchlist;
			});
		},
	},
});

/**
 * Thunks
 */

const createWatchlist = createThunkAction<void, { watchlistName: string; onSuccess?: (id: string) => void }>(
	'watchlist/createWatchlist',
	async ({ watchlistName, onSuccess }, { dispatch, getState }) => {
		try {
			const createdWatchlist = await WatchlistService.createWatchlist(watchlistName);
			dispatch(watchlistActions.addToWatchlist(createdWatchlist));
			onSuccess?.(createdWatchlist._id);
		} catch (error) {
			toast.error('error creating new watchlist!');
		}
	},
);

const retrieveWatchlist = createThunkAction<void, void>(
	'watchlist/retrieveWatchlist',
	async (_, { dispatch, getState }) => {
		try {
			const token = userSelectors.selectAuthToken(getState());
			if (token !== undefined) {
				const watchlist = await WatchlistService.getMyWatchlist();
				dispatch(watchlistActions.setWatchlist(watchlist));
			}
		} catch (error) {
			toast.error('error retrieving your watchlist!');
		}
	},
);

const addStockToWatchlist = createThunkAction<void, { id: string; stock: string[] }>(
	'watchlist/add-stock',
	async ({ id, stock }, { dispatch }) => {
		try {
			await WatchlistService.addStockToWatchlist(id, stock);
			const watchlist = await WatchlistService.getMyWatchlist();
			dispatch(watchlistActions.setWatchlist(watchlist));
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error('There was an error adding stocks to this watchlist. Try again!');
			} else {
				toast.error('Something went wrong with the servers. Please try again!');
			}
		}
	},
);

const deleteWatchlist = createThunkAction<void, { id: string; onSuccess?: () => void }>(
	'watchlist/delete',
	async ({ id, onSuccess }, { dispatch }) => {
		try {
			await WatchlistService.deleteWatchlist(id);
			onSuccess?.();
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error('There was an error deleting this watchlist. Try again!');
			} else {
				toast.error('Something went wrong with the servers. Please try again!');
			}
		}
	},
);

export const watchlistActions = {
	...slice.actions,
	retrieveWatchlist,
	createWatchlist,
	addStockToWatchlist,
	deleteWatchlist,
};

export const watchlistSelectors = {
	selectAllWatchlist: (state: RootState) => state.watchlist.watchlist,
	selectWatchlistById: (state: RootState, id: string) => {
		const list = watchlistSelectors.selectAllWatchlist(state);
		return list.find((watchlist) => watchlist._id === id);
	},
};

export default slice.reducer;
