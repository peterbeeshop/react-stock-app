import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createThunkAction, RootState } from '.';
import { Watchlist } from '../types/watchlist';
import * as WatchlistService from '../services/watchlist.services';
import { userSelectors } from './AuthSlice';
import { toast } from 'react-toastify';

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
			console.log('createdWatchlist', createdWatchlist);
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

export const watchlistActions = { ...slice.actions, retrieveWatchlist, createWatchlist };

export const watchlistSelectors = {
	selectAllWatchlist: (state: RootState) => state.watchlist.watchlist,
	selectWatchlistById: (state: RootState, id: string) => {
		const list = watchlistSelectors.selectAllWatchlist(state);
		return list.find((watchlist) => watchlist._id === id);
	},
};

export default slice.reducer;
