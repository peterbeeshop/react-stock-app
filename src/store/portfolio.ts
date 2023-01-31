import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createThunkAction, RootState } from '.';
import { Portfolio } from '../types/portfolio';
import * as PortfolioService from '../services/portfolio.services';
import { toast } from 'react-toastify';
// import { userSelectors } from './AuthSlice';
import { AxiosError } from 'axios';

// initial state
interface PortfolioState {
	portfolio: Portfolio[];
}

const initialState: PortfolioState = {
	portfolio: [],
};

const slice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		setPortfolio: (state, action: PayloadAction<Portfolio[]>) => {
			state.portfolio = action.payload;
		},
		addToPortfolio: (state, action: PayloadAction<Portfolio>) => {
			state.portfolio = [...state.portfolio, action.payload];
		},
		removePortfolio: (state, action: PayloadAction<{ data: Portfolio[]; portfolio?: Portfolio }>) => {
			state.portfolio = action.payload.data.filter((portfolio) => {
				return portfolio !== action.payload.portfolio;
			});
		},
	},
});

/**
 * Thunks
 */

const createPortfolio = createThunkAction<void, { portfolioName: string; onSuccess?: (id: string) => void }>(
	'portfolio/createPortfolio',
	async ({ portfolioName, onSuccess }, { dispatch, getState }) => {
		try {
			const createdPortfolio = await PortfolioService.createPortfolio(portfolioName);
			console.log('createdPort', createdPortfolio);
			dispatch(portfolioActions.addToPortfolio(createdPortfolio));
			onSuccess?.(createdPortfolio._id);
		} catch (error) {
			toast.error('error creating new watchlist!');
		}
	},
);

// const retrieveWatchlist = createThunkAction<void, void>(
// 	'watchlist/retrieveWatchlist',
// 	async (_, { dispatch, getState }) => {
// 		try {
// 			const token = userSelectors.selectAuthToken(getState());
// 			if (token !== undefined) {
// 				const watchlist = await WatchlistService.getMyWatchlist();
// 				dispatch(watchlistActions.setWatchlist(watchlist));
// 			}
// 		} catch (error) {
// 			toast.error('error retrieving your watchlist!');
// 		}
// 	},
// );

const addStockToPortfolio = createThunkAction<void, { id: string; symbol: string; shares: string; price: string }>(
	'watchlist/add-stock',
	async ({ id, symbol, price, shares }, { dispatch }) => {
		try {
			await PortfolioService.addStockToPortfolio(id, symbol, shares, price);
			const portfolio = await PortfolioService.getMyPortfolio();
			dispatch(portfolioActions.setPortfolio(portfolio));
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error('There was an error adding stocks to this portfolio. Try again!');
			} else {
				toast.error('Something went wrong with the servers. Please try again!');
			}
		}
	},
);

// const deleteWatchlist = createThunkAction<void, { id: string; onSuccess?: () => void }>(
// 	'watchlist/delete',
// 	async ({ id, onSuccess }, { dispatch }) => {
// 		try {
// 			await WatchlistService.deleteWatchlist(id);
// 			onSuccess?.();
// 		} catch (err) {
// 			if (err instanceof AxiosError) {
// 				toast.error('There was an error deleting this watchlist. Try again!');
// 			} else {
// 				toast.error('Something went wrong with the servers. Please try again!');
// 			}
// 		}
// 	},
// );

export const portfolioActions = {
	...slice.actions,
	createPortfolio,
	// retrieveWatchlist,
	addStockToPortfolio,
	// deleteWatchlist,
};

export const portfolioSelectors = {
	selectAllPortfolio: (state: RootState) => state.portfolio.portfolio,
	selectPortfolioById: (state: RootState, id: string) => {
		const list = portfolioSelectors.selectAllPortfolio(state);
		return list.find((portfolio) => portfolio._id === id);
	},
};

export default slice.reducer;
