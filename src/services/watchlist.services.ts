import axios from 'axios';
import { Watchlist } from '../types/watchlist';
import { apiClient } from './config';

const SERVICE_PREFIX = '/my_watchlists';

export const createWatchlist = async (name: string): Promise<Watchlist> => {
	return (await apiClient.post('/create_watchlist', { name })).data;
};

export const getMyWatchlist = async (): Promise<Watchlist[]> => {
	return (
		await apiClient.get(`${SERVICE_PREFIX}`, {
			withCredentials: true,
		})
	).data;
};
